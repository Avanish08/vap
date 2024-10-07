import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const BusResults = () => {
  const location = useLocation();
  const { from, to, date } = location.state || {};
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch bus details based on search parameters
  const fetchBuses = async () => {
    try {
        console.log(`Fetching buses from ${from} to ${to} on ${date}`);
        const response = await fetch(`http://localhost:5000/auth/busstat?from=${from}&to=${to}&date=${date}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch bus details');
        }
        
        const data = await response.json();
        console.log('Fetched bus data:', data); // Log the fetched data
        setBuses(data);
    } catch (error) {
        console.error('Error fetching bus details:', error);
    } finally {
        setLoading(false);
    }
};

  

useEffect(() => {
    const fetchBuses = async () => {
        try {
            console.log(`Fetching buses from ${from} to ${to} on ${date}`);
            const response = await fetch(`http://localhost:5000/auth/busstat?from=${from}&to=${to}&date=${date}`);

            if (!response.ok) {
                throw new Error('Failed to fetch bus details');
            }

            const data = await response.json();
            console.log('Fetched bus data:', data); // Log the fetched data
            setBuses(data);
        } catch (error) {
            console.error('Error fetching bus details:', error);
        } finally {
            setLoading(false);
        }
    };

    fetchBuses(); // Call fetchBuses when component mounts
}, [from, to, date]); // No need to include fetchBuses since it's defined here


  const handleBookSeat = async (busNo) => {
    const seatsToBook = prompt("Enter number of seats to book:");
    if (seatsToBook) {
      try {
        const response = await fetch('http://localhost:5000/auth/bus/book', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ busNo, seats: parseInt(seatsToBook, 10) }),
        });
        const result = await response.json();
        alert(result.message);
        fetchBuses(); // Refresh the bus list after booking
      } catch (error) {
        alert(error.message);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Bus Results</h2>
      {buses.length === 0 ? ( // Check if buses array is empty
        <div>No buses available for the selected route.</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Bus No</th>
              <th>Bus Name</th>
              <th>From</th>
              <th>To</th>
              <th>Available Seats</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {buses.map((bus) => (
              <tr key={bus.busNo}>
                <td>{bus.busNo}</td>
                <td>{bus.busName}</td>
                <td>{bus.from}</td>
                <td>{bus.to}</td>
                <td>{bus.seats.total - bus.seats.booked}</td>
                <td>
                  <button onClick={() => handleBookSeat(bus.busNo)}>Book Seat</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BusResults;
