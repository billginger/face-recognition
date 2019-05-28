import React from 'react';
import { render } from 'react-dom';
import Icon from './Icon.jsx';

const Example = () => (
	<div>
		<Icon type="add_a_photo" />
		<Icon type="crop_free" />
		<Icon type="tag_faces" />
	</div>
);

render(<Example />, document.getElementById('root'));
