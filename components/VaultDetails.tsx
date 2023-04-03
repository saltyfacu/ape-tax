import React, {useEffect, useState} from 'react';
import ProgressChart from 'components/ProgressChart';
import Suspense from 'components/Suspense';
import useSWR from 'swr';
import {useWeb3} from '@yearn-finance/web-lib/contexts/useWeb3';
import {baseFetcher} from '@yearn-finance/web-lib/utils/fetchers';
import {formatAmount} from '@yearn-finance/web-lib/utils/format.number';
import CHAINS from '@yearn-finance/web-lib/utils/web3/chains';

import type {ReactElement} from 'react';
import type {Maybe, TSpecificAPIResult, TVault, TVaultData} from 'utils/types';

function	VaultDetails({vault, vaultData}: {vault: TVault, vaultData: TVaultData}): ReactElement {
	const	{chainID} = useWeb3();
	const	chainExplorer = CHAINS[vault?.CHAIN_ID]?.block_explorer || 'https://etherscan.io';

	const	{data: vaultAPYSWR} = useSWR(`/api/specificApy?address=${vault?.VAULT_ADDR}&network=${chainID === 1337 ? chainID : vault?.CHAIN_ID}`, baseFetcher, {revalidateOnMount: true, revalidateOnReconnect: true, shouldRetryOnError: true}) as {data: Maybe<TSpecificAPIResult>};

	const	[vaultAPY, set_vaultAPY] = useState<Maybe<TSpecificAPIResult>>(null);

	useEffect((): void => {
		set_vaultAPY(vaultAPYSWR);
	}, [vaultAPYSWR]);

	return (
		<section aria-label={'DETAILS'}>
			<div className={'mb-4 font-mono text-sm font-medium text-neutral-700'}>
				<div>
					<p className={'inline text-neutral-900'}>{'Vault: '}</p>
					<a
						className={'dashed-underline-gray text-neutral-700'}
						href={`${chainExplorer}/address/${vault.VAULT_ADDR}#code`}
						target={'_blank'}
						rel={'noreferrer'}>
						{'📃 Contract'}
					</a>
				</div>
				<div>
					<p className={'inline text-neutral-900'}>{'Version: '}</p>
					<p className={'inline text-neutral-700'}>
						<Suspense wait={!vaultData.loaded}>{vaultData.apiVersion}</Suspense>
					</p>
				</div>
				<div>
					<p className={'inline text-neutral-900'}>{`${vault.WANT_SYMBOL} price (${vault?.PRICE_SOURCE ? vault.PRICE_SOURCE : 'CoinGecko 🦎'}): `}</p>
					<p className={'inline text-neutral-700'}>
						<Suspense wait={!vaultData.loaded}>
							{`$${vaultData.wantPrice ? formatAmount(vaultData.wantPrice, vaultData.wantPrice < 10 ? 4 : 2) : '-'}`}
						</Suspense>
					</p>
				</div>
				<div>
					<p className={'inline text-neutral-900'}>{'Deposit Limit: '}</p>
					<p className={'inline text-neutral-700'}>
						<Suspense wait={!vaultData.loaded}>
							{`${vaultData.depositLimit.raw.isZero() ? '-' : formatAmount(vaultData?.depositLimit.normalized, 2)} ${vault.WANT_SYMBOL}`}
						</Suspense>
					</p>
				</div>
				<div>
					<p className={'inline text-neutral-900'}>{'Total Assets: '}</p>
					<p className={'inline text-neutral-700'}>
						<Suspense wait={!vaultData.loaded}>
							{`${formatAmount(vaultData?.totalAssets.normalized, 2)} ${vault.WANT_SYMBOL}`}
						</Suspense>
					</p>
				</div>
				<div>
					<p className={'inline text-neutral-900'}>{'Total AUM: '}</p>
					<p className={'inline text-neutral-700'}>
						<Suspense wait={!vaultData.loaded}>
							{`$${vaultData.totalAUM === 0 ? '-' : formatAmount(vaultData.totalAUM, 2)}`}
						</Suspense>
					</p>
				</div>
			</div>
			<div className={`mb-4 font-mono text-sm font-medium text-neutral-700 ${vault.VAULT_STATUS === 'withdraw' || vault.CHAIN_ID === 56 ? 'hidden' : ''}`}>
				<div>
					<p className={'inline text-neutral-900'}>{'Gross APR (last week): '}</p>
					<p className={'inline text-neutral-700'}>
						<Suspense wait={!vaultAPY}>
							{`${vaultAPY?.week || '-'}`}
						</Suspense>
					</p>
				</div>
				<div>
					<p className={'inline text-neutral-900'}>{'Gross APR (last month): '}</p>
					<p className={'inline text-neutral-700'}>
						<Suspense wait={!vaultAPY}>
							{`${vaultAPY?.month || '-'}`}
						</Suspense>
					</p>
				</div>
				<div>
					<p className={'inline text-neutral-900'}>{'Gross APR (inception): '}</p>
					<p className={'inline text-neutral-700'}>
						<Suspense wait={!vaultAPY}>
							{`${vaultAPY?.inception || '-'}`}
						</Suspense>
					</p>
				</div>
			</div>
			<div className={'mb-4 font-mono text-sm font-medium text-neutral-700'}>
				<div>
					<p className={'inline text-neutral-900'}>{'Price Per Share: '}</p>
					<p className={'inline text-neutral-700'}>
						<Suspense wait={!vaultData.loaded}>
							{`${vaultData.pricePerShare}`}
						</Suspense>
					</p>
				</div>
				<div>
					<p className={'inline text-neutral-900'}>{'Available limit: '}</p>
					<p className={'inline text-neutral-700'}>
						<Suspense wait={!vaultData.loaded}>
							{`${formatAmount(vaultData.availableDepositLimit.normalized, 2)} ${vault.WANT_SYMBOL}`}
						</Suspense>
					</p>
				</div>
				<div className={'progress-bar'}>
					<span className={'-ml-2 mr-2 hidden bg-neutral-0 text-neutral-900 md:inline'}>
							&nbsp;{'['}&nbsp;
						<ProgressChart
							progress={vault.VAULT_STATUS === 'withdraw' ? 1 : vaultData.progress}
							width={50} />
							&nbsp;{']'}&nbsp;
					</span>
					<span className={'-ml-2 mr-2 inline bg-neutral-0 text-neutral-900 md:hidden'}>
							&nbsp;{'['}&nbsp;
						<ProgressChart
							progress={vault.VAULT_STATUS === 'withdraw' ? 1 : vaultData.progress}
							width={30} />
							&nbsp;{']'}&nbsp;
					</span>
					{`${vault.VAULT_STATUS === 'withdraw' ? '100' : (vaultData.progress * 100).toFixed(2)}%`}
				</div>
			</div>
		</section>
	);
}

export default VaultDetails;