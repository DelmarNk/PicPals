const mongoose = require('mongoose')
const { Schema } = mongoose;

//create a schema with timestamps to add to time the post is created to the fields in the schema
const postSchema = new Schema({
  image: String,
  caption: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
}, {timestamps: true})

const Post = mongoose.model('Post', postSchema)
module.exports = Post
