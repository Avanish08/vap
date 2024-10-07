const twilio = require('twilio');
const otpStore = {};
require('dotenv').config(); // Load .env file

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const formatPhoneNumberToE164 = (countryCode, phoneNumber) => {
  const cleanedNumber = phoneNumber.replace(/\D/g, '');
  return `+${countryCode}${cleanedNumber}`;
};

const sendOtp = async (mobileNumber) => {
  try {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const formattedNumber = formatPhoneNumberToE164('91', mobileNumber); 

    await client.messages.create({
      body: `Your OTP is: ${otp}`,
      from: TWILIO_PHONE_NUMBER,
      to: formattedNumber,
    });

    console.log(`OTP ${otp} sent successfully to ${formattedNumber}`);
    otpStore[formattedNumber] = { otp, expires: Date.now() + 5 * 60 * 1000 };
    return otp;
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw new Error('Failed to send OTP.');
  }
};

const verifyOtp = async (mobileNumber, otp) => {
  const formattedNumber = formatPhoneNumberToE164('91', mobileNumber);
  const storedOtpData = otpStore[formattedNumber];

  if (!storedOtpData) {
    return false; 
  }

  const { otp: storedOtp, expires } = storedOtpData;

  if (Date.now() > expires) {
    delete otpStore[formattedNumber];
    return false; 
  }

  if (storedOtp !== otp) {
    return false; 
  }

  delete otpStore[formattedNumber];
  return true;
};

module.exports = { sendOtp, verifyOtp };
