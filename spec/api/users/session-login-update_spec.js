'use strict'

var frisby = require('frisby');
var g = require('../globals');

//  Initialize 'Disposable User' credentials
var dNum = 65674;
var nNum = 38943;
var dUsr = 'disposableuser' + dNum;
var dEmail = 'disposableuser' + dNum + '@user.user';
var dPW = 'disposableuser' + dNum;

//  Initialize Update Data
var nEmail = 'disposableuser' + nNum + '@user.user';
var nPW = 'disposableuser' + nNum;

/*
    Test: Session-Based Login, Account Update
*/

//  Expect 'create_account' to return 200 if username and
//  email are unique
console.log('creating test user');
frisby.create('UPDATE users/session-login-update_spec: Create')

// 1) Create  
  .post( g.url + 'create_account',
    { "username" : dUsr, "email" : dEmail,  "password" : dPW },
    { json: true },
    { headers: { "Content-Type":"application/json"}})
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')

// 2) Login  

  .afterJSON(function(err, body, res){
      console.log('login in test user');
      frisby.create('users/session-login-update_spec: Login')
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
            console.log('verifying test user data');
            var cookie = res.headers['set-cookie'][0].split(';')[0];
            console.log('cookie: ' + cookie);
            frisby.create('users/session-login-update_spec: Verify')
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

// 4) Update  
              .after(function(body, res){
                console.log('updating test user');
                frisby.create('users/session-login-update_spec: Update')
                   .addHeader('cookie', cookie)
                   .post( g.url + g.userSelfEndpoint,{
                      "email" : nEmail,
                      "new_password" : nPW,
                      "old_password" : dPW                   
                   })
                   .expectStatus(200)
                   .expectHeaderContains('content-type', 'application/json')      
                   .inspectJSON()
                   .expectJSON({
                      "result" : "ok",
                      "username" : dUsr,
                      "email" : nEmail
                    })
// 5) Verify Data Update
                    .after(function(body, res){
                        console.log('verifying data update');
                        frisby.create('users/session-login-update_spec: Verify Data Update')
                         .addHeader('cookie', cookie)
                         .get( g.url + g.userSelfEndpoint)
                         .expectStatus(200)
                         .expectHeaderContains('content-type', 'application/json')      
                         .inspectJSON()
                         .expectJSON(  {
                           "result" : "ok",
                           "validated" : false,
                           "username" : dUsr,
                           "email" : nEmail
                          })

// 6) Delete             
                          .after(function(body, res){
                            console.log('deleting test user');
                            frisby.create('users/session-login-update_spec: Delete')
                               .addHeader('cookie', cookie)
                               .delete( g.url + g.userSelfEndpoint)
                               .expectStatus(200)
                               .expectHeaderContains('content-type', 'application/json')      
                               .inspectJSON()
                               .expectJSON({
                                 "result" : "ok"
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