import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import ProgressBar from "../ProgressBar/ProgressBar";

import "./Game.css";
import Question from "../Question/Question";

const GameWindow = ({ room, name, socket, closeGame }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [flag, setFlag] = useState(0);

  useEffect(() => {
    socket.emit("join-game", { name, room }, (error) => {
      if (error) {
        setFlag(1);
        alert(error);
      }
    });
  }, []);

  useEffect(() => {
    ["question", "game-message"].forEach((item) =>
      socket.on(item, (message) => {
        setMessages((messages) => [...messages, message]);
      })
    );
    //TODO: currently shows your answer when you type. should show clickable options once people submit options
    socket.on("answer", (message) => {
      setMessages((messages) => [...messages, message]);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    //TODO: this event should submit your answer (to not be displayed)
    if (message) {
      socket.emit("sendAnswer", message, () => setMessage(""));
    }
  };

  if (flag) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container">
      <InfoBar room={room} onClick={closeGame} />
      <Question message={messages[1]} />
      <ProgressBar />
      <Input
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
      />
    </div>
  );
};

export default GameWindow;
