import '../Css/TrainDetail.css';
import React, { useEffect, useState } from 'react';

const TrainDetails = () => {
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrains = async () => {
      try {
        const response = await fetch('http://localhost:5000/auth/booking');
        if (!response.ok) {
          throw new Error('Failed to fetch train details');
        }
        const data = await response.json();
        setTrains(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrains();
  }, []);

  const handleBookSeat = async (trainNo, seatType) => {
    try {
      const response = await fetch('http://localhost:5000/auth/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ trainNo, seatType }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }
      alert(result.message); // Notify the user of successful booking
      // Optionally, refresh the train list or update the available seats
      setTrains(trains.map(train => train.trainNo === trainNo ? { ...train, availableSeats: result.availableSeats } : train));
    } catch (error) {
      alert(error.message); // Notify the user of the error
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="train-details">
      <h2>Train Details</h2>

      {trains.map((train, index) => (
        <div key={index} className="train-container">
          {/* Train Header with Train Number and Name */}
          <div className="trainheader">
            <h2>{train.trainNo}</h2> 
            <h2>{train.trainName}</h2>
          </div>
          <hr />
          
          {/* Train Route with From and To */}
          <div className="trainroute">
            <h3>{train.from}</h3>
            <h5>------------------------------------------</h5>
            <h3>{train.to}</h3>
          </div>
          <hr />
          
          {/* Available Seats and Booking Buttons */}
          <div className="avaibleseats">
            <div className="seat">
              <h2>SL: {train.availableSeats?.SL || 0}</h2>
              <h2>1A: {train.availableSeats?.['1A'] || 0}</h2>
              <h2>2A: {train.availableSeats?.['2A'] || 0}</h2>
              <h2>3A: {train.availableSeats?.['3A'] || 0}</h2>
            </div>
            <div className="book">
              {['SL', '1A', '2A', '3A'].map((seatType) => (
                train.availableSeats && train.availableSeats[seatType] > 0 ? (
                  <button 
                    key={seatType} 
                    onClick={() => handleBookSeat(train.trainNo, seatType)}
                  >
                    Book {seatType} Now
                  </button>
                ) : (
                  <button key={seatType} disabled>
                    {seatType} Full
                  </button>
                )
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrainDetails;
