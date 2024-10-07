const trainseat= require('../Models/Trainseat')


exports.getAllTrains = async (req, res) => {
    try {
      const trains = await trainseat.find();
      const trainDetails = trains.map(train => ({
        trainNo: train.trainNo,
        trainName: train.trainName,
        from: train.from,
        to: train.to,
        availableSeats: train.availableSeats,
      }));
      res.json(trainDetails);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  
  exports.bookSeat = async (req, res) => {
    const { trainNo, seatType } = req.body;
  
    try {
      const train = await Train.findOne({ trainNo });
      if (!train) {
        return res.status(404).json({ message: 'Train not found' });
      }
  
      if (train.availableSeats[seatType] <= 0) {
        return res.status(400).json({ message: 'No seats available in this section' });
      }
  
      train.availableSeats[seatType] -= 1; 
      await train.save(); 
  
      res.status(200).json({ message: 'Seat booked successfully', availableSeats: train.availableSeats });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  