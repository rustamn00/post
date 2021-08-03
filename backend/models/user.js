const mongoose = require("mongoose");
const validator = require('validator')

const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    validate(value) {
        if (!validator.isEmail(value)) {
            throw new Error('Email is invalid')
        }
    }
  },
  password: {
    type: String,
    required: true,
    minLength: 7,
    trim: true,
    validate(value) {
        if (value.toLowerCase().includes('password')) {
            throw new Error('Password can not include `password`')
        }
    }
  }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
