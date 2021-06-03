'use strict';
const express = require ('express');
const router = express.Router();
const bcrypt = require ('bcrypt');
const User = require ('./models/users-model.js');
// const bodyParser = require ('body-parser');

// const urlencodedParser = express.urlencoded({ extended: true });
// const multer = require('multer');
// const multParse = multer();
// router.use(multParse.none());
const signInAuthHandler = require ('./middleware/basic.js');
router.post ('/signup' ,signUpHandler);
router.post ('/signin' , signInAuthHandler, signInHandler );
const rounds = 10;


// const server= require ('../server.js');
// server.app.use(express.json());
// server.app.use(express.urlencoded({ extended: true }));

async function signUpHandler (req,res){
  try {
    const {username , password} = req.body;
    // console.log ({username , password});
    const hash = await bcrypt.hash (password, rounds);
    // console.log (hash);
    const user = new User ({
      username : username,
      password : hash,
    });
    // console.log (user);
    const record = await user.save();
    res.status (201).json(record);
  } catch (error) {
    res.status(403).json ({ error : error.message});
  }
}

async function signInHandler(req,res){
  res.status(200).json(req.user);
}

module.exports = router;