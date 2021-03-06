const express = require('express');
const router = express.Router();
const Campground = require('../models/campground');
const middleware = require('../middleware/index.js');


router.get('/', function(req, res){
    Campground.find({},function (err, allCampgrounds) {
        if(err){
            console.log(err);
        } else {
            res.render('campgrounds/index', {campgrounds: allCampgrounds, currentUser: req.user});
        }
    })
});

router.post('/', middleware.isLoggedIn, function (req, res) {
    //get data and add to campgrounds
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name: name, image: image, description: desc, author: author, price: price};
    //create a new campground and save to database
    Campground.create(newCampground, function(err,newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect to campgrounds page
            console.log(newlyCreated);
            res.redirect('/campgrounds');
        }
    })
});

//New - show form to create new campground
router.get('/new', middleware.isLoggedIn, function (req, res) {
    res.render("campgrounds/new")
});

//SHOW - show details about one campground
router.get('/:id', function (req, res) {
    //find the campground with provided id
    Campground.findById(req.params.id).populate('comments').exec(function (err, foundCampground) {
        if(err){
            console.log(err);
        } else {
            //render show template
            res.render('campgrounds/show', {campground: foundCampground});
        }
    });

});

//edit campground route
router.get('/:id/edit', middleware.checkCampgroundOwnership, function (req,res) {
        Campground.findById(req.params.id, function (err, foundCampground) {
                res.render('campgrounds/edit', {campground: foundCampground});
        });
});

//update campground route
router.put('/:id', middleware.checkCampgroundOwnership, function (req,res) {
   //find and update campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (err, updatedCampground) {
        if(err) {
            throw err;
            res.redirect('/campgrounds');
        } else {
            res.redirect('/campgrounds/' + req.params.id);
        }

    })
});

//destroy campground
router.delete('/:id', middleware.checkCampgroundOwnership, function (req, res) {
    Campground.findByIdAndRemove(req.params.id, function (err) {
        if(err) {throw err}
        res.redirect('/campgrounds');
    });
});

module.exports = router;