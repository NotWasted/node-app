const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');

router.post('/signup', async (req, res) => {
  //res.send('POST AUTH SIGNUP');
  //console.log(req.body);
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName, 
    email: req.body.email,
    password: req.body.password
  });

  // returns a promise 
  try {
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post('/signin', (req, res) => {
  res.send('POST AUTH SIGNIN');
});

module.exports = router;

