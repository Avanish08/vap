import React, { useState } from 'react';
import '../Css/Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGift, faUserTie, faRightToBracket, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import Login from '../Templates/Login';

const Navbar = () => {
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  const toggleLogin = () => {
    setIsLoginVisible(!isLoginVisible);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setIsLoginVisible(false); // Hide login form on successful login
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Additional logout logic can be added here, like clearing tokens or user data
  };

  return (
    <>
      <div className="navbar">
        <div className="navcontent">
          <div className="logo">
            <h2>Manzil</h2>
          </div>
          <div className="navlist">
            <a href="/">
              <li><FontAwesomeIcon icon={faGift} /> Offers</li>
            </a>
            <a href="/">
              <li><FontAwesomeIcon icon={faUserTie} /> Customer Support</li>
            </a>
            <div className="login">
              {isLoggedIn ? (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <FontAwesomeIcon icon={faUserCircle} style={{ fontSize: '24px', marginRight: '8px' }} />
                  <div className="dropdown">
                    <span style={{ cursor: 'pointer' }}>Profile</span>
                    <div className="dropdown-content">
                      <a href="/profile">Profile</a>
                      <a href="/wallet">Wallet</a>
                      <span onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</span>
                    </div>
                  </div>
                </div>
              ) : (
                <li onClick={toggleLogin} style={{ cursor: 'pointer' }}>
                  <FontAwesomeIcon icon={faRightToBracket} /> Login / Signup
                </li>
              )}
            </div>
          </div>
        </div>
      </div>
      {isLoginVisible && <Login toggleLogin={toggleLogin} onLoginSuccess={handleLoginSuccess} />}
    </>
  );
}

export default Navbar;
