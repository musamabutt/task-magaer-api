const { MongoClient, ObjectID } = require('mongodb');
 
 const connectionURL = 'mongodb://127.0.0.1:27017';
 const databaseName = 'task-manager';
 
 MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error,client) => {
     if (error) {
        return console.log("Unable to connect to database");
     }
     const db = client.db(databaseName);
     db.collection('users').updateOne({
         _id: new ObjectID("636dea9e37fbc204d20a526d")
     },
    {
        $set: {
            name: "Muhammad Usama"
        }
    }).then((result) => {
         console.log(result);
     }).catch((error) => {
         console.log(error);
     })

     db.collection('tasks').updateMany({
         completed:true
     },
         {
             $set: {
             completed:false
         }
         }).then((result) => {
             console.log(result.modifiedCount);
         }).catch((error) => {
             console.log(error);
     })
 });