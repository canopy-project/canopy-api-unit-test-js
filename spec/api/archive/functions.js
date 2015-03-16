'use strict'
var Q = require('q');
var frisby = require('frisby');
var g = require('./globals');

var dNum = 7922239;
var dUsr = 'disposableuser' + dNum;
var dEmail = 'disposableuser' + dNum + '@user.user';
var dPW = 'disposableuser' + dNum;
var cookie = null;

var initUser = function(){
    var deferred =  Q.defer();
    frisby.create('CREATE USER')
    .post( g.url + g.createUser,
        { "username" : dUsr, "email" : dEmail,  "password" : dPW, "skip-email" : true },
        { json: true },
        { headers: { "Content-Type":"application/json"}})  
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .afterJSON(function(err, body, res){
        frisby.create('LOGIN USER')
        .post( g.url + g.login,
            { "username" : dUsr, "email" : dEmail,  "password" : dPW },
            { json: true },
            { headers: { "Content-Type":"application/json"}})
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')
        .expectJSON({
            "result" : "ok",
            "username" : dUsr,
            "email" : dEmail
        })
        .after(function(body, res){
            cookie = res.headers['set-cookie'][0].split(';')[0];
            deferred.resolve(cookie);
            frisby.create('VERIFY USER & SET COOKIE')
            .addHeader('cookie', cookie)
            .get( g.url + g.userSelf)
            .expectStatus(200)
            .expectHeaderContains('content-type', 'application/json')      
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
    return deferred.promise;      
}
module.exports.initUser = initUser;
module.exports.deleteUser = deleteUser;
var getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// variables I need: cookie

var deleteUser = function(){      
          //    var deferred = Q.defer();
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


