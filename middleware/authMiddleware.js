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

checkRegisteredUser = (req, res, next) => {
}

getUserToken = () => {

}

module.exports = {
  checkDuplicateEmail,
  checkValidEmail,
  checkRegisteredUser,
}