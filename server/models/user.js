var mongoose = require('mongoose');


// var newTodo = new Todo({
//     text: 'Cook dinner'
// });

// newTodo.save().then((doc)=>{
//     console.log('Saved to db',doc);
// }).catch((e)=>{
//     console.log('Unable to save to database');
// });

// var newTodo1 = new Todo({
//     text: 'Feed the cat',
//     completed: true,
//     completedAt: 123
// });

// newTodo1.save().then((doc)=>{
//     console.log('Saved to db',doc);
// }).catch((e)=>{
//     console.log('Unable to save to database');
// });

// var newTodo1 = new Todo({
//     text: 'Edit this video   '
// });

// newTodo1.save().then((doc)=>{
//     console.log('Saved to db',doc);
// }).catch((e)=>{
//     console.log('Unable to save to database');
// });

var User = mongoose.model('User',{
    email:{
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }
});

module.exports = {
    User
};

// var user = new User({
//     email: 'test@test.com    '
// });

// user.save().then((doc)=>{
//     console.log('User saved', doc);
// }).catch((e)=>{
//     console.log('Unable to save user!',e);
// });