var morgan = require('morgan');
var express = require('express');
var nunjucks = require('nunjucks');
var app = express();
var routes = require('./routes/');
var bodyParser = require('body-parser');
var people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];
var fs = require('fs');

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
app.listen(3000);
console.log('sever listening');
