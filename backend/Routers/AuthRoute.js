
const express = require('express');
const { loginWithAadhar, verifyOtp } = require('../Controller/AuthControllers');

const router = express.Router();

router.post('/login', loginWithAadhar);
router.post('/verify', verifyOtp);

module.exports = router;
