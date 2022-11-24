const { MongoClient, ObjectID } = require('mongodb');
 
 const connectionURL = 'mongodb://127.0.0.1:27017';
 const databaseName = 'task-manager';
 
 MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error,client) => {
     if (error) {
        return console.log("Unable to connect to database");
     }
     const db = client.db(databaseName);
    //  db.collection('users').deleteMany({
    //      name: "Muhammad"
    //  }).then((result) => {
    //      console.log(result);
    //  }).catch((error) => {
    //      console.log(error);
    //  });

     db.collection('users').deleteOne({
        _id: new ObjectID("636dea9e37fbc204d20a526d")
     }).then((result) => {
         console.log(result)
     }).catch((error) => {
         console.log(error);
     })
 });