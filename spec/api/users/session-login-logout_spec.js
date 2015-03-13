'use strict'

var frisby = require('frisby');
var g = require('../globals');

/*
    Test: Session-Based Login/Logout
*/

//  Expect g.createUser to return 200 if username and
//  email are unique

//  Initialize 'Disposable User' credentials
var dNum = 23415709;
var dUsr = 'disposableuser' + dNum;
var dEmail = 'disposableuser' + dNum + '@user.user';
var dPW = 'disposableuser' + dNum;
console.log('g.createUser: ' + g.createUser);
console.log('g.url: ' + g.url);

frisby.create('LOGIN/LOGOUT users/session-login-logout_spec: Create')

// 1) Create  

  .post( g.url + g.createUser,
    { "username" : dUsr, "email" : dEmail,  "password" : dPW, "skip-email" : true },
    { json: true },
    { headers: { "Content-Type":"application/json"}})  
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')

// 2) Login  

  .afterJSON(function(err, body, res){
      frisby.create('users/session-login-logout_spec: Login')
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
            frisby.create('users/session-login-logout_spec: Verify')
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
                        frisby.create('users/session-login-logout_spec: Login')
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
// 6) Delete              
                        .after(function(body, res){
                          console.log('deleting user');
                          frisby.create('users/session-login-logout_spec: Delete')
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
        })
        .toss()
  })
  .toss()