'use strict'
var Q = require('q');
var frisby = require('frisby');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var TestUser = function(){
    this.generateUsername = function(){
        return  'user' + Math.floor( Math.random()*10000000000 );
    };
    this.generateEmail = function(){
        var randomInteger = Math.floor( Math.random()*10000000000 );
        return randomInteger + '@' + randomInteger + '.com';
    }
    this.generatePassword = function(){
        return 'password' + Math.floor( Math.random()*10000000000 );
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
    this.initUser = function(){
        console.log('this: ');
        console.dir(this);
        var deferred =  Q.defer();
        frisby.create('CREATE USER')
        .post( this.baseURL + this.createUserPath,
            { "username" : this.username, "email" : this.email,  "password" : this.password, "skip-email" : true },
            { json: true },
            { headers: { "Content-Type":"application/json"}})  
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')
        .afterJSON(function(err, body, res){
            frisby.create('LOGIN USER')
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
            .toss()
        })
        .toss();
        return deferred.promise;
        }
}

module.exports = new TestUser();