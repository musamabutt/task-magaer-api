const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');
const Task = require('./models/task');
const User = require('./models/user');

const app = express();
const port = process.env.PORT || 3000;

const multer = require('multer');
const upload = multer({
    dest: 'images',
    limits: {
        fileSize:2000000  //2MBs size
    },
    fileFilter(req, file, callback) {
        if (!file.originalname.match(/\.(doc|docx)$/)) {
            return callback(new Error('File must be a doc'));
        }
        callback(undefined, true);
        // callback(undefined, false);
    }
});

app.post('/upload',upload.single('upload'),(req, res) => {
    res.send();
},(error, req, res, next) => {
    res.status(400).send({ error: error.message });
})

// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//         res.send('GET requests are disabled');
//     } else {
//         next();
//     }
// })

// app.use((req, res, next) => {
//     res.status(503).send('Site is currently down.Check back soon!');
// })

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);




app.listen(port, () => {
    console.log("Server is up on the port " + port);
});

// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken'); 
// const myFunction = async () => {
    // const password = 'UsamaButt'
    // const hashedPassword = await bcrypt.hash(password, 8);
    // console.log(password);
    // console.log(hashedPassword);
    // const isMatch = await bcrypt.compare('UsamaButt', hashedPassword);
    // console.log(isMatch);
//     const token = jwt.sign({ _id: "abc123" }, 'testingToken',{expiresIn:'7 days'});
//     console.log(token);
//     const data = jwt.verify(token, 'testingToken');
//     console.log(data);
// }
// myFunction();

// const pet = {
//     name:'Hal'
// }
// pet.toJSON = function () {
//     console.log(this);
//     return this;
// }
// console.log(JSON.stringify(pet));


// const Task = require('./models/task');

// const main = async () => {
//     const task = await Task.findById('637725abd5806c0b6f62309d');
//     await task.populate('owner').execPopulate();
//     console.log(user.tasks);

//     const user = await User.findById('63772adfeb35f82e6e437835');
//     await user.populate('tasks').execPopulate();
//     console.log(user.tasks);
// }
// main();