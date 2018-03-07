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
    where: {name: req.body.name}
  })
  .spread((user, createdBool) => {
    let page = Page.build({
      title: req.body.title,
      content: req.body.content,
      status: req.body.status,
    })
    return page.save()
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

router.get('/:urlTitle', (req, res, next) => {
  // res.send('this is the url: ' + req.params.urlTitle)
  Page.findOne({
    where: {
      urlTitle: req.params.urlTitle
    }
  })
  .then((foundPage) => {
    res.render('wikipage', {page: foundPage})
  })
  .catch((err) => console.error(err))
})

module.exports = router
