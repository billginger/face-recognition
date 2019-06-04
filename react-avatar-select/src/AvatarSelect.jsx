import React from 'react';
import AvatarModal from './AvatarModal.jsx';
import Icon from '../../react-icon/dist/bundle.js';
import AvatarCrop from '../../react-avatar-crop/dist/bundle.js';
import './less/style.less';

class AvatarSelect extends React.Component {
	constructor(props) {
		super(props);
		this.state = { imgData: '', avatarData: '' };
	}
	render() {
		const { imgData, avatarData } = this.state;
		const iconTag = (
			!avatarData && <Icon type="add_a_photo" color="#fff" />
		);
		const imgTag = (
			avatarData && <img src={avatarData} />
		);
		const handleCrop = dataURI => {
			this.setState({ imgData: '', avatarData: dataURI });
		}
		const handleCancel = () => {
			this.setState({ imgData: '' });
		}
		const avatarModal = (
			<AvatarModal>
				<div id="react-avatar-select-modal">
					<AvatarCrop src={imgData} onCrop={handleCrop} onCancel={handleCancel} />
				</div>
			</AvatarModal>
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
				this.setState({ imgData: reader.result });
			}
			reader.readAsDataURL(files[0]);
		}
		return (
			<React.Fragment>
				<div id="react-avatar-select" onClick={selectFile}>
					<input ref="fileInput" type="file" accept="image/*" onChange={handleFileChange} />
					{iconTag}
					{imgTag}
				</div>
				{imgData && avatarModal}
			</React.Fragment>
		);
	}
}

export default AvatarSelect;
