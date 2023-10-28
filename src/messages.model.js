const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  created_at: {
    type: Number,
    default: Date.now()
  }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
