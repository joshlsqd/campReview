var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/cat_app', {useMongoClient: true});

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

var Cat = mongoose.model('Cat', catSchema);

// var george = new Cat({
//     name: 'Mac',
//     age: 17,
//     temperament: 'whiny'
// });

// george.save(function (err, cat) {
//     if(err) {
//         console.log('something went wrong');
//     } else {
//         console.log('we just saved a cat to the db');
//         console.log(cat);
//     }
// });

Cat.create({
    name: 'fluffy',
    age: 15,
    temperament: 'nice'
}, function (err, cat) {
    if(err) {
        console.log(err);
} else {
        console.log(cat);
    }
});

Cat.find({}, function(err, cats) {
    if(err) {
        console.log('oh no, error!');
        console.log(err)
    } else {
        console.log('all the cats...')
        console.log(cats);
    }
});