import assert from 'assert';
import {erc20ABI} from 'wagmi';
import VAULT_ABI from '@yearn-finance/web-lib/utils/abi/vault.abi';
import {toAddress} from '@yearn-finance/web-lib/utils/address';

import {assertAddress, handleTx} from './toWagmiProvider';
import FACTORY_KEEPER_ABI from './ABI/factoryKeeper.abi';

import type {TAddress} from '@yearn-finance/web-lib/types';
import type {TTxResponse} from '@yearn-finance/web-lib/utils/web3/transaction';
import type {TWriteTransaction} from './toWagmiProvider';

type TApproveToken = TWriteTransaction & {
	spenderAddress: TAddress | undefined;
	amount: bigint;
};
export async function	approveToken(props: TApproveToken): Promise<TTxResponse> {
	assertAddress(props.contractAddress, 'contractAddress');
	assertAddress(props.spenderAddress, 'spenderAddress');

	return await handleTx(props, {
		address: props.contractAddress,
		abi: erc20ABI,
		functionName: 'approve',
		args: [props.spenderAddress, props.amount]
	});
}

type TDepositToken = TWriteTransaction & {
	amount: bigint;
};
export async function	depositToken(props: TDepositToken): Promise<TTxResponse> {
	assertAddress(props.contractAddress, 'contractAddress');
	assert(props.amount > 0n, 'Amount must be greater than 0');

	return await handleTx(props, {
		address: props.contractAddress,
		abi: VAULT_ABI,
		functionName: 'deposit',
		args: [props.amount]
	});
}

type TWithdrawToken = TWriteTransaction & {
	amount: bigint;
};
export async function	withdrawToken(props: TWithdrawToken): Promise<TTxResponse> {
	assertAddress(props.contractAddress, 'contractAddress');
	assert(props.amount > 0n, 'Amount must be greater than 0');

	return await handleTx(props, {
		address: props.contractAddress,
		abi: VAULT_ABI,
		functionName: 'withdraw',
		args: [props.amount]
	});
}

type TApeInVault = TWriteTransaction & {
	amount: bigint;
};
export async function	apeInVault(props: TApeInVault): Promise<TTxResponse> {
	assertAddress(props.contractAddress, 'contractAddress');
	assert(props.amount > 0n, 'Amount must be greater than 0');

	return await handleTx(props, {
		address: props.contractAddress,
		abi: VAULT_ABI,
		functionName: 'deposit',
		args: [props.amount]
	});
}

type TApeOutVault = TWriteTransaction & {
	amount: bigint;
};
export async function	apeOutVault(props: TApeOutVault): Promise<TTxResponse> {
	assertAddress(props.contractAddress, 'contractAddress');
	assert(props.amount > 0n, 'Amount must be greater than 0');

	return await handleTx(props, {
		address: props.contractAddress,
		abi: VAULT_ABI,
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
