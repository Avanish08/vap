
const Bus = require('../Models/Bus');

exports.getAllBuses = async (req, res) => {
  try {
    const buses = await Bus.find({});
    res.json(buses);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
