import React from 'react';
import Icon from '../../react-icon/dist/bundle.js';
import './less/style.less';

class Avatar extends React.Component {
	constructor(props) {
		super(props);
		this.state = { imgData: '' };
	}
	render() {
		const { imgData } = this.state;
		const iconTag = (
			!imgData && <Icon type="add_a_photo" color="#fff" />
		);
		const imgTag = (
			imgData && <img src={imgData} />
		);
		// Handle
		const selectFile = () => {
			this.refs.fileInput.click();
		}
		const handleFileChange = e => {
			const files = e.target.files;
			if (!files.length || files[0].type.indexOf('image/') != 0) {
				return console.log('File Error!');
			}
			const reader = new FileReader();
			reader.onload = () => {
				this.setState({ imgData: reader.result });
			}
			reader.readAsDataURL(files[0]);
		}
		return (
			<div id="react-avatar" onClick={selectFile}>
				{iconTag}
				<input ref="fileInput" type="file" accept="image/*" onChange={handleFileChange} />
				{imgTag}
			</div>
		);
	}
}

export default Avatar;
