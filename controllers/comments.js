var express = require('express')
var db = require('../models')
var router = express.Router()

router.post('/', (req, res) => {
  db.comment.create(req.body)
  .then((createdComment) => {
    res.redirect('/articles/' + req.body.articleId)
  })
  .catch((err) => {
    console.log('Error POST comments', err)
    res.send('error')
  })
})

module.exports = router