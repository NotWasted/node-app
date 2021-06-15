const User = require('../models/UserModel');
const emailValidator = require('email-validator');

checkValidEmail = (req, res, next) => {
  if(!emailValidator.validate(req.body.email)) {
    res.status(500).send('Invalid email entered!');
  }

  next();
}

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

getUserToken = () => {

}

checkCredentials = (req, res, next) => {
  User.findOne({
    email: req.body.email
  }).exec((req, user) => {
    // generate a token 

    if (!user) {
      res.status(400).send('Invalid Email');
    }
    if(user.comparePassword(req.body.password)) {
      // if it doesn't match 
      res.status(500).send('Invalid Password');
    }
    next();
  });
}

module.exports = {
  checkDuplicateEmail,
  checkValidEmail,
  //checkRegisteredUser,
  //checkPassword
}