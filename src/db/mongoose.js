const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    userCreateIndex: true,
    useFindAndModify:false
});

// const me = new User({
//     name: 'Muhammad Usama',
//     age: 24,
//     email: "usama@gmail.com",
//     password:"pass1234"
// });

// me.save().then((me) => {
//     console.log(me);
// }).catch((error) => {
//     console.log('Error!',error);
// });

 
// const task1 = new task({
//     description: "Task 2"
// });
// task1.save().then((task1) => {
//     console.log(task1);
// }).catch((error) => {
//     console.log(error);
// });