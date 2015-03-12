'use strict'

var frisby = require('frisby');
var g = require('../globals');

//  Initialize 'Disposable User' credentials
var dNum = 765887;
var dUsr = 'disposableuser' + dNum;
var dEmail = 'disposableuser' + dNum + '@user.user';
var dPW = 'disposableuser' + dNum;
/*
    Test: Session-Based Login, userSelfEndpoint-verification
*/

//  Expect 'create_account' to return 200 if username and
//  email are unique

frisby.create('LOGIN/VERIFY  users/session-login-verify_spec: Create')

// 1) Create  

  .post( g.url + 'create_account',
    { "username" : dUsr, "email" : dEmail,  "password" : dPW },
    { json: true },
    { headers: { "Content-Type":"application/json"}})
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')

// 2) Login  

  .afterJSON(function(err, body, res){
      frisby.create('users/session-login-verify_spec: Login')
        .post( g.url + 'login',
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
             .get( g.url + g.userSelfEndpoint)
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
                   .delete( g.url + g.userSelfEndpoint)
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