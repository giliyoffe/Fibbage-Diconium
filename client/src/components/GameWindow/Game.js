import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';

import './Game.css';

const GameWindow = ({ room, name, socket }) => {
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState([]);
	const [flag, setFlag] = useState(0);

	useEffect(() => {
		socket.emit('join-game', { name, room }, (error) => {
			if (error) {
				setFlag(1);
				alert(error);
			}
		});
	});

	useEffect(() => {
		socket.on('question', (message) => {
			setMessages((messages) => [...messages, message]);
		});
		socket.on('game-message', (message) => {
			setMessages((messages) => [...messages, message]);
		});
	});

	const sendMessage = (event) => {
		event.preventDefault();
		//TODO: this event should submit your answer (to not be displayed)
		if (message) {
			socket.emit('sendAnswer', message, () => setMessage(''));
		}
	};

	if (flag) {
		return <Redirect to="/" />;
	}

	return (
		<div className="container">
			<InfoBar room={room} />
			<Messages messages={messages} name={name} />
			<Input
				message={message}
				setMessage={setMessage}
				sendMessage={sendMessage}
			/>
		</div>
	);
};

export default GameWindow;
