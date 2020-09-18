const mongoose = require('mongoose')
const commentSchema = require('./comment.js')

const artSchema = new mongoose.Schema({
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
  comments: [commentSchema],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Art', artSchema)
