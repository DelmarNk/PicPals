const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  photo: String,
  email: String,
  password: String,
  bio: String,
  birthdate: Date,
}, {timestamps: true})

const User = mongoose.model('User', userSchema)
module.exports = User
