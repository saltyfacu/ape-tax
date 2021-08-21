/******************************************************************************
**	@Author:				Thomas Bouder <Tbouder>
**	@Email:					Tbouder@protonmail.com
**	@Date:					Saturday August 21st 2021
**	@Filename:				404.js
******************************************************************************/

import	React	from	'react';

function	Index() {
	return (
		<main lang={'pug'}>
			<div className={'flex flex-col justify-center items-center mt-8'}>
				<p className={'text-4xl font-mono font-medium leading-11'}>{'😵'}</p>
				<p className={'text-4xl font-mono font-medium text-ygray-900 leading-11'}>{'Page Not Found'}</p>
				<p className={'text-4xl font-mono font-medium text-ygray-900 leading-11'}>{'404'}</p>
			</div>
		</main>
	);
}

export default Index;