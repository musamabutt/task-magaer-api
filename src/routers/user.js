const express = require('express');
const { findById } = require('../models/user');
const User = require('../models/user');
const router = new express.Router();
const auth = require('../middleware/auth');
const multer = require('multer');
const sharp = require('sharp');


router.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({user,token});
    } catch {
        res.status(400).send();
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({user,token});
    } catch (e) {
        res.status(400).send();
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        })
        await req.user.save();
        res.send();
    } catch (e) {
        res.status(500).send();
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch (e) {
        res.status(500).send();
    }
})

/**
 * directory to upload the files
 */
 const upload = multer({
    // dest: 'avatar',
    limits: {
        fileSize:1000000
    },
    fileFilter(req, file, callback) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return callback(new Error('only jpg jpeg png files are allowed to upload'));
        }
        callback(undefined, true);
    }
 })

/**
 * upload files
 */
 router.post('/users/me/avatar', auth, upload.single('avatar'), async(req, res) => {
    const buffer = await sharp(req.file.buffer).resize({width:250,height:250}).jpeg().toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send();
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message });
 })

/**
 * read/get users
 * auth is a middleware task-manager/src/middleware/auth.js
 * if authentication is passed then the function next() will allow to continue and send res.send(req.user); else throw error
 */
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user);
})

router.get('/users/:id/avatar', async (req, res) => {  
    try {
        const user = await User.findById(req.params.id);
        if (!user || !user.avatar) {
            throw new Error();
        }
        res.set('Content-Type', 'image/jpeg');
        res.send(user.avatar);
    } catch (e) {
        res.status(404).send(e); 
    }
})

/**
 * read/get a single user object by id (passed from payload)
 */
//  router.get('/users/:id', (req, res) => {
//     const _id = req.params.id;
//     User.findById(_id).then((user) => {
//         if (!user) {
//             return res.status(404).send();
//         }
//         res.send(user);
//     }).catch((e) => {
//         res.status(500).send();
//     })
//  })

 /**
 * update a object
 */
// router.patch('/users/:id', async (req, res) => {
//     const updates = Object.keys(req.body);
//     const allowedUpdates = ['name', 'email', 'age'];
//     const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
//     if (!isValidOperation) {
//         return res.status(400).send({ error: 'Invalid updates!'});
//     }
//     try {
//         const user = await User.findById(req.params.id);
//         updates.forEach((update) => user[update] = req.body[update])
//         await user.save();
//         if (!user) {
//             return res.status(404).send();
//         }
//         res.send(user);
//     } catch (e) {
//         res.status(400).send(e);
//     }
// })

/**
 * update only me
 */
 router.patch('/users/me',auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'age','password'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!'});
    }
    try {
        updates.forEach((update) => req.user[update] = req.body[update]);
        await req.user.save();
        res.send(req.user);
    } catch (e) {
        res.status(400).send(e);
    }
})

/**
 * delete a object
 */
 router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send({error:'User not found'});   
        }
        res.send(user);
    } catch (e) {
        res.status(400).send(e); 
    }
 })

 /**
  * delete only me
  */
  router.delete('/users/me', auth ,async (req, res) => {
      try {
          await req.user.remove();
          res.send(req.user);
        } catch (e) {
        res.status(400).send(e); 
    }
  })

  router.delete('/users/me/avatar', auth ,async (req, res) => {
    try {
        req.user.avatar = undefined;
        await req.user.save();
        res.send(req.user);
      } catch (e) {
      res.status(400).send(e); 
  }
})
module.exports = router;