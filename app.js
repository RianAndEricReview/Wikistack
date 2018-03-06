const express = require('express')
const {urlencoded, json} = require('body-parser')
const morgan = require('morgan')
const nunjucks = require('nunjucks')
const models = require('./models')

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

models.db.sync()
.then(function () {
    // make sure to replace the name below with your express app
    app.listen(3000, function () {
        console.log('Server is listening on port 3000!');
    });
})
.catch(console.error);


