const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const { Schema } = mongoose;

const UserSchema = new Schema({
  email: {type: String, required: true,},
  googleId: String,
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
});

mongoose.model('User', UserSchema);
