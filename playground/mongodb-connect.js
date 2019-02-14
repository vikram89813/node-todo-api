// const MongoClient = require('mongodb').MongoClient;

// object destructuring.
const {MongoClient,ObjectID} = require('mongodb');

//var obj = new ObjectID();

//console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
    if(err) {
        return console.log('Unable to connect to MongoDb Server');
    }
    console.log('Connected to MongoDb server');
    const db = client.db('TodoApp');
    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // },(err,res)=>{
    //     if(err) {
    //         return console.log('Unable to insert in Todo',err);
    //     }
    //     console.log(JSON.stringify(res.ops,undefined,2));
    // });

    // db.collection('Users').insertOne({
    //     name: 'Kumar',
    //     age: 25,
    //     location: 'bangalore'
    // },(err,res)=>{
    //     if(err) {
    //         return console.log('Unable to insert in Users',err);
    //     }
    //     console.log(JSON.stringify(res.ops,undefined,2));
    //     //console.log(res.ops[0]._id.getTimestamp());
    // });
    client.close();
});