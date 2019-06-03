import React from 'react';
import canvas from './canvas.js';
// import Icon from '../../react-icon/dist/bundle.js';
// import './less/style.less';

class AvatarCrop extends React.Component {
	componentDidMount() {
		const { container } = this.refs;
		const { src } = this.props;
		canvas(container, src);
	}
	render() {
		return (
			<div id="react-avatar-crop" ref="container"></div>
		);
	}
}

export default AvatarCrop;
