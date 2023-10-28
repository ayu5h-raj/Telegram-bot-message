const { Server } = require("socket.io");
const Message = require("./messages.model");

function initializeSocket(server) {
  const io = new Server(server);

  io.on("connection", (socket) => {
    console.log("Client connected");

    // Emit previous messages to the client
    socket.on("getPreviousMessages", async () => {
      const messages = await Message.find();
      socket.emit("previousMessages", messages);
    });
  });
}

module.exports = initializeSocket;
