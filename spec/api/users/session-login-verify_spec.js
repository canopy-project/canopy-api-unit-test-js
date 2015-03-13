'use strict'

var frisby = require('frisby');
var g = require('../globals');

//  Initialize 'Disposable User' credentials
var dNum = 79228;
var dUsr = 'disposableuser' + dNum;
var dEmail = 'disposableuser' + dNum + '@user.user';
var dPW = 'disposableuser' + dNum;
/*
    Test: Session-Based Login, userSelf-verification
*/

//  Expect g.createUser to return 200 if username and
//  email are unique

frisby.create('LOGIN/VERIFY  users/session-login-verify_spec: Create')

// 1) Create  

  .post( g.url + g.createUser,
    { "username" : dUsr, "email" : dEmail,  "password" : dPW, "skip-email" : true },
    { json: true },
    { headers: { "Content-Type":"application/json"}})  
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')

// 2) Login  

  .afterJSON(function(err, body, res){
      frisby.create('users/session-login-verify_spec: Login')
        .post( g.url + g.login,
         { "username" : dUsr, "email" : dEmail,  "password" : dPW },
         { json: true },
         { headers: { "Content-Type":"application/json"}})
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')
        .inspectJSON()
        .expectJSON({
            "result" : "ok",
            "username" : dUsr,
            "email" : dEmail
        })

// 3) Verify

        .after(function(body, res){
            var cookie = res.headers['set-cookie'][0].split(';')[0];
            console.log('cookie: ' + cookie);
            console.log('verifying... ')
            frisby.create('users/session-login-verify_spec: Verify')
             .addHeader('cookie', cookie)
             .get( g.url + g.userSelf)
             .expectStatus(200)
             .expectHeaderContains('content-type', 'application/json')      
             .inspectJSON()
             .expectJSON(  {
               "result" : "ok",
               "validated" : false,
               "username" : dUsr,
               "email" : dEmail
              })

// 4) Delete             
              .after(function(body, res){
                console.log('deleting user');
                frisby.create('users/session-login-verify_spec: Delete')
                   .addHeader('cookie', cookie)
                   .addHeader('skip-email', true)                   
                   .delete( g.url + g.userSelf)
                   .expectStatus(200)
                   .expectHeaderContains('content-type', 'application/json')      
                   .inspectJSON()
                   .expectJSON({
                     "result" : "ok",
                    })
                   .toss()
              })
             .toss()
        })
        .toss()
  })
  .toss()