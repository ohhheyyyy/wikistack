var express = require('express');
var router = express.Router();
var models = require('../models');

// var Artist = models.Artist;
// var Song = models.Song;

router.get('/', function(req, res, next){
  console.log("You've reached the home page");
  res.send("Hello world.");
});

router.post('/', function(req, res, next){

});

router.get('/add', function(req, res, next){
  
});


module.exports = router;