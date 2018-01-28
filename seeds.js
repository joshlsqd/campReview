var mongoose     = require('mongoose');
    Campground   = require('./models/campground');
    Comment      = require('./models/comment');

var data = [
    {
        name: 'Cloud\'s Rest',
        image: 'https://images.unsplash.com/photo-1484960055659-a39d25adcb3c?auto=format&fit=crop&w=1050&q=80',
        description: 'This is clouds rest Im not sure, try something else just do what you think. I trust you. I was wondering if my cat could be placed over the logo in the flyer could you rotate the picture to show the other side of the room? nor can you make the logo bigger yes bigger bigger still the logo is too big so needs to be sleeker, nor that\'s great, but we need to add this 2000 line essay. I love it, but can you invert all colors? we don\'t need a backup, it never goes down! and make it look like Apple jazz it up a little I know somebody who can do this for a reasonable cost we are a non-profit organization, yet concept is bang on, but can we look at a better execution. This looks perfect. Just Photoshop out the dog, add a baby, and make the curtains blue we are a non-profit organization this is just a 5 minutes job, and there are more projects lined up charge extra the next time,'
    },
    {
        name: 'Desert Mesa',
        image: 'https://images.unsplash.com/photo-1414016642750-7fdd78dc33d9?auto=format&fit=crop&w=1049&q=80',
        description: 'This is Desert Mesa How much will it cost, and thanks for taking the time to make the website, but i already made it in wix yet i\'ll pay you in a week we don\'t need to pay upfront i hope you understand so we are a non-profit organization try making it a bit less blah just do what you think. I trust you. I think we need to start from scratch i\'ll pay you in a week we don\'t need to pay upfront i hope you understand i love it, but can you invert all colors? but you might wanna give it another shot, but can you use a high definition screenshot.'
    },
    {
        name: 'Canyon Floor',
        image: 'https://images.unsplash.com/photo-1445308394109-4ec2920981b1?auto=format&fit=crop&w=1053&q=80',
        description: 'This is clouds rest We need more images of groups of people having non-specific types of fun could you rotate the picture to show the other side of the room? so can you make it look like this clipart i found I think we need to start from scratch something summery; colourful you are lucky to even be doing this for us. Jazz it up a little I need a website.'
    },
    {
        name: 'Joshua Tree',
        image: 'https://images.unsplash.com/photo-1508430459690-9621c7aee2ae?auto=format&fit=crop&w=926&q=80',
        description: 'This is clouds rest Im not sure, or thanks for taking the time to make the website, but i already made it in wix. Make it sexy will royalties in the company do instead of cash the hair is just too polarising. Are you busy this weekend? I have a new project with a tight deadline you are lucky to even be doing this for us. '
    }
];
function seedDB(){
    //Remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        //add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a campground");
                    //create a comment
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was internet",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment._id);
                                campground.save();
                                console.log("Created new comment");
                            }
                        });
                }
            });
        });
    });
    //add a few comments
}

module.exports = seedDB;