const User = require('../Models/User');
const { sendOtp, verifyOtp } = require('../Middleware/OtpMiddleware');

exports.loginWithAadhar = async (req, res) => {
  const { aadharCard } = req.body;

  try {
    const user = await User.findOne({ aadharCard });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send OTP every time a user logs in
    const otp = await sendOtp(user.mobileNumber); // Send the OTP and store it

    res.status(200).json({ message: 'OTP sent to your registered mobile number' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Failed to send OTP. Please try again later.' });
  }
};

exports.verifyOtp = async (req, res) => {
  const { otp, aadharCard } = req.body;

  if (!otp || !aadharCard) {
    return res.status(400).json({ message: 'OTP and Aadhar Card are required.' });
  }

  try {
    const user = await User.findOne({ aadharCard });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify the OTP
    const isValidOtp = await verifyOtp(user.mobileNumber, otp);
    if (!isValidOtp) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ message: 'Failed to verify OTP. Please try again later.' });
  }
};
