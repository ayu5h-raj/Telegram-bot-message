const express = require('express');
const mongoose = require('mongoose');
const http = require('http');

require('dotenv').config()

const app = express();
const server = http.createServer(app);

mongoose.connect(process.env.MONGO_SERVER, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.log("Failed to connect to mongodb", err);
})

require('./src/telegram.bot');

const io = require('./src/socket')(server);
require('./src/subscriber')(io);

app.get('/', (req, res) => {
  const path = __dirname + "/client/" + 'index.html';
  res.sendFile(path);
});

server.listen(3000, async () => {
  console.log('Server is running on port 3000');
});



