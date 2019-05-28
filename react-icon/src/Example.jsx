import React from 'react';
import { render } from 'react-dom';
import Icon from './Icon.jsx';

const Example = () => (
	<div>
		<Icon type="crop" />
		<Icon type="face" />
	</div>
);

render(<Example />, document.getElementById('root'));
