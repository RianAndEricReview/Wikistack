const express = require('express')
const router = express.Router()
const { Page, User } = require('../models')


router.get('/:userId', (req, res, next) => {
  let getUser = User.findById(+req.params.userId)
  let getPages = Page.findAll({
    where: {
      authorId: +req.params.userId
    }
  })
  Promise.all([getUser, getPages])
  .then((results) => {
    res.render('singleUser', {user: results[0], pages: results[1]})
  })
  .catch(next)
})

router.get('/', (req, res, next) => {
  User.findAll()
  .then((foundUsers) => {
    res.render('users', {foundUsers})
  })
  .catch(next)
})

module.exports = router
