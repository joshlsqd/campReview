var express             = require('express'),
    app                 = express(),
    bodyParser          = require('body-parser'),
    methodOverride      = require('method-override'),
    mongoose            = require('mongoose'),
    flash               = require('connect-flash'),
    passport            = require('passport'),
    localStrategy       = require('passport-local'),
    User                = require('./models/users'),
    seedDB              = require('./seeds')

var commentRoute = require('./routes/comments');
    campgroundRoute = require('./routes/campgrounds');
    indexRoute = require('./routes/index');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/YelpCamp');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static(__dirname + "/public"));
app.use(flash());
//seed the database
// seedDB();

// passport configuration
app.use(require('express-session')({
    secret: 'Qwig is a sweet dog',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

// require routes
app.use(indexRoute);
app.use('/campgrounds/:id/comments', commentRoute);
app.use('/campgrounds', campgroundRoute);

// server listener
app.listen(3000, process.env.IP, function(){
    console.log('YelpCamp has started');
});