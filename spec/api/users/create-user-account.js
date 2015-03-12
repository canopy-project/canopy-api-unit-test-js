'use strict'

var frisby = require('frisby');
var g = require('../globals');

/*
    Test: Create a User
*/

//  Expect 'create_account' to return 200 if username and
//  email are unique 

//  Initialize 'Disposable User' credentials

frisby.create('users/create-user-account_spec: POST account create')
  .post( g.url + 'create_account',
    { "username" : g.nUsr, "email" : g.nEmail,  "password" : g.nPW },
    { json: true },
    { headers: { "Content-Type":"application/json"}})
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .afterJSON(function(err, body, res){
      //  Expect 'create_account' to fail with 400 if username and email
      //  already exists

      frisby.create('users/create-user-account_spec: POST account create with existing un/email')
        .post( g.url + 'create_account',
         { "username" : g.eUsr, "email" : g.eEmail,  "password" : g.ePW },
         { json: true },
         { headers: { "Content-Type":"application/json"}})
        .expectStatus(400)
        .expectHeaderContains('content-type', 'application/json')
        .toss()
  })
  .toss()