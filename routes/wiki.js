const express = require('express')
const router = express.Router()
const { Page, User } = require('../models')

router.get('/', (req, res, next) => {
  res.redirect('/')
})

router.post('/', (req, res, next) => {
  let page = Page.build({
    title: req.body.title,
    content: req.body.content,
    status: req.body.status,
  })
  page.save()
  .then((resolve) => {
    // res.json(resolve)
    res.redirect(`/wiki/${page.urlTitle}`)
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
    res.json(foundPage)
  })
  .catch((err) => console.error(err))
})

module.exports = router
