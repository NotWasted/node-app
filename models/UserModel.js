const mongoose = require('mongoose');
// const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 12;

const UserSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  }, 
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    index: {
      unique: true
    },
    // validate: {
    //   validator: emailValidator.validate,
    //   message: props => `${props.value} is not a valid email address`
    // }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8
  }
}, {
  timestamps: true,
});

/**
 * We want to implement a compare function for the password hashing as well, 
 * but that is a computationally expensive calculation, so we use async version (there is an async version as well).
 * The sync one would block the input considerably when there are many logins and this can significantly impact 
 * the performance of the application. 
 */

UserSchema.pre('save', async function preSave(next) {
  const user = this;
  console.log(`Saving user...`);
  if (!user.isModified('password')) 
    return next();
  try {
    console.log('Encrypting password...')
    const hash = await bcrypt.hash(user.password, SALT_ROUNDS);
    console.log(`Hash obtained`);
    user.password = hash;
    console.log('User password has been encrypted!');
    return next();
  } catch (err) {
    return next("Could not hash password!");
  }
});

// this method will be available from every UserSchema document that comes from the database. 
UserSchema.methods.comparePassword = async function comparePassword(candidate) {
  return bcrypt.compare(candidate, this.password);
};

module.exports = mongoose.model('users', UserSchema);
