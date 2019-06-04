import React from 'react';
import ReactDOM from 'react-dom';

class AvatarSelectModal extends React.Component {
	constructor(props) {
		super(props);
		this.el = document.createElement('div');
		document.body.appendChild(this.el);
	}
	render() {
		return ReactDOM.createPortal(
			this.props.children,
			this.el
		);
	}
}

export default AvatarSelectModal;
