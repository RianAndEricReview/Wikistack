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
  .catch(next)
})

router.post('/:urlTitle', (req, res, next) => {
  console.log('IN THE PUTTTTTTTT')
  Page.update(req.body, {
    where: {
      urlTitle: req.params.urlTitle
    },
    // include: [{model: User, as: 'author'}],
    returning: true
  })
  .then((effectedArray) => {
    res.redirect(effectedArray[1][0].route)
  })
})

router.get('/add', (req, res, next) => {
  res.render('addpage')
})

router.get('/search', (req, res, next) => {
  Page.findByTag(req.query.searchTag)
  .then(foundPages => {
    res.render('index', {foundPages})
  })
  .catch(next)
})

router.get('/:urlTitle', (req, res, next) => {
  Page.findOne({
    where: {
      urlTitle: req.params.urlTitle
    },
    include: [{model: User, as: 'author'}]
  })
  .then((foundPage) => {
    res.render('wikipage', {page: foundPage, tags: foundPage.tags})
  })
  .catch(next)
})

router.get('/:urlTitle/similar', (req, res, next) => {
  Page.findOne({
    where: {
      urlTitle: req.params.urlTitle
    },
    //can be removed if we don't allowing editing of author
    include: [{model: User, as: 'author'}]
  })
  .then((foundPage) => {
    return foundPage.findSimilar()
    .then((similarPages) => {
      res.render('index', {foundPages: similarPages})
    })
  })
  .catch(next)
})

router.get('/:urlTitle/edit', (req, res, next) => {
  Page.findOne({
    where: {
      urlTitle: req.params.urlTitle
    },
    include: [{model: User, as: 'author'}]
  })
  .then((page) => {
    res.render('editpage', {page})
  })
  .catch(next)
})

router.get('/:urlTitle/delete', (req, res, next) => {
  console.log('DELLLEEETETE')
  Page.findOne({
    where: {
      urlTitle: req.params.urlTitle
    }
  })
  .then((page) => {
    return page.destroy()
  })
  .then(() => {
    res.redirect('/')
  })
  .catch(next)
})

module.exports = router
