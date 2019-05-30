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
		let x = 0, y = 0, width, height;
		img.onload = () => {
			const imgWidth = img.width;
			const imgHeight = img.height;
			if (imgWidth > imgHeight) {
				width = canvasHeight / imgHeight * imgWidth;
				height = canvasHeight;
			} else {
				width = canvasWidth;
				height = canvasWidth / imgWidth * imgHeight;
			}
			ctx.drawImage(img, x, y, width, height);
		}
		img.src = src;
		// Handle
		let drag = 0, clientX, clientY;
		const handleTouchStart = e => {
			drag = 1;
			canvas.style.cursor = 'move';
			clientX = e.clientX;
			clientY = e.clientY;
		}
		const handleTouchMove = e => {
			if (drag) {
				x = x + e.clientX - clientX;
				y = y + e.clientY - clientY;
				clientX = e.clientX;
				clientY = e.clientY;
				if (x > 0) {
					x = 0;
				}
				if (x < canvasWidth - width) {
					x = canvasWidth - width;
				}
				if (y > 0) {
					y = 0;
				}
				if (y < canvasHeight - height) {
					y = canvasHeight - height;
				}
				ctx.clearRect(0, 0, canvasWidth, canvasHeight);
				ctx.drawImage(img, x, y, width, height);
			}
		}
		const handleTouchEnd = () => {
			drag = 0;
			canvas.style.cursor = 'default';
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
