const User = require('../models/UserModel');
const emailValidator = require('email-validator');
const jwt = require('jsonwebtoken');
const config = require('../config/dbConfig');

/**
 * Checks email format validity
 */
checkValidEmail = (req, res, next) => {
  if(!emailValidator.validate(req.body.email)) {
    res.status(500).send('Invalid email entered!');
  }

  next();
}

/**
 * Checks if the email entered for signup has already been registered 
 * for use. 
 */
checkDuplicateEmail = (req, res, next) => {
  User.findOne({
    email : req.body.email
  }).exec((err, email) => {
    if (err) {
      res.send(500).send({message: err});
      return;
    }

    if (email) {
      res.status(500).send('Email address already in use!')
      return;
    }

    next();
  });
}

/**
 * Check if the user-submitted jwt is authorized and valid
 */
checkAuthenticated = (req, res, next) => {
  const headers = req.headers['authorization']
  if (headers) {
    // Bearer tokenstringajiksljklsdg
    try {
      const token = headers.split(' ')[1]
      const decoded = jwt.verify(token, config.secret)
      const userName = decoded.userName

      const persistedUser = User.find({
        userName: userName
      });

      if (!persistedUser) {
        next();
      }

      res.json({ message: 'Unauthorized access!' });
    } catch {
      res.json({ message: 'Authentication Failed!' });
    }
  } else {
    res.json({ message: 'Authentication failed!' });
  }
}

module.exports = {
  checkDuplicateEmail,
  checkValidEmail,
  checkAuthenticated
  //checkRegisteredUser,
  //checkPassword
}