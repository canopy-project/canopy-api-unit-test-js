'use strict'

var frisby = require('frisby');
var g = require('../globals');

/*
    Test: Session-Based Login, Create User-Linked Device
*/

//  Expect g.createUserEndpoint to return 200 if username and
//  email are unique

//  Initialize 'Disposable User' credentials
var dNum = 47839;
var dUsr = 'disposableuser' + dNum;
var dEmail = 'disposableuser' + dNum + '@user.user';
var dPW = 'disposableuser' + dNum;

//  Initialize Devices Details

var quantity = 1;
var friendlyNames = ['Jake27390235'];


console.log('g.createUserEndpoint: ' + g.createUserEndpoint);
console.log('g.url: ' + g.url);


frisby.create('CREATE USER-LINKED DEVICE users/session-login-create-device_spec:Create')

// 1) Create  

  .post( g.url + g.createUserEndpoint,
    { "username" : dUsr, "email" : dEmail,  "password" : dPW },
    { json: true },
    { headers: { "Content-Type":"application/json", "skip-email" : true }})  
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')

// 2) Login  

  .afterJSON(function(err, body, res){
      frisby.create('users/session-login-create-device_spec:Login')
        .post( g.url + g.loginEndpoint,
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
            frisby.create('users/session-login-create-device_spec:Verify')
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

// 4) Create Device
             .after(function(body, res){
                 console.log('Creating ' + quantity + ' User-Linked Devices' );
                 frisby.create('users/session-login-create-device_spec: Create User-Linked Device')
                  .addHeader('cookie', cookie)
                  .post( g.url + g.createUserLinkedDevices,
                     {
                        "quantity" : quantity,
                        "friendly_names" : friendlyNames
                     },
                     { json: true },
                     { headers: { "Content-Type":"application/json"}})
                  .expectStatus(200)
                  .expectHeaderContains('content-type', 'application/json')
                  .inspectJSON()
                  .expectJSON({
                      "result" : "ok"
                  })
// 5) Verify Device Created



// 5) Delete              
                  .after(function(body, res){
                    console.log('deleting user');
                    frisby.create('users/session-login-create-device_spec:Delete')
                       .addHeader('cookie', cookie)
                       .addHeader('skip-email', true)
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
  })
  .toss()