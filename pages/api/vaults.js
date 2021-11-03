/******************************************************************************
**	@Author:				The Ape Community
**	@Twitter:				@ape_tax
**	@Date:					Sunday September 5th 2021
**	@Filename:				vaults.js
******************************************************************************/

import	{ethers}				from	'ethers';
import	{Provider, Contract}	from	'ethcall';
import	{fn}					from	'utils/fn';
import	vaults					from	'utils/vaults.json';
import	yVaultABI				from	'utils/ABI/yVault.abi.json';
import	{prepareGrossData}		from	'pages/api/specificApy';

async function newEthCallProvider(provider, chainID) {
	const	ethcallProvider = new Provider();
	if (chainID === 1337) {
		await	ethcallProvider.init(new ethers.providers.JsonRpcProvider('http://localhost:8545'));
		ethcallProvider.multicall.address = '0xc04d660976c923ddba750341fe5923e47900cf24';
		return ethcallProvider;
	}
	await	ethcallProvider.init(provider);
	if (chainID === 250) {
		ethcallProvider.multicall.address = '0xc04d660976c923ddba750341fe5923e47900cf24';
	}
	if (chainID === 42161) {
		ethcallProvider.multicall.address = '0x10126Ceb60954BC35049f24e819A380c505f8a0F';
	}
	return	ethcallProvider;
}

const chunk = (arr, size) => arr.reduce((acc, e, i) => (i % size ? acc[acc.length - 1].push(e) : acc.push([e]), acc), []);

async function asyncForEach(array, callback) {
	for (let index = 0; index < array.length; index++) {
		await callback(array[index], index, array);
	}
}

function getProvider(chain = 1) {
	if (chain === 1) {
		if (process.env.ALCHEMY_KEY) {
			return new ethers.providers.AlchemyProvider('homestead', process.env.ALCHEMY_KEY);
		} else {
			return new ethers.providers.InfuraProvider('homestead', '9aa3d95b3bc440fa88ea12eaa4456161');
		}
	} else if (chain === 137) {
		return new ethers.providers.JsonRpcProvider('https://rpc-mainnet.matic.network');
	} else if (chain === 250) {
		return new ethers.providers.JsonRpcProvider('https://rpc.ftm.tools');
	} else if (chain === 56) {
		return new ethers.providers.JsonRpcProvider('https://bsc-dataseed.binance.org');
	} else if (chain === 1337) {
		return new ethers.providers.JsonRpcProvider('http://localhost:8545');
	}
	return (new ethers.providers.AlchemyProvider('homestead', process.env.ALCHEMY_KEY));
}

export default fn(async ({network = 1, rpc, status = 'active', apy = 0}) => {
	network = Number(network);
	let		provider = getProvider(network);
	if (rpc !== undefined) {
		provider = new ethers.providers.JsonRpcProvider(rpc);
	}
	const	ethcallProvider = await newEthCallProvider(provider, network);
	const	_vaults = [];
	const	_calls = [];

	Object.values(vaults).forEach((v) => {
		if (v.CHAIN_ID !== network || v.VAULT_TYPE === 'weird') {
			return;
		}
		if (status === 'active' && (v.VAULT_STATUS !== 'active' && v.VAULT_STATUS !== 'new' && v.VAULT_STATUS !== 'endorsed')) {
			return;	
		}
		const	vaultContract = new Contract(v.VAULT_ADDR, yVaultABI);
		_calls.push(...[
			vaultContract.apiVersion(),
			vaultContract.depositLimit(),
			vaultContract.totalAssets(),
			vaultContract.availableDepositLimit(),
			vaultContract.pricePerShare(),
			vaultContract.decimals(),
			vaultContract.activation(),
		]);
	});
	const	callResult = await ethcallProvider.all(_calls);
	const	chunkedCallResult = chunk(callResult, 7);
	let		index = 0;

	await asyncForEach(Object.entries(vaults), async ([k, v]) => {
		if (v.CHAIN_ID !== network || v.VAULT_TYPE === 'weird') {
			return;
		}
		if (status === 'active' && (v.VAULT_STATUS !== 'active' && v.VAULT_STATUS !== 'new' && v.VAULT_STATUS !== 'endorsed')) {
			return;	
		}
		const	[apiVersion, depositLimit, totalAssets, availableDepositLimit, pricePerShare, decimals, activation] = chunkedCallResult[index];
		const	dec = Number(decimals);
		index++;

		if (apy === 1) {
			const	grossData = await prepareGrossData({
				vault: v,
				pricePerShare,
				decimals,
				activation,
			});
			_vaults.push({
				title: v.TITLE,
				logo: v.LOGO,
				displayName: `${v.LOGO} ${v.TITLE}`,
				src: `https://ape.tax/${k}`,
				status: v.VAULT_STATUS,
				type: v.VAULT_TYPE,
				address: v.VAULT_ADDR,
				network: v.CHAIN_ID,
				data: {
					apiVersion: apiVersion,
					depositLimit: ethers.utils.formatUnits(depositLimit, dec),
					totalAssets: ethers.utils.formatUnits(totalAssets, dec),
					availableDepositLimit: ethers.utils.formatUnits(availableDepositLimit, dec),
					pricePerShare: ethers.utils.formatUnits(pricePerShare, dec),
					decimals: dec,
					activation: Number(activation)
				},
				APY: {
					week: grossData.week,
					month: grossData.month,
					inception: grossData.inception,
				},
				want: {
					address: v.WANT_ADDR,
					symbol: v.WANT_SYMBOL,
					cgID: v.COINGECKO_SYMBOL,
				}
			});
		} else {
			_vaults.push({
				title: v.TITLE,
				logo: v.LOGO,
				displayName: `${v.LOGO} ${v.TITLE}`,
				src: `https://ape.tax/${k}`,
				status: v.VAULT_STATUS,
				type: v.VAULT_TYPE,
				address: v.VAULT_ADDR,
				network: v.CHAIN_ID,
				data: {
					apiVersion: apiVersion,
					depositLimit: ethers.utils.formatUnits(depositLimit, dec),
					totalAssets: ethers.utils.formatUnits(totalAssets, dec),
					availableDepositLimit: ethers.utils.formatUnits(availableDepositLimit, dec),
					pricePerShare: ethers.utils.formatUnits(pricePerShare, dec),
					decimals: dec,
					activation: Number(activation)
				},
				want: {
					address: v.WANT_ADDR,
					symbol: v.WANT_SYMBOL,
					cgID: v.COINGECKO_SYMBOL,
				}
			});
		}
	});
	return _vaults;
}, {maxAge: 10 * 60}); //10 mn
