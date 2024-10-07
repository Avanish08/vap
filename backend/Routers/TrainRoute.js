const express = require('express');
const router = express.Router();
const Train = require('../Models/Train'); // Adjust the path as necessary

// Fetch all train schedules
router.get('/train', async (req, res) => {
  try {
    const trains = await Train.find(); // Fetching all train data from the database
    res.json(trains);
  } catch (error) {
    console.error('Error fetching train schedules:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


const { getAllTrains, bookSeat } = require('../Controller/TrainSeatCont');


router.get('/booking', getAllTrains);


router.post('/booked', bookSeat);

module.exports = router;


