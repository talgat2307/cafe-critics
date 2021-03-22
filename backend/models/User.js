const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Field name is required to fill'],
  },
  email: {
    type: String,
    required: [true, 'Field email is required to fill'],
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: 'user',
    enum: ['user', 'admin'],
  },
});

userSchema.path('email').validate(value => {
  return /^[\w-.]+@(\b[a-z-]+\b)[^-].[a-z]{2,10}$/g.test(value);
}, 'Enter correct email address');

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;