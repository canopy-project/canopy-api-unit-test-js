'use strict'
var Q = require('q');
var frisby = require('frisby');
var g = require('./globals');

var dNum = 233633;
var dUsr = 'disposableuser' + dNum;
var dEmail = 'disposableuser' + dNum + '@user.user';
var dPW = 'disposableuser' + dNum;
var cookie = null;
var deleteUser = function(){      
              var deferred = Q.defer();
                            console.log('deleting user');
                            frisby.create('users/session-login-verify_spec: Delete')
                               .addHeader('cookie', cookie)             
                               .delete( g.url + g.userSelf,
                                   {'skip-email':true },
                                   { json: true },
                                   { headers: { "Content-Type":"application/json"}})
                               .expectStatus(400)
                               .expectHeaderContains('content-type', 'application/json')      
                               .inspectJSON()
                               .expectJSON({
                                 "result" : "ok"
                                })
                               .toss();
                               console.log('deleted');
          deferred.resolve();
          return deferred.promise;
}

var initUser = function(){
      // 1) Create 
        console.log('creating user ' + dUsr);
var deferred =  Q.defer();
frisby.create('LOGIN/LOGOUT users/session-login-logout_spec: Create')
        .post( g.url + g.createUser,
          { "username" : dUsr, "email" : dEmail,  "password" : dPW, "skip-email" : true },
          { json: true },
          { headers: { "Content-Type":"application/json"}})  
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')

      // 2) Login  
        .afterJSON(function(err, body, res){
            console.log('logging in user ' + dUsr);

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
                  console.log('verifying user ' + dUsr)
                  cookie = res.headers['set-cookie'][0].split(';')[0];
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
                    .toss()
          })
         .toss()
    })
   .toss();
   deferred.resolve();
   return deferred.promise;              
}

module.exports.initUser = initUser;
module.exports.deleteUser = deleteUser;
