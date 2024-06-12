// TODO: remove chat, because user have probably no time to chat. EVALUATE FIRST

const { getUser } = require("../users");

// DEFER TODO: move all chat related stuff to chat module
const chatMiddleware = (socket, io) => {
  socket.on("send-message", (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit("message", { user: user.name, text: message });

    callback();
  });
}

module.exports = {
  chatMiddleware
}
