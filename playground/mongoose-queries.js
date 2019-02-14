const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');
const {ObjectID} = require('mongodb');

var id = '5c6550e51a5be5677d871167';

if(!ObjectID.isValid(id)) {
    console.log('Id not valid');
}

// Todo.find({
//     _id: id
// }).then((todos)=>{
//     console.log('Todos', todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo)=>{
//     console.log('Todos', todo);
// });

Todo.findById(id).then((todo)=>{
    if(!todo) {
        return console.log('Id not found!');
    }
    console.log('Todos', todo);
}).catch((e)=>{
    console.log(e);
});

var u_id = '5c652618def7bf446b0d9bc9';
if(!ObjectID.isValid(u_id)) {
    console.log('Id not valid');
}

User.findById(u_id).then((user)=>{
    if(!user) {
        return console.log('Id not found!');
    }
    console.log('Users', user);
}).catch((e)=>{
    console.log(e);
});

