'use strict'

var frisby = require('frisby');
var g = require('../globals');

/*
  Test: BASIC AUTH for Users
*/

var auth = g.basicUserAuth; 
console.log('auth: ' + auth);
frisby.create('auth/basic-auth-user_spec: BASIC AUTH user POST login ')
  .post( g.url + 'login' ,
    { headers: {"Content-Type":"application/json", 
                 "Authorization": auth
              }})
  .expectStatus(200)
  .toss()
