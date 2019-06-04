import React from 'react';
import { render } from 'react-dom';
import AvatarCrop from './AvatarCrop.jsx';

const handleCrop = dataURI => {
	console.log(dataURI);
}

const handleCancel = () => {
	// do something
}

const Example = () => (
	<div style={{ maxWidth: 320 }}>
		<AvatarCrop src="img/pic.jpg" onCrop={handleCrop} onCancel={handleCancel} />
	</div>
);

render(<Example />, document.getElementById('root'));
