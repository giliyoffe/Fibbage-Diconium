const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises;
const questions = require('./questions.json');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
let randomQuestion = [];
let answersArr = [];
app.use(cors());

if (process.env.NODE_ENV === 'production') {
	// Serve any static files
	app.use(express.static(path.join(__dirname, '../client/build')));

	// Handle React routing, return all requests to React app
	app.get('*', function (req, res) {
		res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
	});
}
/**
 * questions Interface
 * {['normal' | 'final']: [
  {category:string,
question: string,
answer: string,
alternateSpellings: string[],
suggestions: : string[]}
,... ]
}
 */
const startGame = () => {
	let openingQs = questions.normal;
	let finalQs = questions.final;
	//TODO: fix/ create game implementation
	// for now it only returns the first Q.
	return openingQs;
};

io.on('connect', (socket) => {
	//Chat functionality
	socket.on('join', ({ name, room }, callback) => {
		const { error, user } = addUser({ id: socket.id, name, room });
		if (error) return callback(error);

		socket.join(user.room);

		socket.emit('message', {
			user: 'admin',
			text: `${user.name}, welcome to room ${user.room}.`,
		});
		socket.broadcast.to(user.room).emit('message', {
			user: 'admin',
			text: `${user.name} has joined!`,
		});

		io.to(user.room).emit('roomData', {
			room: user.room,
			users: getUsersInRoom(user.room),
		});

		callback();
	});

	socket.on('sendMessage', (message, callback) => {
		const user = getUser(socket.id);

		io.to(user.room).emit('message', { user: user.name, text: message });

		callback();
	});

	// ALL GAME CONNECTIONS start here
	socket.on('start-game', (callback) => {
		const user = getUser(socket.id);

		io.to(user.room).emit('start-game', true, {
			user: 'admin',
			text: 'starting Game...',
		});

		callback('starting the game..');
	});

	//create sockets for actual game interactions - theoretically all of the game logic should happen here?
	socket.on('join-game', ({ name, room }, callback) => {
		let randomNumber = Math.floor(startGame().length * Math.random());
		randomQuestion.push(randomNumber);

		console.log(randomNumber);
		const { error, user } = addUser({ id: socket.id, name, room });
		if (error) return callback(error);

		socket.join(user.room);

		socket.emit('game-message', {
			user: 'admin',
			text: `${user.name}, welcome to the game ${user.room}.`,
		});
		//should return the same question to each player (perhaps startGame function above needs to be within the socket)
		socket.emit('question', {
			user: 'admin',
			text: `${startGame()[randomQuestion[0]].question}`,
		});

		io.to(user.room).emit('roomData', {
			room: user.room,
			users: getUsersInRoom(user.room),
		});

		callback();
	});

	//create sockets for player answers in the game
	socket.on('sendAnswer', (message, callback) => {
		const user = getUser(socket.id);
		let users = getUsersInRoom(user.room);
		answersArr.push({
			user: user.name,
			text: message,
		});
		//currently when all players have submitted, move on to next stage or
		//TODO?: setInterval for timer that clears when answerArr is full
		if (answersArr.length === users.length) {
			//TODO: display all the answers as clickable buttons so players can choose their selection
			answersArr.forEach((answer) => {
				io.to(user.room).emit('answer', {
					user: admin,
					text: answer.text,
				});
			});
		}
		//TODO: after selection is chosen, display answers sequentially (with voters [and points])
		// this will likely be done in a separate route.
		callback('answer submitted');
	});

	//TODO: when a user closes the game window we should remove their id, so they can reconnect..
	// not currently working, needs room included in the removeUser function
	socket.on('leave-game', (callback) => {
		const user = removeUser(socket.id);

		io.to(user.room).emit('game-message', {
			user: 'admin',
			text: `${user.name} has left.`,
		});
		callback({ user: 'admin', text: 'You left the game.' });
	});

	socket.on('disconnect', () => {
		const user = removeUser(socket.id);

		if (user) {
			io.to(user.room).emit('message', {
				user: 'admin',
				text: `${user.name} has left.`,
			});
			io.to(user.room).emit('roomData', {
				room: user.room,
				users: getUsersInRoom(user.room),
			});
		}
	});
});

server.listen(process.env.PORT || 5000, () =>
	console.log(`Server has started.`)
);
