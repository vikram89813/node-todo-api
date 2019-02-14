const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
    if(err) {
        return console.log('Unable to connect to MongoDb Server');
    }
    console.log('Connected to MongoDb server');
    const db = client.db('TodoApp');

    db.collection('Todos').findOneAndUpdate({
        _id: new ObjectID('5c651be3948407e9dd16e03c')
    },{
        $set: {
            completed: true
        }
    },{
        returnOriginal: false
    }).then((res)=>{
        console.log(res);
    });

    client.close();
});