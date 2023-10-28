const Redis = require('ioredis');

const publisher = new Redis({
  host: 'localhost',
  port: 6379,
});

publisher.on('connect', () => {
  console.log('Publisher connected');
})

publisher.on('error', (err) => {
  console.log('Publisher error: ', err);
});

module.exports = publisher;