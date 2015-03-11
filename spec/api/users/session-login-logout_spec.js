'use strict'

var frisby = require('frisby');
var g = require('../globals');

/*
    Test: Session-Based Login/Logout
*/

//  Expect 'create_account' to return 200 if username and
//  email are unique

//  Initialize 'Disposable User' credentials
var dNum = 7842913;
var dUsr = 'disposableuser' + dNum;
var dEmail = 'disposableuser' + dNum + '@user.user';
var dPW = 'disposableuser' + dNum;

frisby.create('users/session-login-logout_spec: Create')

// 1) Create  

  .post( g.url + 'create_account',
    { "username" : dUsr, "email" : dEmail,  "password" : dPW },
    { json: true },
    { headers: { "Content-Type":"application/json"}})
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')

// 2) Login  

  .afterJSON(function(err, body, res){
      frisby.create('users/users/session-login-logout_spec: Login')
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
            frisby.create('users/users/session-login-logout_spec: Verify')
             .addHeader('cookie', cookie)
             .get( g.url + 'me')
             .expectStatus(200)
             .expectHeaderContains('content-type', 'application/json')      
             .inspectJSON()
             .expectJSON(  {
               "result" : "ok",
               "activated" : false,
               "username" : dUsr,
               "email" : dEmail
              })
// 4) Logout  
              .afterJSON(function(err, res, body){
                  // Expect POST to logout to return json {"result":"ok"} 
                  frisby.create('users/login-logout_spec: POST user /api/logout')
                    .post( g.url + 'logout' )
                    .expectStatus(200)
                    .expectHeaderContains('content-type', 'application/json')
                    .inspectJSON()
                    .expectJSON({
                       "result" : "ok"
                    })
// 5) Log Back in  

                    .afterJSON(function(err, body, res){
                        frisby.create('users/users/session-login-logout_spec: Login')
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
// 6) Delete              
                        .after(function(body, res){
                          console.log('deleting user');
                          frisby.create('users/users/session-login-logout_spec: Delete')
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
                    })
                   .toss()
              })
             .toss()
        })
        .toss()
  })
  .toss()