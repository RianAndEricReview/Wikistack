const express = require('express')
const {urlencoded, json} = require('body-parser')
const morgan = require('morgan')
const nunjucks = require('nunjucks')
const models = require('./models')
const routes = require('./routes')
const AutoEscapeExtension = require('nunjucks-autoescape')(nunjucks);

const app = express()

app.set('view engine', 'html')
app.engine('html', nunjucks.render)

const env = nunjucks.configure('views', {noCache: true})
env.addExtension('AutoEscapeExtension', new AutoEscapeExtension(env));

app.use(morgan('dev'))

app.use(urlencoded({extended: false}))
app.use(json())

app.use(express.static('public'))

app.use('/', routes)

app.use(function (err, req, res, next) {
  if (!err.stack || !err.message) next(err);
  res.status(err.status || 500).end();
});

models.db.sync({force: false})
.then(function () {
    // make sure to replace the name below with your express app
    app.listen(3000, function () {
        console.log('Server is listening on port 3000!');
    });
})
.catch(console.error);


