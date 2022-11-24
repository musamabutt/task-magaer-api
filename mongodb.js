// CRUD create, read,update,delete
// const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;

/**
 * Destructring of above code
 * we can get MongoClient,ObjectID in one line rather than creating them separately just like above we created
 */
const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';
const id = new ObjectID();

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error,client) => {
    if (error) {
        console.log("Unable to connect to database");
    }
    const db = client.db(databaseName);
    db.collection('users').insertOne({
        name : 'Muhammad',
        age : 24
    }, (error,result) => {
        if (error) {
            return console.log('Unable to insert user');
        }
        console.log(result.connection);
    })
    db.collection('users').insertMany([
        {
            name: 'Hammad',
            age: 22
        },{
            name: 'Saim',
            age: 19
        }
    ], (error,result) => {
        if (error) {
            return console.log('Unable to insert user');
        }
        console.log(result.ops);
        });
    db.collection('tasks').insertMany([
        {
            description: "First description",
            completed: true
        }, {
            description: "Second description",
            completed: false
        }, {
            description: "Third description",
            completed: true
        }, {
            description: "Fourth description",
            completed: true
        }
    ], (error, result) => {
        if (error) {
            return console.log('Unable to insert user');
        }
        console.log(result.ops);
    });

    /**
     * To fetch one record from DB
     */
    db.collection('users').findOne({ name: 'Muhammad' }, (error, result) => {
        if (error) {
            console.log('Unable to fetch');
        }
        console.log(result);
    });

    db.collection('tasks').findOne({ _id: ObjectID("6371e342f2b3e6e00c9c36f3") }, (error, result) => {
        if (error) {
            console.log('Unable to fetch');
        }
        console.log(result);
    });

    /**
     * To fecth multiple records from DB
     */
    db.collection('users').find({age:24}).toArray((error, result) => {
        if (error) {
            console.log('Unable to fetch');
        }
        console.log(result);
    });

    db.collection('tasks').find({completed:true}).toArray((error, result) => {
        if (error) {
            console.log('Unable to fetch');
        }
        console.log(result);
    });
});