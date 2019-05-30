import React from 'react';
import { render } from 'react-dom';
import AvatarCrop from './AvatarCrop.jsx';

const Example = () => (
	<div>
		<div style={{ margin: 15, width: 200, height: 200 }}>
			<AvatarCrop />
		</div>
	</div>
);

render(<Example />, document.getElementById('root'));
