const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
  busNo: { type: String, required: true },
  busName: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  departureDate: { type: Date, required: true },
  seats: {
    total: { type: Number, required: true },
    booked: { type: Number, default: 0 },
  },
  arrival: { type: String, required: true },
  destination: { type: String, required: true },
});

const Bus = mongoose.model('Busseat', busSchema);
module.exports = Bus;
