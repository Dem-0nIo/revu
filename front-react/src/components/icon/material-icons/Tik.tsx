
import React, { SVGProps } from 'react';

const SvgTikTok = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg viewBox='0 0 16 16' fill='currentColor' className='svg-icon' {...props}>
            <path d='M0 0h24v24H0V0zm0 0h24v24H0V0z' fill='none' />
			<path
				d='M15 15H5v4h14v-4h-4zm-7 3H6v-2h2v2zm3.5 0h-2v-2h2v2zm3.5 0h-2v-2h2v2z'
				opacity={0.3}
			/>
			<path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z"/>
		</svg>
	);
};

export default SvgTikTok;