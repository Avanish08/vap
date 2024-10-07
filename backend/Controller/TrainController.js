// controllers/trainController.js

const Train = require('../Models/Train');

exports.getTrains = async (req, res) => {
  try {
    const trains = await Train.find();
    res.status(200).json(trains);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching train data' });
  }
};

