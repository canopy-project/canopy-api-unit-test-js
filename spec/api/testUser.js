'use strict'
var Q = require('q');
var frisby = require('frisby');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var TestUser = function(){
    this.generateUsername = function(){
        return  'user' + Math.floor( Math.random()*100000 );
    };
    this.generateEmail = function(){
        var randomString = Math.random().toString(36).substring(2,10);
        return randomString + '@' + randomString + '.com';
    }
    this.generatePassword = function(){
        return 'password' + Math.floor( Math.random()*100000 );
    }
    this.username = this.generateUsername();
    this.email = this.generateEmail();
    this.password = this.generatePassword();
    this.baseURL = 'https://dev02.canopy.link/api/';
    this.loginPath = 'login';
    this.selfPath = 'user/self';
    this.selfDevicesPath = 'user/self/devices'; 
    this.createUserPath = 'create_user';
    this.createUserLinkedDevicesPath = 'create_devices';
    this.register = function(){
        var deferred =  Q.defer();
        console.log('creating user: ' + this.username);
        frisby.create('REGISTERING USER ' + this.username)
            .post( this.baseURL + this.createUserPath,
                { "username" : this.username, "email" : this.email,  "password" : this.password, "skip-email" : true },
                { json: true },
                { headers: { "Content-Type":"application/json"}})  
            .expectStatus(200)
            .expectHeaderContains('content-type', 'application/json')
            .inspectJSON()
            .expectJSON(  {
                "result" : "ok",
                "activated" : false,
                "username" : this.username,
                "email" : this.email
            })
            .afterJSON(function(){
                deferred.resolve('user created');
            })
            .toss();
        return deferred.promise;
        }
    this.login = function(){
        var deferred = Q.defer();
        console.log('logging in');
        frisby.create('LOGIN USER ' + this.username)
            .post( this.baseURL + this.loginPath,
                { "username" : this.username, "email" : this.email,  "password" : this.password },
                { json: true },
                { headers: { "Content-Type":"application/json"}})
            .expectStatus(200)
            .expectHeaderContains('content-type', 'application/json')
            .inspectJSON()
            .expectJSON({
                "result" : "ok",
                "username" : this.username,
                "email" : this.email
            })
            .afterJSON(function(body, res){
                cookie = res.headers['set-cookie'][0].split(';')[0];
                console.log('COOKIE FROM LOGIN: ' + cookie);
                deferred.resolve(cookie);
            })      
            .toss();
        return deferred.promise;
    };
    this.initUser = function(){
        console.log('this: ');
        console.dir(this);
        var deferred =  Q.defer();
        console.log('creating user: ' + this.username);
        frisby.create('CREATE USER')
        .post( this.baseURL + this.createUserPath,
            { "username" : this.username, "email" : this.email,  "password" : this.password, "skip-email" : true },
            { json: true },
            { headers: { "Content-Type":"application/json"}})  
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')
        .afterJSON(function(err, body, res){
            if(err){
                console.log(err)
            } else { 
                console.log(res)
            }            
/*            frisby.create('LOGIN USER')
            .post( this.baseURL + this.loginPath,
                { "username" : this.username, "email" : this.email,  "password" : this.password },
                { json: true },
                { headers: { "Content-Type":"application/json"}})
            .expectStatus(200)
            .expectHeaderContains('content-type', 'application/json')
            .expectJSON({
                "result" : "ok",
                "username" : this.username,
                "email" : this.email
            })
            .after(function(body, res){
                cookie = res.headers['set-cookie'][0].split(';')[0];
                deferred.resolve(cookie);
                frisby.create('VERIFY USER & SET COOKIE')
                .addHeader('cookie', cookie)
                .get( this.baseURL + this.selfPath)
                .expectStatus(200)
                .expectHeaderContains('content-type', 'application/json')      
                .expectJSON(  {
                    "result" : "ok",
                    "validated" : false,
                    "username" : this.username,
                    "email" : this.email
                })
                .toss()
            })
            .toss()*/
        })
        .toss();
        return deferred.promise;
        }
}

module.exports = new TestUser();