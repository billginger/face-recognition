import React from 'react';
import IconLibrary from './IconLibrary.jsx';

const Icon = ({ className, type, color }) => {
	color = color || '#333';
	return (
		<div className={className}>
			{IconLibrary[type]}
		</div>
	);
};

export default Icon;
