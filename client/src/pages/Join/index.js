import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import io, { setFlag } from 'socket.io-client';
import "./Join.css";
// import { Alert } from "react-bootstrap";

const ENDPOINT = '/';

let socket = io(ENDPOINT);

const Join = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [userNameAlreadyExists, setUserNameAlreadyExists] = useState(false);

  // Enable keyPress Enter to sign in.
  const onFormSubmit = (e) => {
    e.preventDefault();
    socket.emit('join', { name, room }, (error) => {
			if (error) {
				setFlag(1);
				alert(error);
			}

		});
  };

  useEffect(() => {
		socket.on('userAlreadyExists', () => {
			setUserNameAlreadyExists(true);
      if (userNameAlreadyExists) {
        console.log('userAlreadyExists');
      }
		});

    socket.on('succesfulJoin', () =>  {
      history.push("/lobby");
    })
	}, [history, userNameAlreadyExists]);

  return (
    // {userNameAlreadyExists ? alert('user Name Already Exists'): 
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Play Fibbage!</h1>
        <form onSubmit={onFormSubmit}>
          <div>
            <input
              autoFocus
              placeholder="Name"
              className="joinInput"
              type="text"
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div>
            <input
              placeholder="Room"
              className="joinInput mt-20"
              type="text"
              onChange={(event) => setRoom(event.target.value)}
            />
          </div>
          <Link
            onClick={(event) =>
              !name || !room ? event.preventDefault() : null
            }
            to={`/chat?name=${name}&room=${room}`}
          >
            {/* //TODO: improve linking to allow joining room without name chosen. Edit: why would we want user without name?*/}
            <button className={"button mt-20"} type="submit">
              Sign In
            </button>
          </Link>
        </form>
        {/* } */}
      </div>
    </div>
  );
};

export default Join;
