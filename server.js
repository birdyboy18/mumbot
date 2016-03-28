var express = require('express');
var config = require('./server/configure');
var nunjucks = require('express-nunjucks');
var app = express();

//set up rendering and stuff to use nunjucks
app.set('view engine', 'njk');
app.set('views', __dirname + '/views');

nunjucks.setup({}, app);

config(app);

app.listen('3000');
