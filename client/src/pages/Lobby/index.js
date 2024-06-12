import React, { useState, state, useEffect } from "react";
import { useHistory } from "react-router-dom";
import io from 'socket.io-client';

// import Chat{setGame} from  '../../components/Chat/Chat';
import PlayerList from '../../components/PlayerList';

import "../Join/Join.css";
// import Check from '../Check/Check';

const ENDPOINT = '/';

let socket = io(ENDPOINT);

const Lobby = () => {
  let history = useHistory();
  // let nameContext = useContext(name);
  // let roomContext = useContext(room);
  // let usersContext = useContext(users);
  // let messageContext = useContext(message);
  // let messagesgesContext = useContext(messages);
  // let flagContext = useContext(flag);
  // let gameContext = useContext(game);
 
  const [users, setUsers] = useState([]);

  // Enable keyPress Enter to sign in.
  const startGame = () => {
    socket.emit('client-start-game', () => {
        setTimeout(() => state.setGame(state.start), 3000);
        state.setMessages((messages) => [...messages, state.message]);
    });
  };

  useEffect(() => {

        socket.on('roomData', ({ users }) => {
            setUsers(users);
        });

		socket.on('server-start-game', () => {
			history.push("/providelie");
		});
	}, [history]);

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Play Fibbage!</h1>
            <PlayerList players={users} />
            <button className={"button mt-20"} type="submit" onClick={startGame}>
              Start Game
            </button>
      </div>
    </div>
  );
};

export default Lobby;
