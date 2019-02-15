const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');
const {ObjectID} = require('mongodb');

var id = '5c6550e51a5be5677d871167';

if(!ObjectID.isValid(id)) {
    console.log('Id not valid');
}

//To remove all elements.
// Todo.remove({}).then((res)=>{
//     console.log(res);
// });

// Remove by id.
// Todo.findByIdAndRemove(id).then((todo)=>{
//     console.log(todo);
// });

// //Used for removing with some specific items.
// Todo.findOneAndRemove({_id:id}).then((todo)=>{
//     console.log(todo);
// });

