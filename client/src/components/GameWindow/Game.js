import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';

import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import ProgressBar from '../ProgressBar/ProgressBar';
import Answers from '../Answers';
import Question from '../Question/Question';
import './Game.css';

const GameWindow = ({ room, name, socket, closeGame }) => {
	const [message, setMessage] = useState('');
	const [question, setQuestion] = useState('');
	const [answers, setAnswers] = useState([]);
	const [flag, setFlag] = useState(0);
	const [bar, setBar] = useState(false);

	useEffect(() => {
		socket.emit('join-game', { name, room }, (error) => {
			if (error) {
				setFlag(1);
				alert(error);
			}
		});
	}, []); // name, room, socket

	useEffect(() => {
		socket.on('question', (message) => {
			setQuestion( message);
			setBar(true);
		});

		socket.on('answers', (answers) => {
			console.log('answers', answers);
			setAnswers(answers);
			setBar(false);
			// setTimeout(setBar(true), 2000);
		});
	}, []); // socket

	const sendMessage = (event) => {
		event.preventDefault();
		if (message) {
			socket.emit('sendAnswer', message, () => setMessage(''));
		}
	};

	if (flag) {
		return <Redirect to="/" />;
	}

	return (
		<div className="container">
			<InfoBar room={room} onClick={closeGame} />
			<Question message={question} />
			<Answers answers={answers} />
			{bar && <ProgressBar />}
			<Input
				message={message}
				setMessage={setMessage}
				sendMessage={sendMessage}
			/>
		</div>
	);
};

export default GameWindow;
