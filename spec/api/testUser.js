'use strict'
var Q = require('q');
var frisby = require('frisby');
var h = require('./helper-functions');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var TestUser = function(){
    var that = this;
    that.username = h.generateUsername();
    that.email = h.generateEmail();
    that.password = h.generatePassword();
    that.baseURL = 'https://dev02.canopy.link/api/';
    that.loginPath = 'login';
    that.logoutPath = 'logout';
    that.selfPath = 'user/self';
    that.selfDevicesPath = 'user/self/devices'; 
    that.createUserPath = 'create_user';
    that.createUserLinkedDevicesPath = 'create_devices';
    that.cookie = null;
    that.register = function(callback){
        console.log('registering: ' + that.username);
        frisby.create('REGISTERING USER ' + that.username)
            .post( that.baseURL + that.createUserPath,
                { "username" : that.username, "email" : that.email,  "password" : that.password, "skip-email" : true },
                { json: true },
                { headers: { "Content-Type":"application/json"}})  
            .expectStatus(200)
            .expectHeaderContains('content-type', 'application/json')
            .inspectJSON()
            .expectJSON(  {
                "result" : "ok",
                "activated" : false,
                "username" : that.username,
                "email" : that.email
            })
            .afterJSON(function(){
                if(callback){
                    callback();
                }
            })
            .toss();
        };
    that.usernameLogin = function(callback){
        console.log('logging in user: ' + that.username);
        frisby.create('LOGIN USER ' + that.username)
            .post( that.baseURL + that.loginPath,
                { "username" : that.username, "password" : that.password },
                { json: true },
                { headers: { "Content-Type":"application/json"}})
            .expectStatus(200)
            .expectHeaderContains('content-type', 'application/json')
            .inspectJSON()
            .expectJSON({
                "result" : "ok",
                "username" : that.username,
                "email" : that.email
            })
            .after(function(body, res){
                that.cookie = res.headers['set-cookie'][0].split(';')[0];
                console.log('COOKIE FROM LOGIN: ' + that.cookie);
                if(callback){
                    callback();
                }
            })   
            .toss();
    };
    that.emailLogin = function(callback){
        console.log('logging in user: ' + that.email);
        frisby.create('LOGIN USER ' + that.email)
            .post( that.baseURL + that.loginPath,
                { "username" : that.email, "password" : that.password },
                { json: true },
                { headers: { "Content-Type":"application/json"}})
            .expectStatus(200)
            .expectHeaderContains('content-type', 'application/json')
            .inspectJSON()
            .expectJSON({
                "result" : "ok",
                "username" : that.username,
                "email" : that.email
            })
            .after(function(body, res){
                that.cookie = res.headers['set-cookie'][0].split(';')[0];
                console.log('COOKIE FROM LOGIN: ' + that.cookie);
                if(callback){
                    callback();
                }
            })   
            .toss();
    };    
    that.verify = function(callback){    
        console.log('verifying user: ' + that.username);
        frisby.create('VERIFY user: ' + that.username)
             .addHeader('cookie', that.cookie)
             .get( that.baseURL + that.selfPath )
             .expectStatus(200)
             .expectHeaderContains('content-type', 'application/json')      
             .inspectJSON()
             .expectJSON(  {
               "result" : "ok",
               "validated" : false,
               "username" : that.username,
               "email" : that.email
              })
              .after(function(body, res){
                  if(callback){
                      callback();
                  }
              })   
              .toss();
        };
    that.delete = function(callback){
        console.log('deleting user: ' + that.username);
        frisby.create('DELETE user: ' + that.username)
            .addHeader('cookie', that.cookie)             
            .delete( that.baseURL + that.selfPath,
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
    };
    that.logout = function(callback){
        console.log('logging out user: ' + that.username);
        frisby.create('LOGOUT user: ' + that.username)
            .post( that.baseURL + that.logoutPath)
            .expectStatus(200)
            .expectHeaderContains('content-type', 'application/json')
            .inspectJSON()
            .expectJSON({
               "result" : "ok"
            })    
            .after(function(){
                if(callback){
                    callback();
                }
            })
            .toss()
    }          
    that.createDevices = function(quantity, friendlyNames, callback){
        frisby.create('users/session-login-create-device_spec: Create User-Linked Device')
            .addHeader('cookie', that.cookie)
            .post( that.baseURL + that.createUserLinkedDevicesPath,
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
            .after(function(){
                if(callback){
                    callback();
                }
            })
            .toss()
    }
}

module.exports = TestUser;