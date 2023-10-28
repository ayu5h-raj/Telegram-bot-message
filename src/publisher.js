const Redis = require('ioredis');

const publisher = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

publisher.on('connect', () => {
  console.log('Publisher connected');
})

publisher.on('error', (err) => {
  console.log('Publisher error: ', err);
});

module.exports = publisher;