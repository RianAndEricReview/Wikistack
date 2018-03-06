const express = require('express')
const { urlencoded, json } = require('body-parser')
const morgan = require('morgan')
const nunjucks = require('nunjucks')

const app = express()

app.set('view engine', 'html')
app.engine('html', nunjucks.render)
nunjucks.configure('views', {noCache: true})

app.use(morgan('dev'))

app.use(urlencoded({extended: false}))
app.use(json())

app.use(express.static('public'))

app.use(function (err, req, res, next) {
  if (!err.stack || !err.message) next(err);
  res.status(err.status || 500).end();
});

const port = 3000
app.listen(port, () => {
  console.log(`Server listening on port: ${port}`)
})

