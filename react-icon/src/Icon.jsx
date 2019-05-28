import React from 'react';
import IconLibrary from './IconLibrary.js';

const Icon = ({ className, type, color }) => {
	const d = IconLibrary[type];
	if (!d) {
		throw new Error(`No icon of type ${type}!`);
	}
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className={className}>
			<path d={d} fill={color} />
		</svg>
	);
};

export default Icon;
