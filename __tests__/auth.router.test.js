'use strict'; 

const server = require('../src/server');
const supergoose = require('@code-fellows/supergoose');
const request = supergoose(server.app);
require('dotenv').config();


describe ('Auth router', ()=>{
  it ('should sign up a new user', async ()=>{
    // arrange 
    let user = {
      username : 'tamara',
      password : '12345',
    };
      // act
    const response = await request.post('/api/v1/signup').send(user);
    // assert
    expect(response.status).toEqual(201);
    expect(response.body.username).toEqual('tamara');
    
  });

  it ('should throw an error while adding a new user with missing required data', async ()=>{
    // arrange 
    let user = {
      username : 'tamara',
    };
      // act
    const response = await request.post('/api/v1/signup').send(user);
    // assert
    expect(response.status).toEqual(403);
    
  });
    
  
    
});