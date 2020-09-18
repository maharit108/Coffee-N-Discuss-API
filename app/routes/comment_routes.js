const express = require('express')
const passport = require('passport')

const Art = require('../models/article_model')

const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

// create a comment; id-article id
router.post('/comment/:id', requireToken, (req, res, next) => {
  // changing author field of request to id of current user (user to which the token belongs)
  req.body.comments.author = req.user.id
  Art.findById(req.params.id)
    .then(handle404)
    .then(article => {
      article.comments.push(req.body.comments)
      return article.save()
    })
    .then(res.status(201).send('Created Comment'))
    .catch(next)
})

// Edit article; idCom-comment id
router.patch('/comment/:idCom', requireToken, removeBlanks, (req, res, next) => {
  req.body.comments.author = req.user.id
  Art.findOne({ 'comments._id': req.params.idCom })
    .then(handle404)
    .then(article => {
      const comment = article.comments.id(req.params.idCom)
      // it will throw an error if the current user isn't the owner of the comment
      requireOwnership(req, comment)
      comment.set(req.body.comments)
      // save parent model to save changes in children
      return article.save()
    })
    .then(article => res.status(201).send('Edit Complete'))
    .catch(next)
})

// Upvote/downvote; id is for article
// router.patch('/articleVote/:id', requireToken, removeBlanks, (req, res, next) => {
//   Art.findById(req.params.id)
//     .then(handle404)
//     .then(article => {
//       if (article.upvote <= req.body.article.upvote && article.downvote <= req.body.article.downvote) {
//         article.upvote = req.body.article.upvote
//         article.downvote = req.body.article.downvote
//         return article.save()
//           .then(article => res.status(201).send('Vote Listed'))
//       } else {
//         return res.status(400).send('SEND VALID VOTE')
//       }
//     })
//     .catch(next)
// })

// Delete comment
router.delete('/comment/:idCom', requireToken, (req, res, next) => {
  Art.findOne({ 'comments._id': req.params.idCom })
    .then(handle404)
    .then(article => {
      const comment = article.comments.id(req.params.idCom)
      // it will throw an error if the current user isn't the owner of the comment
      requireOwnership(req, comment)
      article.comments.id(req.params.idCom).remove()
      // save parent model to save changes in children
      return article.save()
    })
    .then(article => res.sendStatus(204))
    .catch(next)
})

module.exports = router
