'use strict'

var frisby = require('frisby');
var g = require('../globals');

/*
    Test: Session-based User Login and Logout
*/

/*  
  Session-based AUTH is for users only

  Endpoints: 
        POST /api/login,
        POST /api/logout
    
  Implementation:
    1) Log in to existing user account,
    2) Logout
*/

frisby.create('users/login-logout_spec: POST user session based login and logout')
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
  .afterJSON(function(err, res, body){
    /* 2) Logout: */ 

    // Expect POST to logout to return json {"result":"ok"} 
    frisby.create('users/login-logout_spec: POST user /api/logout')
      .post( g.url + 'logout' )
      .expectStatus(200)
      .expectHeaderContains('content-type', 'application/json')
      .expectJSON({
         "result" : "ok"
      })
      .inspectJSON()
      .toss()
  })
.toss()