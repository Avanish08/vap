import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importing useNavigate
import "../Css/Bus.css"; // Bus-specific styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBus, faCalendarDays } from "@fortawesome/free-solid-svg-icons";

const Bus = () => {
  const [busSchedules, setBusSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useState({
    from: "",
    to: "",
    date: "",
  });
  const [busSearch, setBusSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate(); // Initialize useNavigate

  const locations = [
    "Kalyan",
    "Mumbai",
    "Delhi",
    "Varanasi",
    "Pune",
    // Add more locations as necessary
  ];

  // Fetch bus schedules from the API
  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const response = await fetch("http://localhost:5000/auth/bus");
        if (!response.ok) {
          throw new Error("Failed to fetch buses");
        }
        const data = await response.json();
        setBusSchedules(data);
      } catch (error) {
        console.error("Error fetching bus schedules:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBuses();
  }, []);

  // Handle bus search based on input
  const handleSearch = (e) => {
    e.preventDefault();
    navigate('/busresults', { state: searchParams }); // Navigate to BusResults component
  };

  // Handle bus search by name
  const handleBusSearchChange = (e) => {
    setBusSearch(e.target.value);
    setShowDropdown(e.target.value.length > 0);
  };

  // Filter schedules based on bus search query
  const filteredSchedules = busSchedules.filter(
    (schedule) =>
      schedule.BusNo_Name &&
      schedule.BusNo_Name.toLowerCase().includes(busSearch.toLowerCase())
  );

  // Handle selection from the dropdown
  const handleDropdownSelect = (selectedBus) => {
    setBusSearch(selectedBus);
    setShowDropdown(false); // Close dropdown once a bus is selected
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bus">
      {/* Bus search form */}
      <form onSubmit={handleSearch} className="bus_search">
        <FontAwesomeIcon icon={faBus} className="icon" />
        <select
          value={searchParams.from}
          onChange={(e) =>
            setSearchParams({ ...searchParams, from: e.target.value })
          }
          className="text-entry"
        >
          <option value="" disabled>
            Select Departure Location
          </option>
          {locations.map((location, index) => (
            <option key={index} value={location}>
              {location}
            </option>
          ))}
        </select>

        <FontAwesomeIcon icon={faBus} className="icon" />
        <select
          className="text-entry"
          value={searchParams.to}
          onChange={(e) =>
            setSearchParams({ ...searchParams, to: e.target.value })
          }
        >
          <option value="" disabled>
            Select Destination
          </option>
          {locations.map((location, index) => (
            <option key={index} value={location}>
              {location}
            </option>
          ))}
        </select>

        <FontAwesomeIcon icon={faCalendarDays} className="icon" />
        <input
          type="date"
          className="date"
          value={searchParams.date}
          onChange={(e) =>
            setSearchParams({ ...searchParams, date: e.target.value })
          }
        />

        <button type="submit">Search</button>
      </form>

      {/* Bus search by name */}
      <div className="search-container">
        <h2>Find Bus</h2>
        <input
          type="text"
          placeholder="Search Bus by Name"
          className="text-entry"
          value={busSearch}
          onChange={handleBusSearchChange}
        />
        {showDropdown && (
          <ul className="dropdown-list">
            {filteredSchedules.slice(0, 5).map((schedule, index) => (
              <li
                key={index}
                onClick={() => handleDropdownSelect(schedule.BusNo_Name)}
              >
                {schedule.BusNo_Name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Display bus schedules */}
      <div className="bus-schedule">
        <h2>Bus Schedule</h2>
        <table>
          <thead>
            <tr>
              <th>Bus No/Name</th>
              <th>From</th>
              <th>To</th>
              <th>Arrival</th>
              <th>Reached</th>
            </tr>
          </thead>
          <tbody>
            {filteredSchedules.slice(0, 5).map((schedule, index) => (
              <tr key={index}>
                <td>{schedule.BusNo_Name}</td>
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

export default Bus;
