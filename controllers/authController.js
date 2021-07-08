const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/dbConfig');

exports.registerUser = async (req, res) => {
  console.log('Attempting registration...')
  try {
    console.log(req.body);
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName, 
      email: req.body.email,
      password: req.body.password,
    });

    // returns a promise 
    const savedUser = await user.save();        // pre save function in User Model calls the bcrypt function that hashes the password 
    if (savedUser) return res.status(200).json(savedUser);
    console.log("Could not save user...")
    res.status(400).send({ message: "Registration failed!" });
  } catch (err) {
    console.log("Could not extract request data...")
    res.status(400).send({ message: "Registration failed!" });
  }
}

exports.signInUser = (req, res) => {
  try {
    const user = User.findOne(
      {
        email: req.body.email
      }
    ).exec((err, user) => {
      if (err) {
        res.send(400).json({ 
          message: 'Authentication Failed!' , 
          token: null
        });
        return;
      }

      if (!user) {
        res.send(400).json({ 
          message: 'Email not registered!', 
          token: null
        });   
        return;
      }

      var isMatchingPassword = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if(!isMatchingPassword) {
        res.status(401).send({
          message: 'Invalid Password!',
          token: null
        });
      }
      
      // expires in 7 days 
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400*7
      });

      if (!token) {
        res.status(400).json({
          message: 'Authentication Failed!',
          token: null
        });
      }
      res.status(200).send({
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email, 
        accessToken: token,
        message: 'Sign-In Successful!'
      });
    });
  } catch (err) {
    res.status(200).json({
      message: 'Something went wrong!'
    });
  }
};