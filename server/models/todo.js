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

var Todo = mongoose.model('Todo',{
    text:{
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    completed:{
        type: Boolean,
        default: false
    },
    completedAt:{
        type: Number,
        default: null
    },
    _creater : {
        required: true,
        type: mongoose.Schema.Types.ObjectId
    }
});

module.exports = {
    Todo
};

// var newTodo1 = new Todo({
//     text: 'Edit this video   '
// });

// newTodo1.save().then((doc)=>{
//     console.log('Saved to db',doc);
// }).catch((e)=>{
//     console.log('Unable to save to database');
// });



