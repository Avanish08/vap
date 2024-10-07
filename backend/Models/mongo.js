const mongoose = require('mongoose');


const mongoURI = 'mongodb+srv://akdis0302:admin45@manzil.ulnnq.mongodb.net/'; 


const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1); 
    }
};

module.exports = connectDB;