'use strict'

var frisby = require('frisby');

//  Set url
var url = 'https://dev02.canopy.link/api/';

//  Initialize 'Existing Device' credentials
var eDevUUID;
var eDevSecretKey;


/*
  Test: BASIC AUTH for Devices
*/

frisby.create('auth/basic-auth-devices_spec: BASIC AUTH device POST login ')
  .post( url + 'login' ,
    { headers: {"Content-Type":"application/json", 
                "Authorization": "basic" 
                  + new Buffer( eUsr + ':' + eUsrPW ).toString("base64")
              }})
  .expectStatus(200)
  .toss()
