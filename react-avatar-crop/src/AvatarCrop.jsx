import React from 'react';
import canvas from './canvas.js';
// import Icon from '../../react-icon/dist/bundle.js';
import './less/style.less';

class AvatarCrop extends React.Component {
	componentDidMount() {
		const container = document.getElementById('react-avatar-crop');
		const { src, onCrop, onCancel } = this.props;
		canvas(container, src, onCrop, onCancel);
	}
	render() {
		return (
			<div id="react-avatar-crop"></div>
		);
	}
}

export default AvatarCrop;
