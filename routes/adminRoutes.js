/**
 * This file contains routes for viewing admin accessible data including documents, collections, etc. 
 */

const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');

router.get('/allUsers', async (req, res) => {
  try {
    const users = await User.find().limit();
    res.json(users);
  } catch (err) {
    res.json({ 'message':err });
  }
});

router.delete('/removeUser/:userId', async (req, res) => {
  try {
    const userRemoved = await User.deleteOne({_id: req.params.userId });
    res.json(userRemoved);
  } catch (err) {
    res.json({'message': err });
  }
});

router.patch('/updateUserInfo/:userId', async (req, res) => {
  try {
    // do something 
  } catch (err) {

  }
});

module.exports = router;