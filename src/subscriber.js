const Redis = require("ioredis");
const Message = require("./messages.model");

function initializeSubscriber(io) {
  const subscriber = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  });

  subscriber.subscribe("notifications", (err, count) => {
    if (err) {
      throw err;
    }
    console.log(`Subscribed to ${count} channel(s). Listening for updates...`);
  });

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
}

module.exports = initializeSubscriber;
