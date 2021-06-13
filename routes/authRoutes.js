const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');
const authM = require('../middleware/authMiddleware');

router.post('/signup', 
  [
    authM.checkDuplicateEmail,
    authM.checkValidEmail
  ],
  async (req, res, next) => {
    try {
      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName, 
        email: req.body.email,
        password: req.body.password,
      });

      // returns a promise 
      const savedUser = await user.save();
      if (savedUser) return res.json(savedUser);
      return next(new Error('Failed to save user :('));
    } catch (err) {
      res.json({ message: err });
  }
});

router.post('/signin', (req, res) => {
  [
    authM.checkValidEmail,
    authM.checkRegisteredUser, 
    
  ]

  
  res.send('POST AUTH SIGNIN');
});

module.exports = router;

