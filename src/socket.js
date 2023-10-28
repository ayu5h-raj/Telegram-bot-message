const socketIO = require("socket.io");
const Message = require("./messages.model");

function initializeSocket(server) {
  const io = socketIO(server);

  io.on("connection", (socket) => {
    
    console.log("Client connected: ", socket.id);

    socket.on("getPreviousMessages", async () => {
      const messages = await Message.find();
      socket.emit("previousMessages", messages);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected: ", socket.id);
    });
  });

  return io;
}

module.exports = initializeSocket;
