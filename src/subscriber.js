const Redis = require("ioredis");
const Message = require("./messages.model");
const socketIO = require("socket.io");

function initializeSubscriber(server) {
  const subscriber = new Redis({
    host: "localhost",
    port: 6379,
  });

  subscriber.subscribe("notifications", (err, count) => {
    if (err) {
      throw err;
    }
    console.log(`Subscribed to ${count} channel(s). Listening for updates...`);
  });

  const io = socketIO(server);

  subscriber.on("connect", () => {
    console.log("Subscriber connected");
  });

  subscriber.on("error", (err) => {
    console.log("Subscriber error: ", err);
  });

  subscriber.on("message", async (channel, message) => {
    try {
      console.log(`Received message from channel '${channel}': ${message}`);
      const newMessage = new Message({
        message,
      });
      await newMessage.save();

      io.emit("message", newMessage);
    } catch (err) {
      console.log(err);
    }
  });

  io.on("connection", (socket) => {
    console.log("Client connected");

    // Emit previous messages to the client
    socket.on("getPreviousMessages", async () => {
      const messages = await Message.find();
      socket.emit("previousMessages", messages);
    });
  });
}

module.exports = initializeSubscriber;
