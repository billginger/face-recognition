import React from 'react';
import { render } from 'react-dom';
import AvatarCrop from './AvatarCrop.jsx';

const Example = () => (
	<div style={{ width: 640, height: 640 }}>
		<AvatarCrop src="img/pic.jpg" />
	</div>
);

render(<Example />, document.getElementById('root'));
