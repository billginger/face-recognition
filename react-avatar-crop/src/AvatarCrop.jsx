import React from 'react';
import Icon from '../../react-icon/dist/bundle.js';
import './less/style.less';

class AvatarCrop extends React.Component {
	constructor(props) {
		super(props);
		this.state = { canvasWidth: 640, canvasHeight: 640 };
	}
	componentDidMount() {
		const { canvasWidth, canvasHeight } = this.state;
		const canvas = this.refs.canvas;
		const ctx = canvas.getContext('2d');
		const src = this.props.src;
		const img = new Image();
		img.onload = () => {
			const imgWidth = img.width;
			const imgHeight = img.height;
			let width, height;
			if (imgWidth > imgHeight) {
				width = canvasHeight / imgHeight * imgWidth;
				height = canvasHeight;
			} else {
				width = canvasWidth;
				height = canvasWidth / imgWidth * imgHeight;
			}
			ctx.drawImage(img, 0, 0, width, height);
		}
		img.src = src;
		// Handle
		let drag = 0;
		const handleTouchStart = () => {
			drag = 1;
		}
		const handleTouchMove = () => {
			if (drag) {
				console.log('drag!');
			}
		}
		const handleTouchEnd = () => {
			drag = 0;
		}
		canvas.addEventListener('touchstart', handleTouchStart);
		canvas.addEventListener('mousedown', handleTouchStart);
		canvas.addEventListener('touchmove', handleTouchMove);
		canvas.addEventListener('mousemove', handleTouchMove);
		canvas.addEventListener('touchend', handleTouchEnd);
		canvas.addEventListener('mouseup', handleTouchEnd);
	}
	render() {
		const { canvasWidth, canvasHeight } = this.state;
		return (
			<div id="react-avatar-crop">
				<canvas ref="canvas" width={canvasWidth} height={canvasHeight}></canvas>
			</div>
		);
	}
}

export default AvatarCrop;
