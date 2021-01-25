import React from 'react';
import Button from 'react-bootstrap/Button';
import onlineIcon from '../../icons/onlineIcon.png';

import './TextContainer.css';

const TextContainer = ({ users, onPlay, countdown }) => (
	<div className="textContainer">
		<div>
			<h1>Welcome to Fibbage</h1>
			<h2>
				Created by //diconium and for People{' '}
				<span role="img" aria-label="emoji">
					❤️
				</span>
			</h2>
			<h2>
				Start a game?{' '}
				<Button
					role="submit"
					aria-label="button"
					onClick={() => onPlay()}
				>
					{countdown ? 'Stop' : 'Play'}
				</Button>{' '}
				{/* //TODO: implement button updating and countdown visualization 
        ALSO: why isnt the boostrap button showing up?*/}
				{countdown && (
					<>
						<span>1..</span>
						<span>2..</span>
						<span>3..</span>
					</>
				)}
			</h2>
		</div>
		{users ? (
			<div>
				<h1>People currently chatting:</h1>
				<div className="activeContainer">
					<h2>
						{users.map(({ name }) => (
							<div key={name} className="activeItem">
								{name}
								<img alt="Online Icon" src={onlineIcon} />
							</div>
						))}
					</h2>
				</div>
			</div>
		) : null}
	</div>
);

export default TextContainer;
