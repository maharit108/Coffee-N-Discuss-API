const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  upvote: {
    type: Number,
    min: 0
  },
  downvote: {
    type: Number,
    min: 0
  },
  author_name: {
    type: String
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

module.exports = commentSchema
