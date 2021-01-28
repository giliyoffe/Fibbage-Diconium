import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import ProgressBar from "../ProgressBar/ProgressBar";
import Answers from '../Answers';

import './Game.css';

const GameWindow = ({ room, name, socket, closeGame}) => {
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState([]);
	const [answers, setAnswers] = useState([]);
	const [flag, setFlag] = useState(0);

	useEffect(() => {
		socket.emit('join-game', { name, room }, (error) => {
			if (error) {
				setFlag(1);
				alert(error);
			}
		});
	}, []);

	useEffect(() => {
		['question', 'game-message'].forEach((item) =>
			socket.on(item, (message) => {
				setMessages((messages) => [...messages, message]);
			})
		);

		socket.on('answers', (answers) => {
      console.log('answers', answers);
      setAnswers(answers);
    });
	}, []);

	const sendMessage = (event) => {
		event.preventDefault();
		if (message) {
			socket.emit('sendAnswer', message, () => setMessage(''));
		}
	};

  // TODO: placeholder. get ansers some other way
	const getAnswers = () => {
    socket.emit('getAnswers', '', response => console.log(response));
	};

	if (flag) {
		return <Redirect to="/" />;
	}

	return (
		<div className="container">
			<InfoBar room={room} onClick={closeGame}/>
			<Messages messages={messages} name={name} />
      <Answers
        answers={answers}
      />
			<ProgressBar />
			<Input
				message={message}
				setMessage={setMessage}
				sendMessage={sendMessage}
			/>
    <button type="button" onClick={() => getAnswers()}>get answers</button>
		</div>
	);
};

export default GameWindow;
