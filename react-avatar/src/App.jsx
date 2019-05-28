import React from 'react';
import { render } from 'react-dom';
import ReactAvatar from './ReactAvatar.jsx';

const App = () => (
	<div>
		<div>立刻上載相片或拍攝相片<br />以面部識認建立專屬您的 Face ID</div>
		<ReactAvatar />
		<div><button>Next</button></div>
	</div>
);

render(<App />, document.getElementById('root'));
