const express = require('express');
const connectDB = require('./Models/mongo');
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRoute =require('./Routers/AuthRoute')
const trainRoutes = require('./Routers/TrainRoute');
const busRoutes = require('./Routers/BusRoute');
const app = express();
PORT =5000


connectDB();


app.use(cors());
app.use(bodyParser.json());

app.use('/auth', AuthRoute);
app.use('/auth', trainRoutes);
app.use('/auth', busRoutes);
app.use('/auth', busRoutes);


app.get('/', (req, res) => {
    res.send('<h1>Hii</h1>');
});
app.listen(PORT, () => {
    console.log(`Server is working on ${PORT}`);
});