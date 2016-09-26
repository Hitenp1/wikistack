var morgan = require('morgan');
var express = require('express');
var nunjucks = require('nunjucks');
var app = express();
var routes = require('./routes/');
var bodyParser = require('body-parser');
var people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];
var fs = require('fs');
var models = require('./models')

app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

nunjucks.configure('views', {noCache: true})
app.set('view engine', 'html')
app.engine('html', nunjucks.render)


app.get('/', function(req, res) {
  res.render('index');
})

models.User.sync({})
.then(function() {
  return models.Page.sync({})
})
.then(function() {
  app.listen(3001, function() {
    console.log('server is listening on port 3001!')
  });
})
.catch(console.error);
