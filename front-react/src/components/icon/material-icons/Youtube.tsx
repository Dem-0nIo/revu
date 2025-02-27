import React, { SVGProps } from 'react';

const SvgYoutube = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg viewBox="0 0 24 24" fill="currentColor" className="svg-icon" {...props}>
			<path d="M19.615,3.184C21.304,3.737,22.5,5.04,22.5,7.5V16.5C22.5,18.96,21.304,20.263,19.615,20.816C17.998,21.36,12,21.5,12,21.5C12,21.5,6.002,21.36,4.385,20.816C2.696,20.263,1.5,18.96,1.5,16.5V7.5C1.5,5.04,2.696,3.737,4.385,3.184C6.002,2.64,12,2.5,12,2.5C12,2.5,17.998,2.64,19.615,3.184ZM10,15.5L16,12L10,8.5V15.5Z" />
		</svg>
	);
};

export default SvgYoutube;