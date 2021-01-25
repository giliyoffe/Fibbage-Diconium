import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import { Redirect } from 'react-router';

import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import GameWindow from '../GameWindow/Game';
import onlineIcon from '../../icons/onlineIcon.png';

import './Chat.css';

let socket;

const Chat = ({ location }) => {
	const [name, setName] = useState('');
	const [room, setRoom] = useState('');
	const [users, setUsers] = useState([]);
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState([]);
	const [flag, setFlag] = useState(0);
	const [game, setGame] = useState(false);
	// const [countdown, setCountdown] = useState(false);
	const ENDPOINT = '/';

	useEffect(() => {
		const { name, room } = queryString.parse(location.search);

		socket = io(ENDPOINT);

		setRoom(room);
		setName(name);

		socket.emit('join', { name, room }, (error) => {
			if (error) {
				setFlag(1);
				alert(error);
			}
		});
	}, [ENDPOINT, location.search]);

	useEffect(() => {
		socket.on('message', (message) => {
			setMessages((messages) => [...messages, message]);
		});

		socket.on('roomData', ({ users }) => {
			setUsers(users);
		});
	}, []);

	const sendMessage = (event) => {
		event.preventDefault();

		if (message) {
			socket.emit('sendMessage', message, () => setMessage(''));
		}
	};

	if (flag) {
		return <Redirect to="/" />;
	}

	const Players = ({ players }) => {
		return (
			<div className="playerContainer">
				<h1>People currently chatting:</h1>
				<div className="activeContainer">
					<h2>
						{players.map(({ name }) => (
							<div key={name} className="activeItem">
								{name}
								<img alt="Online Icon" src={onlineIcon} />
							</div>
						))}
					</h2>
				</div>
			</div>
		);
	};
	function onPlay() {
		let clicks = 0;
		return () => {
			setTimeout(() => {
				setGame(clicks === 1);
				clicks = 0;
			}, 3000);
			clicks++;
			// setCountdown(!countdown); //for some reason this breaks the closure.
			//TODO: create countdown interaction/event. upgrade onPlay to have timer and start function.
		};
	}
	return (
		<div className="outerContainer">
			<div className="container">
				<InfoBar room={room} />
				<Messages messages={messages} name={name} />
				<Input
					message={message}
					setMessage={setMessage}
					sendMessage={sendMessage}
				/>
			</div>
			{!game && (
				<TextContainer
					users={users}
					onPlay={onPlay()}
					countdown={false}
				/>
			)}
			{game && (
				<GameWindow room={`${room}-game`} name={name} socket={socket} />
			)}
			{game && users ? <Players players={users} /> : null}
		</div>
	);
};

export default Chat;
