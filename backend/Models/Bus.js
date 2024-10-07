
const mongoose = require('mongoose');

const BusSchema = new mongoose.Schema({
  BusNo_Name: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  arrival: { type: String, required: true },
  destination: { type: String, required: true },
});

const Bus = mongoose.model('Bus', BusSchema);
module.exports = Bus;
