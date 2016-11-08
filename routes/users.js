var express = require('express');
var passport = require('passport');
var csurf = require('csurf');
var csrfProtection = csurf({ cookie: true });
var Account = require('../models/account');
var router = express.Router();



router.get('/register', function(req, res, next) {
    res.render('register', { title: 'demo' });
});

router.post('/register', function(req, res, next) {
    //Convenience method to register a new user instance with a given password. Checks if username is unique
    Account.register(new Account({ username: req.body.username }), req.body.password, function(err, account) {
        if (err) {
            return res.render('register', { title: 'demo', account: account });
        }

        passport.authenticate('local')(req, res, function() {
            res.redirect('/');
        });

    });
});

router.get('/login', csrfProtection, function(req, res, next) {
    res.render('login', { title: '阳光检务登录', csrfToken: req.csrfToken(), user: req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res, next) {
    res.redirect('/');
});

router.get('/logout', function(req, res, next) {
    req.logout();
    res.redirect('/');
});

router.get('/ping', function(req, res, next) {
    res.status(200).send("pong!");
});


module.exports = router;