const express = require('express');
const router = express.Router();
const user = require('../models/UserModel');
const authM = require('../middleware/authMiddleware');

router.get('/pantry', 
  [
    authM.checkAuthenticated
  ],

  (req, res) => {
    res.json('USER PANTRY')
  });

router.get('/accountDetails', (req, res) => {
  res.send*'GET USER ACCOUNT DETAILS'
});

module.exports = router;