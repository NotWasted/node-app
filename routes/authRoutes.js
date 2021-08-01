const express = require('express');
const router = express.Router();
const authM = require('../middleware/authMiddleware');
const authController = require('../controllers/authController');

router.post('/signup', 
  [
    authM.checkDuplicateEmail,
    authM.checkValidEmail
  ],
  authController.registerUser
);

router.post('/signin', 
  [
    authM
  ],
  authController.signInUser
);

module.exports = router;
