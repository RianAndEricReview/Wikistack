const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  res.send('<h1>Youve got the wikis</h1>')
})

router.post('/', (req, res, next) => {
  res.send('You posted the wiki')
})

router.get('/add', (req, res, next) => {
  res.send('<p>from here you can see our adding page</p>')
})

module.exports = router
