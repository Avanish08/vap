const express = require('express');
const router = express.Router();
const Bus = require('../Models/Bus'); // Adjust the path as necessary

// Fetch all bus schedules
router.get('/bus', async (req, res) => {
  try {
    const buses = await Bus.find(); // Fetching all bus data from the database
    res.json(buses);
  } catch (error) {
    console.error('Error fetching bus schedules:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});






const { getBuses, bookSeat } = require('../Controller/busseatCon');

router.get('/busstat', getBuses); // Correct function reference
router.post('/bus/book', bookSeat); // Correct function reference






module.exports = router;
