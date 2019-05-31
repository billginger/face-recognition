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
		let x = 0, y = 0, width, height, maxWidth, maxHeight, minWidth, minHeight;
		const drawImage = () => {
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
		img.onload = () => {
			const imgWidth = img.width;
			const imgHeight = img.height;
			if (imgWidth > imgHeight) {
				width = Math.floor(canvasHeight / imgHeight * imgWidth);
				height = canvasHeight;
			} else {
				width = canvasWidth;
				height = Math.floor(canvasWidth / imgWidth * imgHeight);
			}
			maxWidth = imgWidth > width ? imgWidth : width;
			maxHeight = imgHeight > height ? imgHeight : height;
			minWidth = width;
			minHeight = height;
			drawImage();
		}
		img.src = src;
		// Handle
		// https://www.cnblogs.com/airbreak/p/4595494.html
		// https://developer.mozilla.org/zh-CN/docs/Web/API/Touch_events
		// https://blog.csdn.net/jeffkxt/article/details/80472596
		// https://github.com/Hzy0913/Mavatar/blob/master/index.js
		// http://preview.binlive.cn/Mavatar/
		// https://github.com/mosch/react-avatar-editor/blob/master/src/index.js
		// https://react-avatar-editor.netlify.com/
		let drag = 0, clientX, clientY;
		const handleTouchStart = e => {
			// if mouse, only accept left button
			if (e.button && e.button > 1) return;
			// touch start
			drag = 1;
			canvas.style.cursor = 'move';
			clientX = e.clientX;
			clientY = e.clientY;
		}
		const handleTouchMove = e => {
			e.preventDefault();
			if (drag) {
				x = x + e.clientX - clientX;
				y = y + e.clientY - clientY;
				clientX = e.clientX;
				clientY = e.clientY;
				drawImage();
				this.setState({ debugInfo: e });
			}
		}
		const handleTouchEnd = () => {
			drag = 0;
			canvas.style.cursor = 'default';
		}
		const handleZoom = e => {
			e.preventDefault();
			const originalWidth = width;
			const originalHeight = height;
			if (e.deltaY > 0) {
				// zoom out
				width = Math.floor(width * 0.9);
				height = Math.floor(height * 0.9);
				if (width < minWidth) {
					width = minWidth;
					height = minHeight;
				}
			} else {
				// zoom in
				width = Math.floor(width * 1.1);
				height = Math.floor(height * 1.1);
				if (width > maxWidth) {
					width = maxWidth;
					height = maxHeight;
				}
			}
			x = x - Math.floor((width - originalWidth) / 2);
			y = y - Math.floor((height - originalHeight) / 2);
			drawImage();
		}
		canvas.addEventListener('touchstart', handleTouchStart);
		canvas.addEventListener('mousedown', handleTouchStart);
		canvas.addEventListener('touchmove', handleTouchMove);
		canvas.addEventListener('mousemove', handleTouchMove);
		canvas.addEventListener('touchend', handleTouchEnd);
		canvas.addEventListener('mouseup', handleTouchEnd);
		canvas.addEventListener('mousewheel', handleZoom);
	}
	render() {
		const { canvasWidth, canvasHeight, debugInfo } = this.state;
		return (
			<div id="react-avatar-crop">
				<canvas ref="canvas" width={canvasWidth} height={canvasHeight}></canvas>
				<textarea>{debugInfo}</textarea>
			</div>
		);
	}
}

export default AvatarCrop;
