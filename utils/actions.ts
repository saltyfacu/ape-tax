import {assert} from 'utils/assert';
import {type ContractFunctionConfig, encodeFunctionData, hexToSignature, maxUint256} from 'viem';
import {erc20ABI, multicall, readContract, signTypedData} from '@wagmi/core';
import {toAddress} from '@yearn-finance/web-lib/utils/address';
import {decodeAsBigInt} from '@yearn-finance/web-lib/utils/decoder';
import {toBigInt} from '@yearn-finance/web-lib/utils/format.bigNumber';
import {isZero} from '@yearn-finance/web-lib/utils/isZero';

import {assertAddress, handleTx, toWagmiProvider,type TWriteTransaction} from './toWagmiProvider';
import FACTORY_KEEPER_ABI from './ABI/factoryKeeper.abi';
import STRATEGY_V3_BASE_ABI from './ABI/tokenizedStrategyV3.abi';
import YROUTER_ABI from './ABI/yRouter.abi';
import {YVAULT_ABI} from './ABI/yVaultv2.abi';
import {YVAULTV3_ABI} from './ABI/yVaultv3.abi';
import {YVAULT_V3_BASE_ABI} from './ABI/yVaultV3Base.abi';

import type {Connector} from 'wagmi';
import type {TAddress} from '@yearn-finance/web-lib/types';
import type {TTxResponse} from '@yearn-finance/web-lib/utils/web3/transaction';

const PERMIT_TYPE = {
	Permit: [
		{name: 'owner', type: 'address'},
		{name: 'spender', type: 'address'},
		{name: 'value', type: 'uint256'},
		{name: 'nonce', type: 'uint256'},
		{name: 'deadline', type: 'uint256'}
	]
};

//Because USDT do not return a boolean on approve, we need to use this ABI
const ALTERNATE_ERC20_APPROVE_ABI = [{'constant': false, 'inputs': [{'name': '_spender', 'type': 'address'}, {'name': '_value', 'type': 'uint256'}], 'name': 'approve', 'outputs': [], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function'}] as const;

/* 🔵 - Yearn Finance **********************************************************
** isApprovedERC20 is a _VIEW_ function that checks if a token is approved for
** a spender.
******************************************************************************/
export async function isApprovedERC20(
	connector: Connector | undefined,
	tokenAddress: TAddress,
	spender: TAddress,
	amount = maxUint256
): Promise<boolean> {
	const wagmiProvider = await toWagmiProvider(connector);
	const result = await readContract({
		...wagmiProvider,
		abi: erc20ABI,
		address: tokenAddress,
		functionName: 'allowance',
		args: [wagmiProvider.address, spender]
	});
	return (result || 0n) >= amount;
}

/* 🔵 - Yearn Finance **********************************************************
** allowanceOf is a _VIEW_ function that returns the amount of a token that is
** approved for a spender.
******************************************************************************/
type TAllowanceOf = {
	connector: Connector | undefined,
	tokenAddress: TAddress,
	spenderAddress: TAddress
}
export async function allowanceOf(props: TAllowanceOf): Promise<bigint> {
	const wagmiProvider = await toWagmiProvider(props.connector);
	const result = await readContract({
		...wagmiProvider,
		abi: erc20ABI,
		address: props.tokenAddress,
		functionName: 'allowance',
		args: [wagmiProvider.address, props.spenderAddress]
	});
	return result || 0n;
}

/* 🔵 - Yearn Finance **********************************************************
** approveERC20 is a _WRITE_ function that approves a token for a spender.
**
** @param spenderAddress - The address of the spender.
** @param amount - The amount of collateral to deposit.
******************************************************************************/
type TApproveERC20 = TWriteTransaction & {
	spenderAddress: TAddress | undefined;
	amount: bigint;
};
export async function approveERC20(props: TApproveERC20): Promise<TTxResponse> {
	assert(props.connector, 'No connector');
	assertAddress(props.spenderAddress, 'spenderAddress');
	assertAddress(props.contractAddress);

	props.onTrySomethingElse = async (): Promise<TTxResponse> => {
		assertAddress(props.spenderAddress, 'spenderAddress');
		return await handleTx(props, {
			address: props.contractAddress,
			abi: ALTERNATE_ERC20_APPROVE_ABI,
			functionName: 'approve',
			args: [props.spenderAddress, props.amount]
		});
	};

	return await handleTx(props, {
		address: props.contractAddress,
		abi: erc20ABI,
		functionName: 'approve',
		args: [props.spenderAddress, props.amount]
	});
}

type TDepositERC20Args = TWriteTransaction & {
	contractAddress: TAddress,
	spenderAddress: TAddress,
	amount: bigint,
	isLegacy: boolean,
}
export async function	depositERC20(props: TDepositERC20Args): Promise<TTxResponse>{
	assertAddress(props.contractAddress);
	assertAddress(props.spenderAddress, 'spenderAddress');
	assert(props.amount > 0n, 'Amount is 0');
	assert(props.connector, 'No connector');

	const wagmiProvider = await toWagmiProvider(props.connector);

	console.log(`Deposit ${props.amount} to ${props.contractAddress}`);
	if (props.isLegacy) {
		return await handleTx(props, {
			address: props.contractAddress,
			abi: YVAULT_ABI,
			functionName: 'deposit',
			args: [props.amount]
		});
	}

	console.log(`Vault is a V3 vault. Calling ${props.contractAddress} with ${props.amount} and ${wagmiProvider.address}`);
	return await handleTx(props, {
		address: props.contractAddress,
		abi: YVAULTV3_ABI,
		functionName: 'deposit',
		args: [props.amount, wagmiProvider.address]
	});
}

type TWithdrawERC20Args = TWriteTransaction & {
	contractAddress: TAddress,
	amount: bigint,
	isLegacy: boolean,
}
export async function	withdrawERC20(props: TWithdrawERC20Args): Promise<TTxResponse> {
	assertAddress(props.contractAddress, 'receiverAddress');
	assert(props.connector, 'No connector');
	assert(props.amount > 0n, 'Amount is 0');

	let shouldRedeem = false;
	const signer = await props.connector.getWalletClient();
	const signerAddress = signer.account.address;

	/* 🔵 - Yearn Finance **************************************************************************
	** If we are using a legacy vault, aka a vault prior to V3, we will use the legacy withdraw,
	** aka directly withdrawing from the vault.
	** This path should be less and less used as time goes by.
	**********************************************************************************************/
	if (props.isLegacy) {
		return await handleTx(props, {
			address: props.contractAddress,
			abi: YVAULT_ABI,
			functionName: 'withdraw',
			args: [props.amount]
		});
	}

	/** V3 Path **/
	/* 🔵 - Yearn Finance **************************************************************************
	** To decide if we should use the withdraw or the redeem function, we will just check the amount
	** we want to withdraw. If this amount is greater than or equal to the total value of our shares
	** then we will redeem  all of the shares we current hold from the vault otherwise we will
	** proceed to only withdraw the specified amount.
	**********************************************************************************************/
	const userBalance = await readContract({
		abi: YVAULT_V3_BASE_ABI,
		address: props.contractAddress,
		functionName: 'balanceOf',
		args: [signerAddress]
	});

	let amountToUse = props.amount;
	if (props.amount >= userBalance) {
		shouldRedeem = true;
		amountToUse = userBalance;
	} else if (isZero(props.amount) && userBalance > 0n) {
		shouldRedeem = true;
		amountToUse = userBalance;
	}

	if (shouldRedeem) {
		return await handleTx(props, {
			address: props.contractAddress,
			abi: YVAULT_V3_BASE_ABI,
			functionName: 'redeem',
			args: [amountToUse, signerAddress, signerAddress, 1n]
		});
	}
	return await handleTx(props, {
		address: props.contractAddress,
		abi: YVAULT_V3_BASE_ABI,
		functionName: 'withdraw',
		args: [amountToUse, signerAddress, signerAddress, 100n]
	});
}


type TWithdrawWithPermitERC20Args = TWriteTransaction & {
	contractAddress: TAddress,
	routerAddress: TAddress,
	amount: bigint,
	isLegacy: boolean,
	isV3Strategy: boolean,
	shouldRedeem: boolean
}
export async function	withdrawWithPermitERC20(props: TWithdrawWithPermitERC20Args): Promise<TTxResponse> {
	assertAddress(props.contractAddress, 'receiverAddress');
	assertAddress(props.routerAddress, 'routerAddress');
	assert(props.connector, 'No connector');
	assert(props.amount > 0n, 'Amount is 0');

	const signer = await props.connector.getWalletClient();
	const chainId = await props.connector.getChainId();
	const signerAddress = signer.account.address;

	/* 🔵 - Yearn Finance **************************************************************************
	** If we are using a legacy vault, aka a vault prior to V3, we will use the legacy withdraw,
	** aka directly withdrawing from the vault.
	** This path should be less and less used as time goes by.
	**********************************************************************************************/
	if (props.isLegacy) {
		return await handleTx(props, {
			address: props.contractAddress,
			abi: YVAULT_ABI,
			functionName: 'withdraw',
			args: [props.amount]
		});
	}

	/* 🔵 - Yearn Finance **************************************************************************
	** Otherwise, we will go with the new V3 withdraw flow, which can be split in multiple
	** sub-flows based on some conditions. The questions we need to answer are:
	** - Is the allowance of the vault to the router sufficient?
	** - Are we withdrawing a part of the vault or all of it?
	**
	** Before answering these questions, we will retrieve some contextual informations:
	** - The vault API version, which will be used to sign the permit
	** - The vault name, which will be used to sign the permit
	** - The vault nonce, which will be used to sign the permit
	** - The maxOut amount, which will be used to withdraw the amount
	** - The current allowance of the signer to the router
	**********************************************************************************************/

	const calls: ContractFunctionConfig[] = [];
	const multicalls = [];
	const vaultV3ContractMultiCall = {address: props.contractAddress, abi: YVAULT_V3_BASE_ABI};
	const tokenizedStrategyContract = {address: props.contractAddress, abi: STRATEGY_V3_BASE_ABI};

	props.isV3Strategy ?
		calls.push({...tokenizedStrategyContract, functionName: 'apiVersion'}) :
		calls.push({...vaultV3ContractMultiCall, functionName: 'api_version'});
	calls.push({...vaultV3ContractMultiCall, functionName: 'name'});
	calls.push({...vaultV3ContractMultiCall, functionName: 'nonces', args: [signerAddress]});
	calls.push({...vaultV3ContractMultiCall, functionName: 'previewWithdraw', args: [props.amount]});
	calls.push({...vaultV3ContractMultiCall, functionName: 'allowance', args: [signerAddress, props.routerAddress]});
	calls.push({...vaultV3ContractMultiCall, functionName: 'balanceOf', args: [signerAddress]});

	const callResult = await multicall({contracts: calls as never[], chainId: chainId});
	const apiVersion = callResult[0].result as string;
	const name = callResult[1].result as string;
	const nonce = decodeAsBigInt(callResult[2]);
	const maxOut = decodeAsBigInt(callResult[3]);
	const currentAllowance = decodeAsBigInt(callResult[4]);
	const currentBalance = decodeAsBigInt(callResult[5]);

	let amountToUse = props.amount;

	// Conditions below focus on addition cases where we should redeem
	if (props.amount >= currentBalance) {
		props.shouldRedeem = true;
		amountToUse = currentBalance;
	} else if (isZero(props.amount) && currentBalance > 0n) {
		props.shouldRedeem = true;
		amountToUse = currentBalance;
	}

	/* 🔵 - Yearn Finance **************************************************************************
	** If the allowance is not sufficient, we will sign a permit and call the router's selfPermit
	** function, which will allow the router to spend the vault's tokens on behalf of the signer.
	** with this flow we will use the multicall path, aka batching 2 actions in a single
	** transaction: the permit and the withdraw/redeem.
	** - The deadline is set to 24h from now.
	** - The amount permitted is set to the amount we want to withdraw.
	**********************************************************************************************/
	if (currentAllowance < amountToUse) {
		const deadline = Math.floor(Date.now() / 1000) + 60 * 60 * 24;
		const domain = {
			name: name,
			version: apiVersion,
			chainId: chainId,
			verifyingContract: props.contractAddress
		};
		const value = {
			owner: signerAddress,
			spender: props.routerAddress,
			value: maxUint256 - 1n,
			nonce: nonce,
			deadline: deadline
		};
		const signature = await signTypedData({domain, message: value, primaryType: 'Permit', types: PERMIT_TYPE});
		const {v, r, s} = hexToSignature(signature);

		multicalls.push(encodeFunctionData({
			abi: YROUTER_ABI,
			functionName: 'selfPermit',
			args: [props.contractAddress, maxUint256 - 1n, toBigInt(deadline), Number(v), r, s]
		}));

		/* 🔵 - Yearn Finance **********************************************************************
		** To decide if we should use the withdraw or the redeem function, we will just check the
		** amount we want to withdraw. If this amount is equal to the vault's balance, we will
		** redeem the vault, otherwise we will withdraw the amount.
		******************************************************************************************/
		if (isZero(props.amount) || props.shouldRedeem) {
			multicalls.push(encodeFunctionData({
				abi: YROUTER_ABI,
				functionName: 'redeem',
				args: [props.contractAddress]
			}));
		} else {
			multicalls.push(encodeFunctionData({
				abi: YROUTER_ABI,
				functionName: 'withdraw',
				args: [props.contractAddress, amountToUse, signerAddress, maxOut]
			}));
		}

		return await handleTx(props, {
			address: props.routerAddress,
			abi: YROUTER_ABI,
			functionName: 'multicall',
			args: [multicalls as readonly `0x${string}`[]],
			value: 0n
		});
	}

	/* 🔵 - Yearn Finance **************************************************************************
	** To decide if we should use the withdraw or the redeem function, we will just check the amount
	** we want to withdraw. If this amount is equal to the vault's balance, we will redeem the vault
	** otherwise we will withdraw the amount.
	**********************************************************************************************/
	if (isZero(props.amount) || props.shouldRedeem) {
		return await handleTx(props, {
			address: props.routerAddress,
			abi: YROUTER_ABI,
			functionName: 'redeem',
			args: [props.contractAddress],
			value: 0n
		});
	}
	return await handleTx(props, {
		address: props.routerAddress,
		abi: YROUTER_ABI,
		functionName: 'withdraw',
		args: [props.contractAddress, props.amount, signerAddress, maxOut],
		value: 0n
	});
}

type TApeInVault = TWriteTransaction & {
	amount: bigint;
};
export async function	apeInVault(props: TApeInVault): Promise<TTxResponse> {
	assert(props.connector, 'No connector');
	assertAddress(props.contractAddress, 'contractAddress');
	assert(props.amount > 0n, 'Amount must be greater than 0');

	return await handleTx(props, {
		address: props.contractAddress,
		abi: ['function deposit() public payable'],
		functionName: 'deposit',
		args: [props.amount]
	});
}

type TApeOutVault = TWriteTransaction & {
	amount: bigint;
};
export async function	apeOutVault(props: TApeOutVault): Promise<TTxResponse> {
	assert(props.connector, 'No connector');
	assertAddress(props.contractAddress, 'contractAddress');
	assert(props.amount > 0n, 'Amount must be greater than 0');

	return await handleTx(props, {
		address: props.contractAddress,
		abi: ['function withdraw(uint256 amount) public'],
		functionName: 'withdraw',
		args: [props.amount]
	});
}

export async function	harvestStrategy(props: TWriteTransaction): Promise<TTxResponse> {
	assertAddress(props.contractAddress, 'strategyAddress');

	return await handleTx(props, {
		address: toAddress(process.env.YEARN_FACTORY_KEEPER_WRAPPER),
		abi: FACTORY_KEEPER_ABI,
		functionName: 'harvestStrategy',
		args: [props.contractAddress]
	});
}
