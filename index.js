const express = require('express');
const mongoose = require('mongoose');
const http = require('http');

const app = express();
const server = http.createServer(app);

require('dotenv').config()
require('./src/mongodb')();
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



