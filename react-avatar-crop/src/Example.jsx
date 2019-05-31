import React from 'react';
import { render } from 'react-dom';
import AvatarCrop from './AvatarCrop.jsx';

const Example = () => (
	<div>
		<AvatarCrop src="img/pic.jpg" />
	</div>
);

render(<Example />, document.getElementById('root'));
