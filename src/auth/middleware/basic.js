'use strict';

const base64 = require ('base-64');
const User = require('../models/users-model');
const bcrypt = require ('bcrypt');

async function signInAuthHandler (req,res,next){
  try {
    const encoded = req.headers.authorization.split(' ')[1];
    const decoded = base64.decode(encoded);
    const [username , password ] = decoded.split(':');
    const user = await User.findOne ({username});
    if (user){
      const isValid = await bcrypt.compare (password , user.password);
      if (isValid){
        req.user=user;
        next();
      }else {
        next({message:'Invalid password please check again'});
      }
    }else {
      res.status(401).send('Invalid user name please check again');
    }
  } catch (error) {
    res.status (401).json ('Invalid login please try again');
  }
}

     




module.exports = signInAuthHandler;
