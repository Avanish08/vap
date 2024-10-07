const Bus = require('../Models/Busseat');

// Fetch buses based on search criteria
exports.getBuses = async (req, res) => {
    const { from, to, date } = req.query;

    try {
        const buses = await Bus.find({
            from,
            to,
            departureDate: { $gte: new Date(date) },
        });
        console.log('Buses found:', buses); // Logging buses
        res.json(buses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Book a seat on the bus
exports.bookSeat = async (req, res) => {
    const { busNo, seats } = req.body;

    try {
        const bus = await Bus.findOne({ busNo });
        if (!bus) return res.status(404).json({ message: 'Bus not found' });
        
        if (bus.seats.booked + seats > bus.seats.total) {
            return res.status(400).json({ message: 'Not enough seats available' });
        }

        bus.seats.booked += seats;
        await bus.save();
        res.json({ message: 'Booking successful', availableSeats: bus.seats.total - bus.seats.booked });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
