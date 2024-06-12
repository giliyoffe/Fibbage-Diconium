const { addUser, getUser, getUsersInRoom, removeUser} = require("../users");
const { getQuestions } = require("./questions");

let randomQuestion = [];
let answersArr = [];

// DEFER TODO: move all questions related stuff to game module
const gameMiddleware = (socket, io) => {
  let randomNumber = Math.floor(getQuestions().length * Math.random());
  randomQuestion.push(randomNumber);

  // DEFER TODO: When to push
  realAnswer = `${getQuestions()[randomQuestion[0]].answer}`;

  // ALL GAME CONNECTIONS start here
  socket.on("client-start-game", (callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit("server-start-game", true, {
      user: "system message",
      text: "starting Game...",
    });

    callback("starting the game..");
  });

  //create sockets for actual game interactions - theoretically all of the game logic should happen here?
  socket.on("join-game", ({ name, room }, callback) => {

    const { error, user } = addUser({ id: socket.id, name, room });
    if (error) return callback(error);


    // user.exists is example need some condition here :)
    if(user.exists){
      socket.emit("user-name-exists", {
        room: user.room,        
      });  
    }

    socket.join(user.room);

    socket.emit("game-message", {
      user: "system message",
      text: `${user.name}, welcome to the game ${user.room}.`,
    });

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  socket.emit("question", {
    user: "system message",
    text: `${getQuestions()[randomQuestion[0]].question}`,
  });

  //create sockets for player answers in the game
  socket.on("send-answer", (message, callback) => {
    // DEFER TODO: does it makes sense to import it here
    const user = getUser(socket.id);
    const users = getUsersInRoom(user.room);
    // TODO: make sure that you cannot answer more than once!


    // TODO: check if lie exists in answer array
    if(answer.isPartofTrueAnswerArray){
      socket.emit("lie-is-truth", {
        //blabla
      });
    }else{      
    answersArr.push({
      user: user.name,
      text: message,
    });
    console.log("answersArr :", answersArr, "\n users : ", users);
    if (answersArr.length === users.length) {
      answersArr.push({
        user: 'System',
        text: realAnswer,
      });
      io.to(user.room).emit("answers", answersArr);
    }
    callback("answer submitted");
    }

  });

  // send final scores for the final screen
  socket.emit("finish-game", {
    user: "system message",
    text: `${getQuestions()[randomQuestion[0]].question}`,
  });


  // TODO Start new game with same room, users (new can join), removed questions which were already in use and resetted score
  socket.on("start-new-game", (callback) => {
    console.log(callback);  
  });



  //TODO: when a user closes the game window we should remove their id, so they can reconnect..
  // not currently working, needs room included in the removeUser function
  socket.on("leave-game", (callback) => {
    const user = removeUser(socket.id);

    io.to(user.room).emit("game-message", {
      user: "system message",
      text: `${user.name} has left.`,
    });
    callback({ user: "system message", text: "You left the game." });
  });
}

module.exports = {
  gameMiddleware
}
