const mongoose = require('mongoose')
const commentSchema = require('./comment.js')

const artSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  voter_name: {
    type: []
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
  timestamps: true,
  toObject: {
    transform: (_doc, article) => {
      delete article.updatedAt
      delete article.__v
      return article
    }
  },
  toJSON: {
    transform: (_doc, article) => {
      delete article.updatedAt
      delete article.__v
      return article
    }
  }
})

module.exports = mongoose.model('Art', artSchema)
