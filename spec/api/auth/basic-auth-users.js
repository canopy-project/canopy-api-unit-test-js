'use strict'

var frisby = require('frisby');
var g = require('../globals');

/*
  Test: BASIC AUTH for Users
*/

frisby.create('auth/basic-auth-user_spec: BASIC AUTH user POST login ')
  .post( g.url + 'login' ,
    { headers: {"Content-Type":"application/json", 
                "Authorization": "basic" 
                  + new Buffer( g.eUsr + ':' + g.ePW ).toString("base64")
              }})
  .expectStatus(200)
  .toss()
