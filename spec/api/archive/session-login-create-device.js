'use strict'

var frisby = require('frisby');
var g = require('../globals');

/*
    Test: Session-Based Login, Create User-Linked Device
*/

//  Expect g.createUser to return 200 if username and
//  email are unique

//  Initialize 'Disposable User' credentials
var dNum = 7827935;
var dUsr = 'disposableuser' + dNum;
var dEmail = 'disposableuser' + dNum + '@user.user';
var dPW = 'disposableuser' + dNum;

//  Initialize Devices Details

var quantity = 1;
var friendlyNames = ['Jake' + dNum];


console.log('g.createUser: ' + g.createUser);
console.log('g.url: ' + g.url);


frisby.create('CREATE USER-LINKED DEVICE users/session-login-create-device_spec:Create')

// 1) Create  

  .post( g.url + g.createUser,
    { "username" : dUsr, "email" : dEmail,  "password" : dPW, "skip-email" : true },
    { json: true },
    { headers: { "Content-Type":"application/json"}})  
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')

// 2) Login  

  .afterJSON(function(err, body, res){
      frisby.create('users/session-login-create-device_spec:Login')
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

            frisby.create('users/session-login-create-device_spec:Verify')
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

// GET /api/device/<UUID>

                  .after(function(err, body, res){
                      console.log('\nDevice Created res.body.devices[0].device_id: \n');
                      //console.log(res.body.devices[0].device_id);
                      var deviceId =  res.devices[0].device_id
                      console.log('deviceId: ' + deviceId);
                      console.log('\nDevice Created res.body.devices[0].device_secret_key: \n');
                      //console.log(res.body.devices[0].device_secret_key);
                      var secretKey = res.devices[0].device_secret_key;
                      var auth = "Basic " + new Buffer( deviceId + ':' + secretKey ).toString("base64");
                      console.log('secretKey: ' + secretKey);
                      console.log('Checking device created');
                      console.log(g.url + g.devicepath + deviceId);
                      console.log(auth);
                      frisby.create('users/session-login-create-device_spec:Verify Device Created')
                       .get( g.url + g.devicepath + deviceId)
                       .addHeader('Authentication', auth)
                       .expectStatus(200)
                       .expectHeaderContains('content-type', 'application/json')      
                       .inspectJSON()
                       .expectJSON(  {
                         "result" : "ok",
                         "device_id" : deviceId,
                         "friendly_name" : friendlyNames[0]                         
                        })


// 6) Delete              
// 6) Delete             
                          .after(function(body, res){
                            console.log('deleting user');
                            frisby.create('users/session-login-verify_spec: Delete')
                               .addHeader('cookie', cookie)             
                               .delete( g.url + g.userSelf,
                                   {'skip-email':true },
                                   { json: true },
                                   { headers: { "Content-Type":"application/json"}})
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