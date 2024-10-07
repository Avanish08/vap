import React, { useState } from 'react';
import '../Css/login.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard } from "@fortawesome/free-solid-svg-icons";

const Login = ({ toggleLogin, onLoginSuccess }) => {
  const [aadhar, setAadhar] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);

  const handleChangeAadhar = (event) => {
    const newValue = event.target.value;

    // Allow only digits and limit to 12 characters
    if (/^\d{0,12}$/.test(newValue)) {
      setAadhar(newValue);
      setError(''); 
      setSuccess(''); 
    }
  };

  const handleChangeOtp = (event) => {
    setOtp(event.target.value);
    setError('');
    setSuccess('');
  };

  const handleSubmitAadhar = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ aadharCard: aadhar }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message);
        setIsOtpSent(true); // Show OTP input after successful Aadhar submission
      } else {
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitOtp = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:5000/auth/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp, aadharCard: aadhar }), // Ensure these variables are set correctly
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message);
        onLoginSuccess(); // Trigger on login success
      } else {
        setError(data.message || 'OTP verification failed. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-form">
      <button className="close-btn" onClick={toggleLogin}>✖</button>
      <div className="logins">
        <h3>Welcome</h3>
        <div className="logintab">
          {!isOtpSent ? (
            <>
              <h4>Aadhar Card</h4>
              <form onSubmit={handleSubmitAadhar}>
                <FontAwesomeIcon icon={faAddressCard} />
                <input
                  type="text" 
                  placeholder='XXXX-XXXX-XXXX'
                  className='type'
                  value={aadhar}
                  onChange={handleChangeAadhar}
                  disabled={loading} 
                />
                <br />
                <button type="submit" className='btn1' disabled={loading}>
                  {loading ? 'Sending...' : 'Login'}
                </button>
              </form>
              {error && <p className="error-message">{error}</p>}
              {success && <p className="success-message">{success}</p>}
            </>
          ) : (
            <>
              <h4>Enter OTP</h4>
              <form onSubmit={handleSubmitOtp}>
                <input
                  type="text"
                  placeholder='Enter OTP'
                  className='type'
                  value={otp}
                  onChange={handleChangeOtp}
                  disabled={loading}
                />
                <br />
                <button type="submit" className='btn1' disabled={loading}>
                  {loading ? 'Verifying...' : 'Verify OTP'}
                </button>
              </form>
              {error && <p className="error-message">{error}</p>}
              {success && <p className="success-message">{success}</p>}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
