'use strict';
require('dotenv').config();
// const PORT = process.env.PORT || 5000;

const server = require('./src/server.js');
const mongoose = require ('mongoose');
mongoose
  .connect(process.env.MONGOOSE_URI,
    { useNewUrlParser : true , useUnifiedTopology : true})
  .then (()=>{
    server.start (process.env.PORT);
  })
  .catch ((e)=>{
    console.log('connection_error', e.message);
  });