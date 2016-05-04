var express = require('express');
var wikiRouter = express.Router();
var models = require('../models');
var Promise = require('bluebird');
var Page = models.Page;
var User = models.User;

wikiRouter.get('/', function(req, res, next) {
    Page.findAll()
        .then(function(pages) {
            res.render('index', {
                pages: pages
            });
        });
});

wikiRouter.post('/', function(req, res, next) {
    User.findOrCreate({
            where: {
                name: req.body.name,
                email: req.body.email
            }
        })
        .then(function(values) {

            var user = values[0];

            var page = Page.build({
                title: req.body.title,
                content: req.body.content,
                status: req.body.status,
                tags: req.body.tags
            });
            return page.save().then(function(foundPage) {
                return foundPage.setAuthor(user);
            });

        })
        .then(function(page) {
            res.redirect(page.route);
        })
        .catch(function(err) {
            console.error(err);
        });
});

wikiRouter.get('/add', function(req, res, next) {
    res.render('addpage');
});

wikiRouter.get('/users', function(req, res, next) {
    User.findAll()
        .then(function(users) {
            res.render('users', {
                users: users
            });
        })
        .catch(function(err) {
            console.error(err);
        });
});

wikiRouter.get('/users/:id', function(req, res, next) {

    var userPromise = User.findById(req.params.id);
    var pagesPromise = Page.findAll({
        where: {
            authorId: req.params.id
        }
    });
    Promise.all([
            userPromise,
            pagesPromise
        ])
        .then(function(values) {
            var user = values[0];
            var pages = values[1];
            res.render('user', { user: user, pages: pages });
        })
        .catch(function(err) {
            console.error(err);
        });
});

wikiRouter.get('/:urlTitle', function(req, res, next) {
    var actualUrl = req.params.urlTitle;
    Page.findOne({
            where: {
                urlTitle: actualUrl
            }
        })
        .then(function(foundPage) {
          User.findById(foundPage.authorId)
          .then(function(user){
            res.render('wikipage', {
                title: foundPage.title,
                content: foundPage.content,
                user: user

            });
          });
            //res.json(foundPage);
        })
        .catch(function(err) {
            console.error(err);
        });
});




module.exports = wikiRouter;
