import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "../Css/Train.css"; // Train-specific styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrain, faCalendarDays } from "@fortawesome/free-solid-svg-icons";

const Train = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [trainSchedules, setTrainSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    date: '',
  });
  const [trainSearch, setTrainSearch] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredSchedules, setFilteredSchedules] = useState([]);

  const locations = [
    "Kalyan",
    "Mumbai",
    "Delhi",
    "Varanasi",
    "Pune",
    // Add more locations as necessary
  ];

  // Fetch train schedules from the API
  useEffect(() => {
    const fetchTrains = async () => {
      try {
        const response = await fetch('http://localhost:5000/auth/train');
        if (!response.ok) {
          throw new Error('Failed to fetch train schedules');
        }
        const data = await response.json();
        setTrainSchedules(data);
        setFilteredSchedules(data); // Initialize filtered schedules
      } catch (error) {
        console.error('Error fetching train schedules:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrains();
  }, []);

  // Handle train search by from, to, and date
  const handleSearch = (e) => {
    e.preventDefault();
    const { from, to, date } = searchParams;

    // Filter based on from, to, and date
    const filtered = trainSchedules.filter(schedule => {
      const isFromMatch = schedule.from === from;
      const isToMatch = schedule.to === to;
      const isDateMatch = new Date(schedule.arrival).toDateString() === new Date(date).toDateString();

      return isFromMatch && isToMatch && isDateMatch;
    });

    console.log("Filtered trains:", filtered); // Debugging log
    // Navigate to the booking page with the filtered trains
    navigate('/trainbooking', { state: { trains: filtered } });
  };

  // Handle train name search input
  const handleTrainSearchChange = (e) => {
    const value = e.target.value;
    setTrainSearch(value);
    setShowDropdown(value.length > 0);

    // Filter the train schedules based on train number input
    const filteredSchedules = trainSchedules.filter(schedule =>
      schedule.trainNo && schedule.trainNo.toLowerCase().includes(value.toLowerCase())
    );

    console.log("Train search filtered schedules:", filteredSchedules); // Debugging log
    // Update the displayed schedules based on the filtered results
    setFilteredSchedules(filteredSchedules);
  };

  // Handle selection from the dropdown
  const handleDropdownSelect = (selectedTrain) => {
    setTrainSearch(selectedTrain);
    setShowDropdown(false);

    console.log("Selected train:", selectedTrain); // Debugging log
    // Update the displayed schedules based on the selected train
    const selectedSchedule = trainSchedules.filter(schedule =>
      schedule.trainNo === selectedTrain
    );
    setFilteredSchedules(selectedSchedule);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="train">
      {/* Train search form */}
      <form onSubmit={handleSearch} className="train_search">
        <FontAwesomeIcon icon={faTrain} className="icon" />
        <select
          value={searchParams.from}
          onChange={(e) => setSearchParams({ ...searchParams, from: e.target.value })}
          className="text-entry"
        >
          <option value="" disabled>Select Departure Location</option>
          {locations.map((location, index) => (
            <option key={index} value={location}>{location}</option>
          ))}
        </select>

        <FontAwesomeIcon icon={faTrain} className="icon" />
        <select
          className="text-entry"
          value={searchParams.to}
          onChange={(e) => setSearchParams({ ...searchParams, to: e.target.value })}
        >
          <option value="" disabled>Select Destination</option>
          {locations.map((location, index) => (
            <option key={index} value={location}>{location}</option>
          ))}
        </select>

        <FontAwesomeIcon icon={faCalendarDays} className="icon" />
        <input
          type="date"
          className="date"
          value={searchParams.date}
          onChange={(e) => setSearchParams({ ...searchParams, date: e.target.value })}
        />

        <button type="submit">Search</button>
      </form>

      {/* Train search by name */}
      <div className="search-container">
        <h2>Find Train</h2>
        <input
          type="text"
          placeholder="Search Train by Name or Number"
          className="text-entry"
          value={trainSearch}
          onChange={handleTrainSearchChange}
        />
        {showDropdown && (
          <ul className="dropdown-list">
            {filteredSchedules.map((schedule, index) => (
              <li
                key={index}
                onClick={() => handleDropdownSelect(schedule.trainNo)}
              >
                {schedule.trainNo} - {schedule.trainName}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Display train schedules */}
      <div className="train-schedule">
        <h2>Train Schedule</h2>
        <table>
          <thead>
            <tr>
              <th>Train No</th>
              <th>From</th>
              <th>To</th>
              <th>Arrival</th>
              <th>Reached</th>
            </tr>
          </thead>
          <tbody>
            {filteredSchedules.slice(0, 5).map((schedule, index) => ( // Limit the displayed schedules to 5
              <tr key={index}>
                <td>{schedule.trainNo}</td>
                <td>{schedule.from}</td>
                <td>{schedule.to}</td>
                <td>{schedule.arrival}</td>
                <td>{schedule.destination}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Train;
