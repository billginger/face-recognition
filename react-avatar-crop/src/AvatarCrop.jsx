import React from 'react';
import Icon from '../../react-icon/dist/bundle.js';
import './less/style.less';

class AvatarCrop extends React.Component {
	constructor(props) {
		super(props);
		this.state = { imgData: '' };
	}
	render() {
		return (
			<div id="react-avatar-crop">
			</div>
		);
	}
}

export default AvatarCrop;
