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
// import { createContext } from 'react';


const ENDPOINT = '/';

let socket = io(ENDPOINT);

const Chat = ({ location }) => {
	const [name, setName] = useState('');
	const [room, setRoom] = useState('');
	const [users, setUsers] = useState([]);
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState([]);
	const [flag, setFlag] = useState(0);
	const [game, setGame] = useState(false);
	// const [countdown, setCountdown] = useState(false);


	// const nameContext = createContext(name);
	// const roomContext = createContext(room);
	// const usersContext = createContext(users);
	// const messageContext = createContext(message);
	// const messagesgesContext = createContext(messages);
	// const flagContext = createContext(flag);
	// const gameContext = createContext(game);

	// // const nameContext = useContext(name);
	// const roomContext = useContext(room);
	// const usersContext = useContext(users);
	// const messageContext = useContext(message);
	// const messagesgesContext = useContext(messages);
	// const flagContext = useContext(flag);
	// const gameContext = useContext(game);

	useEffect(() => {
		const { name, room } = queryString.parse(location.search);

		setRoom(room);
		setName(name);

		socket.emit('join', { name, room }, (error) => {
			if (error) {
				setFlag(1);
				alert(error);
			}
		});
	}, [location.search]);

	useEffect(() => {
		socket.on('message', (message) => {
			setMessages((messages) => [...messages, message]);
		});

		socket.on('start-game', (start, message) => {
			setTimeout(() => setGame(start), 3000);
			setMessages((messages) => [...messages, message]);
		});

		socket.on('roomData', ({ users }) => {
			setUsers(users);
		});
	}, []);

	const sendMessage = (event) => {
		event.preventDefault();

		if (message) {
			socket.emit('send-message', message, () => setMessage(''));
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
		console.log('start game btn pushed');
		debugger;
		socket.emit('start-game', (message) => console.log(message));
		setGame(true);
		// // setCountdown(!countdown);
		//TODO: create countdown/cancel interaction/event. upgrade onPlay to have timer and start function.
	}
	function closeGame() {
		socket.emit('leave-game', (message) =>
			setMessages([...messages, message])
		);
		setGame(false);
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
					onPlay={onPlay}
					countdown={false}
				/>
			)}
			{game && (
				<GameWindow
					room={`${room}-game`}
					name={name}
					socket={socket}
					closeGame={closeGame}
				/>
			)}
			{game && users ? <Players players={users} /> : null}
		</div>
	);
};

export default Chat;
