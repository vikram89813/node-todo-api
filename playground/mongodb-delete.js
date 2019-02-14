const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
    if(err) {
        return console.log('Unable to connect to MongoDb Server');
    }
    console.log('Connected to MongoDb server');
    const db = client.db('TodoApp');

    // db.collection('Todos').find().toArray().then((docs)=>{
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs,undefined,2));
    // },(err)=>{
    //     console.log('Unable to fetch documents');
    // });

    // db.collection('Todos').find({completed: false}).toArray().then((docs)=>{
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs,undefined,2));
    // },(err)=>{
    //     console.l5c65141e948407e9dd16df8fog('Unable to fetch documents');
    // });

    // db.collection('Todos').find({_id: new ObjectID('5c650afa948407e9dd16dd27')}).toArray().then((docs)=>{
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs,undefined,2));
    // },(err)=>{
    //     console.log('Unable to fetch documents');
    // });

    // db.collection('Todos').find().count().then((count)=>{
    //     console.log(`Todos count : ${count}`);
    //     //console.log(JSON.stringify(docs,undefined,2));
    // },(err)=>{
    //     console.log('Unable to fetch documents');
    // });

    // db.collection('Users').find({name: 'Kumar'}).count().then((count)=>{
    //     console.log(`Todos count : ${count}`);
    //     //console.log(JSON.stringify(docs,undefined,2));
    // }).catch((err)=>{
    //     console.log('Unable to fetch documents');
    // });

    //deleteMany
    // db.collection('Todos').deleteMany({text: 'Eat Lunch'}).then((res)=>{
    //     console.log(res);
    // });
    // //deleteOne
    // db.collection('Todos').deleteOne({text: 'Eat Lunch'}).then((res)=>{
    //     console.log(res);
    // });

    //findOneAndDelete
    // db.collection('Todos').findOneAndDelete({completed: false}).then((res)=>{
    //     console.log(res);
    // });

    // db.collection('Users').deleteMany({name: 'Mike'}).then((res)=>{
    //     console.log(res);
    // });

    db.collection('Users').findOneAndDelete({
        _id: new ObjectID('5c65141e948407e9dd16df8f')
    }).then((res)=>{
        console.log(res);
    });

    client.close();
});