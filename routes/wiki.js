const express = require('express')
const router = express.Router()
const { Page, User } = require('../models')

router.get('/', (req, res, next) => {
  Page.findAll({
    attributes: ['title', 'urlTitle']
  })
  .then((foundPages) => {
    res.render('index', {foundPages})
  })
  .catch(next)
})

router.post('/', (req, res, next) => {
  User.findOrCreate({
    where: {name: req.body.name, email: req.body.email}
  })
  .spread((user, createdBool) => {
    return Page.create(req.body)
    .then((savedPage) => {
      return savedPage.setAuthor(user)
    })
  })
  .then(page => {
    res.redirect(page.route)
  })
  .catch((err) => console.error(err))
})

router.get('/add', (req, res, next) => {
  res.render('addpage')
})

router.get('/search', (req, res, next) => {
  console.log('SEARCHHHHH', req.query.searchTag)
  Page.findByTag(req.query.searchTag)
  .then(foundPages => {
    res.render('index', {foundPages})
  })
})

router.get('/:urlTitle', (req, res, next) => {
  // res.send('this is the url: ' + req.params.urlTitle)
  Page.findOne({
    where: {
      urlTitle: req.params.urlTitle
    },
    include: [{model: User, as: 'author'}]
  })
  .then((foundPage) => {
    res.render('wikipage', {page: foundPage, tags: foundPage.tags})
  })
  .catch((err) => console.error(err))
})

module.exports = router
