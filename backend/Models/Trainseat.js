
const mongoose = require('mongoose');

const trainSchema = new mongoose.Schema({
  trainNo: { type: String, required: true },
  trainName: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  availableSeats: {
    "1A": { type: Number, default: 0 },
    "2A": { type: Number, default: 0 },
    "3A": { type: Number, default: 0 },
    "SL": { type: Number, default: 0 }
  },
});

module.exports = mongoose.model('Traiseat', trainSchema);
