'use strict'

var frisby = require('frisby');
var g = require('../globals');

/*
    Test: Delete Current User
*/

/*  
  Session-based AUTH is for users only

  Endpoint: 
        Session-based AUTH DELETE: /api/me
    
  Implementation:
    1) Log in to existing user account,
    2) DELETE Current user
*/

frisby.create('users/delete-current-user_spec: Session-based AUTH: DELETE current user, ')
  /* 1) Login: */
  .post( g.url + 'login',
   { "username" : g.eUsr, "email" : g.eEmail,  "password" : g.ePW },
   { json: true },
   { headers: { "Content-Type":"application/json"}})
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .inspectJSON()
  .expectJSON({
      "result" : "ok",
      "username" : g.eUsr,
      "email" : g.eEmail
    })
  .after(function(body, res){
    var cookie = res.headers['set-cookie'][0].split(';')[0];    
  /* 2) GET Current User: */

/*
  Expect DELETE 'me' to return 200 and json:

  {
    "result" : "ok"
  }
*/
    frisby.create('users/delete-current-user_spec: DELETE /api/me')
      .addHeader('cookie', cookie)
      .delete( g.url + 'me')
      .expectStatus(200)
      .expectHeaderContains('content-type', 'application/json')      
      .inspectJSON()
      .expectJSON({
        "result" : "ok",
       })
      .toss()
  })   
.toss()