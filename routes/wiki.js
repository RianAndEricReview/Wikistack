const express = require('express')
const router = express.Router()
const { Page, User } = require('../models')

router.get('/', (req, res, next) => {
  res.redirect('/')
})

router.post('/', (req, res, next) => {
  let page = Page.build({
    title: req.body.title,
    content: req.body.content
  })
  page.save()
  res.redirect('/')
})

router.get('/add', (req, res, next) => {
  res.render('addpage')
})

module.exports = router
