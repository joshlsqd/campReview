const express = require('express');
const router = express.Router({mergeParams: true});
const Campground = require('../models/campground');
const Comment = require('../models/comment');
const middleware = require('../middleware/index.js');

// comments new
router.get("/new", middleware.isLoggedIn, function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if(err) {
            throw err
        } else {
            res.render('comments/new', {campground: campground});
        }
    });
});

// comments create
router.post("/", middleware.isLoggedIn, function (req, res) {
    //look up campground
    Campground.findById(req.params.id, function (err, campground) {
        if(err){
            console.log(err);
            res.redirect('/campgrounds');
        } else {
            Comment.create(req.body.comment, function (err, comment) {
                if(err) {
                    req.flash('error', 'something went wrong');
                    console.log(err);
                } else {
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment._id);
                    campground.save();
                    console.log(comment);
                    req.flash('success', 'you have added a comment');
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });
});

//edit route
router.get('/:comment_id/edit', middleware.checkCommentOwnership, function (req, res) {
    Comment.findById(req.params.comment_id, function (err, foundComment) {
        if(err) {throw err}
        res.render('comments/edit', {campground_id: req.params.id, comment: foundComment})
    })
});


// comment update
router.put('/:comment_id', middleware.checkCommentOwnership, function (req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, updatedComment) {
        if(err) {
            res.send('did not save');
            throw err;
        } else {
            res.redirect('/campgrounds/' + req.params.id);
        }

    });
});

//comment delete
router.delete('/:comment_id', middleware.checkCommentOwnership, function (req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function (err) {
        if(err) {throw err}
        req.flash('success', 'comment deleted');
        res.redirect('back');
    });
});


module.exports = router;