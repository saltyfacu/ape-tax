import {Fragment, useCallback, useEffect, useState} from 'react';
import {harvestStrategy} from 'utils/actions';
import {parseMarkdown, performGet} from 'utils/utils';
import {multicall, readContract} from '@wagmi/core';
import {useWeb3} from '@yearn-finance/web-lib/contexts/useWeb3';
import VAULT_ABI from '@yearn-finance/web-lib/utils/abi/vault.abi';
import {isZeroAddress, toAddress} from '@yearn-finance/web-lib/utils/address';
import {decodeAsBigInt} from '@yearn-finance/web-lib/utils/decoder';
import {formatToNormalizedValue, toBigInt, toNormalizedBN} from '@yearn-finance/web-lib/utils/format.bigNumber';
import {isZero} from '@yearn-finance/web-lib/utils/isZero';
import CHAINS from '@yearn-finance/web-lib/utils/web3/chains';

import type {ReactElement} from 'react';
import type {TStrategyData, TVault, TVaultData} from 'utils/types';
import type {TAddress, TDict} from '@yearn-finance/web-lib/types';

type TStrategies = {
	vault: TVault;
	onUpdateVaultData: (fn: (v: TVaultData) => TVaultData) => void
}
function	Strategies({vault, onUpdateVaultData}: TStrategies): ReactElement {
	const	{provider, isActive, address, chainID} = useWeb3();
	const	chainExplorer = CHAINS[vault?.CHAIN_ID]?.block_explorer || 'https://etherscan.io';
	const	[strategiesData, set_strategiesData] = useState<TDict<TStrategyData>>({});
	const	[, set_nonce] = useState(0);
	const	[isHarvesting, set_isHarvesting] = useState(false);

	/**************************************************************************
	** Retrieve the details of the attached strategies and compute some of the
	** elements for the UI.
	**************************************************************************/
	const prepreStrategiesData = useCallback(async (): Promise<void> => {
		if (chainID !== vault?.CHAIN_ID && !(chainID === 1337)) {
			return;
		}

		const vaultContract = {address: toAddress(vault.VAULT_ADDR), abi: VAULT_ABI};
		let		shouldBreak = false;
		for (let index = 0; index < 20; index++) {
			if (shouldBreak) {
				continue;
			}

			/**************************************************************************
			** The fun part to get all the strategies addresses is that we need to
			** retrieve the address of the strategy from withdrawQueue, looping
			** through the max number of strategies until we hit 0
			**************************************************************************/
			const strategyAddress = await readContract({...vaultContract, functionName: 'withdrawalQueue', args: [toBigInt(index)]});

			if (isZeroAddress(strategyAddress)) {
				shouldBreak = true;
				continue;
			}
			const callResult = await multicall({
				contracts: [
					{address: toAddress(vault.VAULT_ADDR), abi: VAULT_ABI, functionName: 'creditAvailable', args: [strategyAddress]},
					{address: strategyAddress, abi: VAULT_ABI, functionName: 'name'}
				],
				chainId: chainID || 1
			});
			const creditAvailable = decodeAsBigInt(callResult[0]);
			const name = callResult[1].result as string;

			if ([1, 10, 250, 42161].includes(Number(vault.CHAIN_ID))) {
				try {
					const	details = await performGet(`https://meta.yearn.network/api/${vault.CHAIN_ID}/strategies/${strategyAddress}`);
					if (details) {
						set_strategiesData((s): TDict<TStrategyData> => {
							s[toAddress(strategyAddress)] = {
								address: toAddress(strategyAddress),
								name: name,
								description: details?.description ? parseMarkdown(details?.description.replaceAll('{{token}}', vault.WANT_SYMBOL)) : 'Description not provided for this strategy.',
								creditAvailable: toNormalizedBN(creditAvailable)
							};
							return (s);
						});
					} else {
						set_strategiesData((s): TDict<TStrategyData> => {
							s[toAddress(strategyAddress)] = {
								address: toAddress(strategyAddress),
								name: name,
								description: 'Description not provided for this strategy.',
								creditAvailable: toNormalizedBN(creditAvailable)
							};
							return (s);
						});
					}
				} catch (error) {
					set_strategiesData((s): TDict<TStrategyData> => {
						s[toAddress(strategyAddress)] = {
							address: toAddress(strategyAddress),
							name: name,
							description: 'Description not provided for this strategy.',
							creditAvailable: toNormalizedBN(creditAvailable)
						};
						return (s);
					});
				}
			} else {
				set_strategiesData((s): TDict<TStrategyData> => {
					s[toAddress(strategyAddress)] = {
						address: toAddress(strategyAddress),
						name: name,
						description: 'Description not provided for this strategy.',
						creditAvailable: toNormalizedBN(creditAvailable)
					};
					return (s);
				});
			}
			set_nonce((n): number => n + 1);
		}
	}, [chainID, vault.CHAIN_ID, vault.VAULT_ADDR, vault.WANT_SYMBOL]);

	useEffect((): void => {
		if (!vault || !isActive || !provider || !address) {
			return;
		}
		prepreStrategiesData();
	}, [vault, isActive, provider, address, prepreStrategiesData]);


	const fetchPostDepositOrWithdraw = useCallback(async (): Promise<void> => {
		if (!vault || !provider || !address) {
			return;
		}

		const calls = [];
		const wantContract = {
			address: toAddress(vault.WANT_ADDR),
			abi: [
				'function balanceOf(address) public view returns (uint256)',
				'function allowance(address, address) public view returns (uint256)'
			]
		};
		const vaultContract = {
			address: toAddress(vault.VAULT_ADDR),
			abi: [
				'function balanceOf(address) public view returns (uint256)',
				'function allowance(address, address) public view returns (uint256)',
				'function depositLimit() public view returns (uint256)',
				'function totalAssets() public view returns (uint256)',
				'function availableDepositLimit() public view returns (uint256)',
				'function pricePerShare() public view returns (uint256)'
			]
		};

		calls.push({...wantContract, functionName: 'allowance', args: [address, vault.VAULT_ADDR]});
		calls.push({...wantContract, functionName: 'balanceOf', args: [address]});
		calls.push({...vaultContract, functionName: 'balanceOf', args: [address]});
		calls.push({...vaultContract, functionName: 'getBalance', args: [address]});
		calls.push({...vaultContract, functionName: 'depositLimit'});
		calls.push({...vaultContract, functionName: 'totalAssets'});
		calls.push({...vaultContract, functionName: 'availableDepositLimit'});
		calls.push({...vaultContract, functionName: 'pricePerShare'});
	
		const callResult = await multicall({contracts: calls as never[], chainId: chainID});
		const wantAllowance = decodeAsBigInt(callResult[0]);
		const wantBalance = decodeAsBigInt(callResult[1]);
		const vaultBalance = decodeAsBigInt(callResult[2]);
		const coinBalance = decodeAsBigInt(callResult[3]);
		const depositLimit = decodeAsBigInt(callResult[4]);
		const totalAssets = decodeAsBigInt(callResult[5]);
		const availableDepositLimit = decodeAsBigInt(callResult[6]);
		const pricePerShare = decodeAsBigInt(callResult[7]);


		onUpdateVaultData((v): TVaultData => ({
			...v,
			allowance: toNormalizedBN(wantAllowance, v.decimals),
			wantBalance: toNormalizedBN(wantBalance, v.decimals),
			balanceOf: toNormalizedBN(vaultBalance, v.decimals),
			balanceOfValue: formatToNormalizedValue(vaultBalance, v.decimals) * Number(v.pricePerShare.normalized) * v.wantPrice,
			coinBalance: toNormalizedBN(coinBalance, 18),
			depositLimit: toNormalizedBN(depositLimit, v.decimals),
			totalAssets: toNormalizedBN(totalAssets, v.decimals),
			availableDepositLimit: toNormalizedBN(availableDepositLimit, v.decimals),
			pricePerShare: toNormalizedBN(pricePerShare, v.decimals),
			totalAUM: formatToNormalizedValue(totalAssets, v.decimals) * v.wantPrice,
			progress: isZero(depositLimit) ? 1 : (formatToNormalizedValue(depositLimit, v.decimals) - formatToNormalizedValue(availableDepositLimit, v.decimals)) / formatToNormalizedValue(depositLimit, v.decimals)
		}));
	}, [address, chainID, onUpdateVaultData, provider, vault]);

	const onHarvestStrategy = useCallback(async (strategyAddress: TAddress): Promise<void> => {
		set_isHarvesting(true);

		const result = await harvestStrategy({
			connector: provider,
			contractAddress: strategyAddress
		}); 

		set_isHarvesting(false);
		
		if(result.isSuccessful){
			prepreStrategiesData();
			fetchPostDepositOrWithdraw();
		}
	}, [fetchPostDepositOrWithdraw, prepreStrategiesData, provider]);

	return (
		<section aria-label={'STRATEGIES'} className={'mt-8'}>
			<h1 className={'mb-6 font-mono text-2xl font-semibold text-neutral-900'}>{'Strategies'}</h1>
			{
				Object.values(strategiesData).map((strategy, index): ReactElement => (
					<div key={index} className={'mb-4 font-mono text-sm text-neutral-700'}>
						<div>
							<p className={'inline font-bold'}>{`Strat. ${index}: `}</p>
							<p className={'inline font-bold'}>{strategy.name}</p>
						</div>
						<div className={'w-full max-w-xl text-justify'}>
							<p className={'inline text-xs'} dangerouslySetInnerHTML={{__html: strategy?.description || ''}} />
						</div>
						<div>
							<a
								className={'dashed-underline-gray text-xs'}
								href={`${chainExplorer}/address/${strategy.address}#code`}
								target={'_blank'}
								rel={'noreferrer'}>
								{'📃 Contract'}
							</a>
						</div>
						{vault.VAULT_TYPE === 'community' ? (
							<div>
								<button
									disabled={isHarvesting || !isActive || !provider || isZero(strategy.creditAvailable.raw)}
									onClick={async (): Promise<void> => onHarvestStrategy(strategy.address)}
									className={'dashed-underline-gray text-xs'}>
									{isZero(strategy?.creditAvailable?.raw) ? '🌱 All funds deployed' : `🚜 Harvest to deploy ${strategy.creditAvailable.normalized} ${vault.WANT_SYMBOL}`}
								</button>
							</div>
						) : <Fragment />}
					</div>
				))
			}
		</section>
	);
}

export default Strategies;
