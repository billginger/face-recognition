import React from 'react';
import Icon from '../../react-icon/src/Icon.jsx';
import './less/style.less';

const Avatar = () => (
	<div id="react-avatar">
		<Icon className="crop_free" type="crop_free" color="#fff" />
		<Icon className="tag_faces" type="tag_faces" color="#fb056b" />
	</div>
);

export default Avatar;
