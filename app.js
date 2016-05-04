'use strict';
var express = require('express');
var app = express();
var morgan = require('morgan');
var swig = require('swig');
var models = require('./models');
var routes = require('./routes');
var wikiRouter = require('./routes/wiki');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var bodyParser = require('body-parser');
var pg = require('pg');
var conString = 'postgres://localhost:5432/twitterdb';
var client = new pg.Client(conString);

// templating boilerplate setup
app.set('views', path.join(__dirname, '/views')); // where to find the views
app.set('view engine', 'html'); // what file extension do our templates have
app.engine('html', swig.renderFile); // how to render html templates
swig.setDefaults({ cache: false });

// logging middleware
app.use(morgan('dev'));

// body parsing middleware
app.use(bodyParser.urlencoded()); // for HTML form submits
app.use(bodyParser.json()); // would be for AJAX requests

// start the server
models.User.sync()
    .then(function() {
        return models.Page.sync();
    })
    .then(function() {
      app.listen(3001, function(){
        console.log('listening on port 3001');
      });
    })
    .catch(console.error);


// modular routing that uses io inside it
app.use('/', wikiRouter);
app.use('/wiki', wikiRouter);

// the typical way to use express static middleware.
var publicDir = path.join(__dirname, '/public')
var staticMiddleware = express.static(publicDir);
app.use(staticMiddleware);
