const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const cors = require("cors");
const path = require("path");
const { addUser, removeUser, getUsersInRoom } = require("./modules/users");
const { gameMiddleware } = require("./modules/game");
const { chatMiddleware } = require("./modules/chat");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "../client/build")));

  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  });
}

io.on("connect", (socket) => {

  // merge all socket middlewares
  gameMiddleware(socket, io);
  chatMiddleware(socket, io);

  //Chat functionality
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    if (error) return callback(error);

    //TODO CHECK IF GAME STARTED
    // if(game-already-started){
    //   socket.emit("game-already-started", {
    //     user: "system message",
    //     text: `Hi, im sorry but the game already started.`,
    //   });
    // }else{
      socket.join(user.room);

      socket.emit("message", {
        user: "system message",
        text: `${user.name}, welcome to room ${user.room}.`,
      });
      socket.broadcast.to(user.room).emit("message", {
        user: "system message",
        text: `${user.name} has joined!`,
      });

      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    // }
    callback();
  });



  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", {
        user: "system message",
        text: `${user.name} has left.`,
      });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });


  //TODO: ERROR CASES JUST AT THE FINAL END UNIMPORTANT!!!!!!
  socket.on("user-lost-connection", () => {
    //pause game ?
  })

  socket.on("user-reconnect", () => {
    socket.broadcast.to(user.room).emit("user-has-reconnected", () => {

    });
  })
});

server.listen(process.env.PORT || 5011, () =>
  console.log(`Server has started.`)
);
