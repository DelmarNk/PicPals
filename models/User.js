const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  photo: String,
  email: String,
  password: String,
  bio: String,
  birthdate: Date,
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

userSchema.virtual('posts',{
  ref: 'Post',
  localField: '_id',
  foreignField: 'user'
});

const User = mongoose.model('User', userSchema)//here 'User' is the model name
module.exports = User
