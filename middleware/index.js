// all middleware goes here
const Campground = require('../models/campground');
const Comment = require('../models/comment');
const middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function (req, res, next) {
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function (err, foundCampground) {
            if(err) {
                req.flash('error', 'Campground not found');
                res.redirect('back')
            } else {
                if (foundCampground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash('error', 'you don\'t have permissions');
                    res.redirect('back')
                }
            }
        });
    } else {
        res.redirect('back');
    }
};

middlewareObj.checkCommentOwnership = function (req, res, next) {
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function (err, foundComment) {
            if(err) {
                res.redirect('back')
            } else {
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect('back')
                }
            }
        });
    } else {
        req.flash('error', 'you need to be logged in, yo');
        res.redirect('back');
    }
};

middlewareObj.isLoggedIn = function (req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error', 'you need to be logged in, yo');
    res.redirect('/login');
};


module.exports = middlewareObj