const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');
const authM = require('../middleware/authMiddleware');
const jwt = require('jsonwebtoken')

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

router.post('/signin', 
  [
    authM.checkCredentials,
  ],
  (req, res) => {

    /**
     * Generate token here 
     */
    console.log('POST AUTH SIGNIN');
    const token = jwt.sign({email: req.body.email}, "SECRET");
    if (token) {
      res.status(200).json({message: "Sign-In Successfull!", token: token});
    } else {
      res.status(400).send("Authentication failed :(");
    }

    res.send("Something went wrong");
  });

module.exports = router;

