const express = require('express');
const router = express.Router();
const user = require('../models/UserModel');

router.get('/pantry', (req, res) => {
  res.send('GET USER PANTRY ')
});

router.get('/accountDetails', (req, res) => {
  res.send*'GET USER ACCOUNT DETAILS'
})

module.exports = router;