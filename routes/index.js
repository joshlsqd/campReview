var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/users');

//index route
router.get('/', function(req, res) {
    res.render('landing');
});

// new user route
router.get('/register', function (req, res) {
    res.render('register');
});

//handle sign up logic
router.post('/register', function (req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function (err, user) {
        if(err) {
            req.flash('error', err.message);
            return res.render('register');
        }
        passport.authenticate('local')(req, res, function () {
            req.flash('success', 'you are now signed up ' + user.username );
            res.redirect('/campgrounds');
        })
    });
});

// login routes
router.get('/login', function (req,res) {
    res.render('login');
});
//handling login logic
router.post('/login', passport.authenticate('local',
    {
        successRedirect: '/campgrounds',
        failureRedirect: '/login'
    }), function (req, res) {
});

// logout route
router.get('/logout', function (req,res) {
    req.logout();
    req.flash('success', 'you have logged out');
    res.redirect('/campgrounds');
});

// logged in logic
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}


module.exports = router;