'use strict'

var frisby = require('frisby');

//  Set url
var url = 'https://dev02.canopy.link/api/';

//  Allow self-signed SSL certificates
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

//  Initialize 'New User' credentials
var nUsrNum = 21;

var nUsr = 'newuser' + nUsrNum;
var nUsrEmail = 'newuser' + nUsrNum+ '@user.user';
var nUsrPW = 'newuser' + nUsrNum;

//  Initialize 'Existing User' credentials
var eUsr = 'exists';
var eUsrEmail = 'exists@user.user';
var eUsrPW = 'exists'


/*
    Test: Create a User
*/

// Expect 'create_account' to return 200 if username and
// email are unique

/*frisby.create('POST account create')
  .post( url + 'create_account',
    { "username" : nUsr, "email" : nUsrEmail,  "password" : nUsrPW },
    { json: true },
    { headers: { "Content-Type":"application/json"}})
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .toss()

// Expect 'create_account' to fail with 400 if username and email
// already exists

frisby.create('POST account create with existing un/email')
  .post( url + 'create_account',
   { "username" : eUsr, "email" : eUsrEmail,  "password" : eUsrPW },
   { json: true },
   { headers: { "Content-Type":"application/json"}})
  .expectStatus(400)
  .expectHeaderContains('content-type', 'application/json')
  .toss()*/

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



frisby.create('POST user login')
  .post( url + 'login',
   { "username" : eUsr, "email" : eUsrEmail,  "password" : eUsrPW },
   { json: true },
   { headers: { "Content-Type":"application/json"}})
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .inspectJSON()
  .expectJSON({
      "result" : "ok",
      "username" : eUsr,
      "email" : eUsrEmail
    })
  .after(function(body, res){
    var cookie = res.headers['set-cookie'][0].split(';')[0];    
/*
  Expect GET 'me' to return 200 and json:

  {
    "result" : "ok",
    "validated" : <VALIDATED>,
    "username" : <USERNAME>,
    "email" : <EMAIL>,
  }
*/
    frisby.create('Get /api/me')
      .addHeader('cookie', cookie)
      .get( url + 'me')
      .expectStatus(200)
      .expectHeaderContains('content-type', 'application/json')      
      .inspectJSON()
      .expectJSON(  {
        "result" : "ok",
        "validated" : true,
        "username" : eUsr,
        "email" : eUsrEmail
       })
      .toss()
  })   
  .afterJSON(function(err, res, body){
    // Expect POST to logout to return json {"result":"ok"} 
    frisby.create('POST /api/logout')
      .post( url + 'logout' )
      .expectStatus(200)
      .expectHeaderContains('content-type', 'application/json')
      .expectJSON({
         "result" : "ok"
      })
      .inspectJSON()
      .toss()
  })
.toss()