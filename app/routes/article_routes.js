const express = require('express')
const passport = require('passport')

const Art = require('../models/article_model')

const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

// show all articles
router.get('/articles', (req, res, next) => {
  Art.find()
    .populate('author')
    .then(art => {
      return art.map(article => article.toObject())
    })
    .then(article => res.status(200).json({ article }))
    .catch(next)
})

// get article by author id; id here is author id not article id
router.get('/articles/:id', requireToken, (req, res, next) => {
  let articlesOfAuthor = []
  Art.find({author: req.params.id})
    .then(handle404)
    .then(articles => {
      articles.forEach(article => {
        requireOwnership(req, article)
        articlesOfAuthor.push(article)
      })
      return articlesOfAuthor
    })
    .then(articletoSend => {
      if (articletoSend.length === 0) {
        res.status(401).send('Not Allowed')
      } else {
        res.status(200).json({ articlesOfAuthor })
      }
    })
    .catch(next)
})

// create article
router.post('/article', requireToken, (req, res, next) => {
  req.body.article.author = req.user.id
  Art.create(req.body.article)
    .then(content => {
      res.status(201).json({ content: content.toObject() })
    })
    .catch(next)
})

// Edit article; id is article id
router.patch('/article/:id', requireToken, removeBlanks, (req, res, next) => {
  Art.findById(req.params.id)
    .then(handle404)
    .then(article => {
      // it will throw an error if the current user isn't the owner
      requireOwnership(req, article)
      return article.updateOne(req.body.article)
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

// Delete article; id is article id
router.delete('/article/:id', requireToken, (req, res, next) => {
  Art.findById(req.params.id)
    .then(handle404)
    .then(article => {
      // throw an error if current user doesn't own `article`
      requireOwnership(req, article)
      // delete the example ONLY IF the above didn't throw
      article.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
