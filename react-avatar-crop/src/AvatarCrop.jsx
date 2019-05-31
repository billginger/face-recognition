import React from 'react';
// import Icon from '../../react-icon/dist/bundle.js';
// import './less/style.less';

const eventStringify = e => {
	let str = '{\n';
	for (let key in e) {
		str += `${key}: ${e[key]},\n`;
	}
	str += '}\n';
	return str;
}

class AvatarCrop extends React.Component {
	constructor(props) {
		super(props);
		this.state = { canvasWidth: 360, canvasHeight: 360 };
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
		let drag = 0, pageX, pageY;
		const handleZoom = scale => {
			const originalWidth = width;
			const originalHeight = height;
			if (scale < 1) {
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
		const handleTouchStart = e => {
			// if mouse, only accept left button
			if (e.button && e.button > 1) return;
			// touch start
			drag = 1;
			canvas.style.cursor = 'move';
			pageX = e.pageX;
			pageY = e.pageY;
		}
		const handleTouchMove = e => {
			e.preventDefault();
			if (e.scale && e.scale != 1) return handleZoom(e.scale);
			if (drag) {
				x = x + e.pageX - pageX;
				y = y + e.pageY - pageY;
				pageX = e.pageX;
				pageY = e.pageY;
				drawImage();
			}
		}
		const handleTouchEnd = () => {
			drag = 0;
			canvas.style.cursor = 'default';
		}
		const handleMouseZoom = e => {
			e.preventDefault();
			handleZoom(-e.deltaY);
		}
		canvas.addEventListener('touchstart', handleTouchStart);
		canvas.addEventListener('mousedown', handleTouchStart);
		canvas.addEventListener('touchmove', handleTouchMove);
		canvas.addEventListener('mousemove', handleTouchMove);
		canvas.addEventListener('touchend', handleTouchEnd);
		canvas.addEventListener('mouseup', handleTouchEnd);
		canvas.addEventListener('mousewheel', handleMouseZoom);
	}
	render() {
		const { canvasWidth, canvasHeight, debugInfo } = this.state;
		return (
			<div id="react-avatar-crop">
				<div><canvas ref="canvas" width={canvasWidth} height={canvasHeight}></canvas></div>
				<div><textarea style={{ width: 320, height: 320 }} value={debugInfo} /></div>
			</div>
		);
	}
}

export default AvatarCrop;
