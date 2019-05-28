import React from 'react';
import IconLibrary from './IconLibrary.js';

const Icon = ({ type, size, color }) => {
	size = size || 48;
	color = color || '#333';
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
			<path d={IconLibrary[type]} fill={color} />
		</svg>
	);
};

export default Icon;
