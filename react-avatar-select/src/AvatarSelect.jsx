import React from 'react';
import AvatarSelectModal from './AvatarSelectModal.jsx';
import Icon from '../../react-icon/dist/bundle.js';
import AvatarCrop from '../../react-avatar-crop/dist/bundle.js';
import './less/style.less';

class AvatarSelect extends React.Component {
	constructor(props) {
		super(props);
		this.state = { imageData: '', avatarData: '' };
	}
	render() {
		const { imageData, avatarData } = this.state;
		const iconTag = (
			<Icon type="add_a_photo" color="#fff" />
		);
		const imgTag = (
			<img src={avatarData} />
		);
		// Avatar Crop
		const handleCrop = dataURI => {
			this.setState({ imageData: '', avatarData: dataURI });
		}
		const handleCancel = () => {
			this.setState({ imageData: '' });
		}
		const avatarModal = (
			<AvatarSelectModal>
				<div id="react-avatar-select-modal">
					<AvatarCrop src={imageData} onCrop={handleCrop} onCancel={handleCancel} />
				</div>
			</AvatarSelectModal>
		);
		// Handle
		const selectFile = () => {
			this.refs.fileInput.click();
		}
		const handleFileChange = e => {
			const files = e.target.files;
			if (!files.length || files[0].type.indexOf('image/') != 0) {
				return console.log('Incorrect file format!');
			}
			const reader = new FileReader();
			reader.onload = () => {
				this.setState({ imageData: reader.result });
			}
			reader.readAsDataURL(files[0]);
		}
		return (
			<React.Fragment>
				<div id="react-avatar-select" onClick={selectFile}>
					<input ref="fileInput" type="file" accept="image/*" onChange={handleFileChange} />
					{!avatarData && iconTag}
					{avatarData && imgTag}
				</div>
				{imageData && avatarModal}
			</React.Fragment>
		);
	}
}

export default AvatarSelect;
