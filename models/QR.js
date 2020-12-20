const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const QrSchema = new Schema({
  qr_id: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  redirectUrl: {
    type: String,
    required: true
  },
  counter: {
    type: number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = QR = mongoose.model("qrs", QrSchema);
