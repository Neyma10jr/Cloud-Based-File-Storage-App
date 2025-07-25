const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  filename: String,
  email: String,
  url: String,
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('File', fileSchema);
