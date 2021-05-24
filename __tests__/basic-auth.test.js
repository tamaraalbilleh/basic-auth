'use strict'; 
const server = require('../src/server');
const superTest = require('supertest');
let otherRequest =superTest (server.app);
const supergoose = require('@code-fellows/supergoose');
const request = supergoose(server.app);
const mangoose = require('mongoose');
require('dotenv').config();
const base64 = require('base-64');

describe ('Basic auth', ()=>{

  it('should sign in', async () => {
   

    const userOne = base64.encode("tamara:12345");
    let obj = {username: 'tamara', password: "admin123"};
    await request.post('/api/v1/signup').send(obj);
    const responseOne = await request.post('/api/v1/signin').set('Authorization', `Basic ${userOne}`);
    const userTwo = base64.encode("tamaraq:admin123");
    const responseTwo = await request.post('/api/v1/signin').set('Authorization', `Basic ${userTwo}`);
    const userThree = base64.encode("tamara:admin123");
    const responseThree = await request.post('/api/v1/signin').set('Authorization', `Basic ${userThree}`);
    expect(responseThree.status).toEqual(200);
    expect(responseTwo.text).toEqual('Invalid user name please check again');
  });


});
