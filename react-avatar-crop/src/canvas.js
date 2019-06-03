/* // Debug Function
const eventStringify = e => {
	let str = '{\n';
	for (let key in e) {
		str += `${key}: ${e[key]},\n`;
	}
	str += '}\n';
	return str;
} */

export default (container, src) => {
	const canvas = document.createElement('canvas');
	canvas.width = container.clientWidth;
	canvas.height = container.clientWidth;
	container.appendChild(canvas);
	const ctx = canvas.getContext('2d');
	const img = new Image();
	let x = 0, y = 0, r = 0, width, height, maxWidth, maxHeight, minWidth, minHeight;
	const drawImage = () => {
		// Boundary Control
		if (x > 0) {
			x = 0;
		}
		if (x < canvas.width - width) {
			x = canvas.width - width;
		}
		if (y > 0) {
			y = 0;
		}
		if (y < canvas.height - height) {
			y = canvas.height - height;
		}
		// Wipe & Draw
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		if (r) {
			ctx.save();
			ctx.translate(canvas.width / 2, canvas.height / 2);
			ctx.rotate(r * Math.PI / 180);
			ctx.translate(-(canvas.width / 2), -(canvas.height / 2));
			ctx.drawImage(img, x, y, width, height);
			ctx.restore();
		} else {
			ctx.drawImage(img, x, y, width, height);
		}
	}
	img.onload = () => {
		const imgWidth = img.width;
		const imgHeight = img.height;
		// Fully Filled
		if (imgWidth > imgHeight) {
			width = Math.floor(canvas.height / imgHeight * imgWidth);
			height = canvas.height;
		} else {
			width = canvas.width;
			height = Math.floor(canvas.width / imgWidth * imgHeight);
		}
		maxWidth = imgWidth > width ? imgWidth : width;
		maxHeight = imgHeight > height ? imgHeight : height;
		minWidth = width;
		minHeight = height;
		x = Math.floor((canvas.width - width) / 2);
		y = Math.floor((canvas.height - height) / 2);
		drawImage();
	}
	img.src = src;
	// Handle
	let drag = 0, scale = 0, pageX, pageY;
	const handleZoom = offset => {
		const originalWidth = width;
		const originalHeight = height;
		if (offset < 0) {
			// Zoom Out
			width = Math.floor(width * 0.9);
			height = Math.floor(height * 0.9);
			if (width < minWidth) {
				width = minWidth;
				height = minHeight;
			}
		} else {
			// Zoom In
			width = Math.floor(width * 1.1);
			height = Math.floor(height * 1.1);
			if (width > maxWidth) {
				width = maxWidth;
				height = maxHeight;
			}
		}
		// In Center
		x = x - Math.floor((width - originalWidth) / 2);
		y = y - Math.floor((height - originalHeight) / 2);
		drawImage();
	}
	const handleTouchStart = e => {
		// If mouse, only accept left button
		if (e.button && e.button > 1) return;
		// Drag Start
		drag = 1;
		canvas.style.cursor = 'move';
		pageX = e.pageX;
		pageY = e.pageY;
		console.log(e);
	}
	const handleTouchMove = e => {
		e.preventDefault();
		// If scale, then zoom
		if (e.scale && e.scale != 1) {
			const offset = e.scale - scale;
			// Zoom Smooth
			if (Math.abs(offset) < 0.1) return;
			scale = e.scale;
			return handleZoom(offset);
		}
		// No scale, then drag
		if (drag) {
			let offsetX, offsetY;
			switch (r) {
				case 0:
					offsetX = e.pageX - pageX;
					offsetY = e.pageY - pageY;
					break;
				case 90:
					offsetX = e.pageY - pageY;
					offsetY = pageX - e.pageX;
					break;
				case 180:
					offsetX = pageX - e.pageX;
					offsetY = pageY - e.pageY;
					break;
				default:
					offsetX = pageY - e.pageY;
					offsetY = e.pageX - pageX;
			}
			x += offsetX;
			y += offsetY;
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
	// Actions
	const actions = document.createElement('div');
	const actionRotate = document.createElement('a');
	actionRotate.innerText = 'Rotate';
	container.appendChild(actions);
	actions.appendChild(actionRotate);
	const handleRotate = () => {
		r += 90;
		if (r == 360) {
			r = 0;
		}
		drawImage();
	}
	actionRotate.addEventListener('click', handleRotate);
};
