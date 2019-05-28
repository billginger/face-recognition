import React from 'react';
import { render } from 'react-dom';
import Avatar from './Avatar.jsx';

const Example = () => (
	<div>
		<div>立刻上載相片或拍攝相片<br />以面部識認建立專屬您的 Face ID</div>
		<Avatar />
		<div><button>Next</button></div>
	</div>
);

render(<Example />, document.getElementById('root'));
