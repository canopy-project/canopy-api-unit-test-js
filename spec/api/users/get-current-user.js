'use strict'

var frisby = require('frisby');
var g = require('../globals');

/*
    Test: Get Current User
*/

/*  
  Session-based AUTH is for users only

  Endpoint: 
        Session-based AUTH GET: /api/me
    
  Implementation:
    1) Log in to existing user account,
    2) GET Current user
    3) Logout
*/

frisby.create('users/get-current-user_spec: POST user login, user get "me", user logout')
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
  Expect GET 'me' to return 200 and json:

  {
    "result" : "ok",
    "validated" : <VALIDATED>, 
        (update from "activated" to "validated" pending) 
    "username" : <USERNAME>,
    "email" : <EMAIL>,
  }
*/
    frisby.create('users/get-current-user_spec: Get /api/me')
      .addHeader('cookie', cookie)
      .get( g.url + 'me')
      .expectStatus(200)
      .expectHeaderContains('content-type', 'application/json')      
      .inspectJSON()
      .expectJSON(  {
        "result" : "ok",
        "activated" : false,
        "username" : g.eUsr,
        "email" : g.eEmail
       })
      .toss()
  })   
  .afterJSON(function(err, res, body){
    /* 3) Logout: */ 

    // Expect POST to logout to return json {"result":"ok"} 
    frisby.create('users/get-current-user_spec: POST user /api/logout')
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