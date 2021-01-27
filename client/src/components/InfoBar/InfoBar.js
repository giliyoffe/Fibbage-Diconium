import React from 'react';
import './InfoBar.css';
import closeIcon from '../../icons/closeIcon.png';
import onlineIcon from '../../icons/onlineIcon.png';

const InfoBar = ({ room, onClick }) => (
	<div className="infoBar">
		<div className="leftInnerContainer">
			<img className="onlineIcon" src={onlineIcon} alt="online" />
			<h3>{room}</h3>
		</div>
		<div className="rightInnerContainer">
			{onClick ? (
				<img onClick={onClick} src={closeIcon} alt="close" />
			) : (
				<a href="/">
					<img src={closeIcon} alt="close" />
				</a>
			)}
		</div>
	</div>
);

export default InfoBar;
