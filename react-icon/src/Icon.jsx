import React from 'react';
import IconLibrary from './IconLibrary.jsx';

const Icon = ({ className, type, color }) => {
	const SVG = IconLibrary[type];
	if (!SVG) {
		throw new Error(`No icon of type ${type}!`);
	}
	return (
		<SVG xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className={className} color={color} />
	);
};

export default Icon;
