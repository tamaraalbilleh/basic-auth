'use strict';
require('dotenv').config();
const PORT = process.env.PORT || 5000;
const express = require ('express');
const app = express ();
const mongoose = require('mongoose');
const cors = require ('cors');
const errorHandler = require ('./middleware/500.js');
const pageNotFoundHandler = require ('./middleware/404.js');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const router = require('./auth/router.js');
app.use(cors());
app.use ('/api/v1/' , router);

app.get ('/', homePageHandler);
function homePageHandler (req,res){
  res.send ('welcome to home page!');
}

app.get ('/bad' , error500Handler);
function error500Handler (req,res){
  throw new Error ('Some thing went wrong');
}


app.use (errorHandler);
app.use ('*', pageNotFoundHandler);
function start (PORT){
  app.listen(PORT,()=>{
    console.log(`listening on PORT : ${PORT}`);
  });
}

module.exports = {
  start : start,
  app : app,
};


