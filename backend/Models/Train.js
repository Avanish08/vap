
const mongoose = require('mongoose');

const TrainSchema = new mongoose.Schema({
  trainNo: { type: String, required: true, unique: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  arrival: { type: String, required: true },
  destination: { type: String, required: true },
});

const Train = mongoose.model('Train', TrainSchema);
module.exports = Train;
