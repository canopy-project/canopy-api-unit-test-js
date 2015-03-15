'use strict'
var Q = require('q');
var frisby = require('frisby');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var TestUser = function(){
    var that = this;
    that.generateUsername = function(){
        return  'user' + Math.floor( Math.random()*100000 );
    };
    that.generateEmail = function(){
        var randomString = Math.random().toString(36).substring(2,10);
        return randomString + '@' + randomString + '.com';
    }
    that.generatePassword = function(){
        return 'password' + Math.floor( Math.random()*100000 );
    }
    that.username = that.generateUsername();
    that.email = that.generateEmail();
    that.password = that.generatePassword();
    that.baseURL = 'https://dev02.canopy.link/api/';
    that.loginPath = 'login';
    that.selfPath = 'user/self';
    that.selfDevicesPath = 'user/self/devices'; 
    that.createUserPath = 'create_user';
    that.createUserLinkedDevicesPath = 'create_devices';
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
    that.login = function(callback){
        console.log('logging in user: ' + that.username);
        frisby.create('LOGIN USER ' + that.username)
            .post( that.baseURL + that.loginPath,
                { "username" : that.username, "email" : that.email,  "password" : that.password },
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
        frisby.create('VERIFY user: ' + that.user)
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
    that.init = function(){
        that.register( that.login );
    }
}

module.exports = new TestUser();