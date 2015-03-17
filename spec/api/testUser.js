'use strict'
var frisby = require('frisby');
var h = require('./helper-functions');
var TestDevice = require('./testDevice');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var TestUser = function( testName ){
    var that = this;
    that.username = null;
    that.email = null;
    that.password = null;
    that.baseURL = 'https://dev02.canopy.link/api/';
    that.loginPath = 'login';
    that.logoutPath = 'logout';
    that.selfPath = 'user/self';
    that.selfDevicesPath = 'user/self/devices'; 
    that.createUserPath = 'create_user';
    that.createUserLinkedDevicesPath = 'create_devices';
    that.devicePath = 'device/'
    that.cookie = null;
    that.testName = testName;
    that.testDevice = {};
    that.register = function( username, email, password, expectStatus, expectJSON, skipDefaults, callback ){
        if ( !skipDefaults ){
            username ? that.username = username : that.username = h.generateUsername();
            email ? that.email = email : that.email = h.generateEmail();
            password ? that.password = password : that.password = h.generatePassword();
            expectStatus ? this.expectStatus = expectStatus : this.expectStatus = 200;
            expectJSON ? this.expectJSON = expectJSON : this.expectJSON = 
                {
                    "result" : "ok",
                    "activated" : false,
                    "username" : that.username,
                    "email" : that.email
                }
        } else {
            that.username = username;
            that.email = email;
            that.password = password;
            that.expectStatus = expectStatus;
            that.expectJSON = expectJSON;  
        }
        console.log('registering: ' + that.username ); 
        frisby.create(that.testName + ' *** REGISTERING USER ' + that.username)
            .post( that.baseURL + that.createUserPath,
                { "username" : that.username, "email" : that.email,  "password" : that.password, "skip-email" : true },
                { json: true },
                { headers: { "Content-Type":"application/json"}})  
            .expectJSON( this.expectJSON )
            .expectStatus( this.expectStatus)
            .expectHeaderContains('content-type', 'application/json')
            .inspectJSON()
            .afterJSON(function(){
                if(callback){
                    callback();
                }
            })
            .toss();
        };
    that.usernameLogin = function( username, password, expectStatus, expectJSON, callback ){
        username ? this.username = username : this.username = that.username;
        password ? this.password = password : this.password = that.password;
        expectStatus ? this.expectStatus = expectStatus : this.expectStatus = 200;
        expectJSON ? this.expectJSON = expectJSON : this.expectJSON = {
                "result" : "ok",
                "username" : that.username,
                "email" : that.email
            }        
        console.log('logging in user: ' + that.username);
        frisby.create(that.testName + ' *** LOGIN USER ' + that.username)
            .post( that.baseURL + that.loginPath,
                { "username" : that.username, "password" : that.password },
                { json: true },
                { headers: { "Content-Type":"application/json"}})
            .expectStatus(200)
            .expectHeaderContains('content-type', 'application/json')
            .inspectJSON()
            .expectJSON(this.expectJSON)
            .after(function(body, res){
                res.headers['set-cookie'] ? that.cookie = res.headers['set-cookie'][0].split(';')[0] : null;
                that.cookie ? console.log('COOKIE FROM LOGIN: ' + that.cookie) : null;
                if(callback){
                    callback();
                }
            })   
            .toss();
    };
    that.emailLogin = function( email, password, expectStatus, expectJSON, callback ){
        email ? this.email = email : this.email = that.email;
        password ? this.password = password : this.password = that.password;
        expectStatus ? this.expectStatus = expectStatus : this.expectStatus = 200;
        expectJSON ? this.expectJSON = expectJSON : this.expectJSON = {
                "result" : "ok",
                "username" : that.username,
                "email" : that.email
            }
        console.log('logging in user: ' + this.email);
        frisby.create( that.testName + ' *** LOGIN USER ' + this.email)
            .post( that.baseURL + that.loginPath,
                { "username" : this.email, "password" : this.password },
                { json: true },
                { headers: { "Content-Type":"application/json"}})
            .expectStatus(this.expectStatus)
            .expectHeaderContains('content-type', 'application/json')
            .inspectJSON()
            .expectJSON( this.expectJSON )
            .after(function(body, res){
                res.headers['set-cookie'] ? that.cookie = res.headers['set-cookie'][0].split(';')[0] : null;
                that.cookie ? console.log('COOKIE FROM LOGIN: ' + that.cookie) : null;
                if(callback){
                    callback();
                }
            })   
            .toss();
    };    
    that.verify = function( username, email, expectStatus, expectJSON, callback ){   
        username ? this.username = username : this.username = that.username;
        email ? this.email = email : this.email = that.email;
        expectStatus ? this.expectStatus = expectStatus : this.expectStatus = that.expectStatus;
        expectJSON ? this.expectJSON = expectJSON : this.expectJSON = {
               "result" : "ok",
               "validated" : false,
               "username" : that.username,
               "email" : that.email
              }; 
        console.log('verifying user: ' + that.username);
        frisby.create(that.testName + ' *** VERIFY USER: ' + that.username)
             .addHeader('cookie', that.cookie)
             .get( that.baseURL + that.selfPath )
             .expectStatus(200)
             .expectHeaderContains('content-type', 'application/json')
             .expectJSON( this.expectJSON )
              .after(function(body, res){
                  if(callback){
                      callback();
                  }
              })   
              .toss();
        };
    that.delete = function(callback){
        console.log('deleting user: ' + that.username);
        frisby.create(that.testName + ' *** DELETE USER: ' + that.username)
            .addHeader('cookie', that.cookie)             
            .delete( that.baseURL + that.selfPath,
                {'skip-email':true },
                { json: true },
                { headers: { "Content-Type":"application/json"}}
            )
           .expectStatus(200)
           .expectHeaderContains('content-type', 'application/json')
           .inspectJSON()
           .expectJSON({
              "result" : "ok"
           })
            .toss()            
    };
    that.logout = function( callback ){
        console.log('logging out user: ' + that.username);
        frisby.create(that.testName + ' *** LOGOUT USER: ' + that.username)
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
    that.createDevices = function( quantity, callback ){
        var friendlyNames = h.generateDeviceFriendlyNames( quantity );
        console.log('FRIENDLY NAMES: ' + friendlyNames);
        frisby.create(that.testName + ' *** CREATE ' + quantity + 'USER-LINKED DEVICES')
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
    that.createDevice = function( devicename, callback ){
        var deviceFriendlyName = null;
        devicename ? deviceFriendlyName = devicename : deviceFriendlyName = h.generateDeviceFriendlyNames( 1 );
        console.log('CREATING DEVICE: ' + deviceFriendlyName[0]);
        frisby.create(that.testName + ' ***  CREATE USER-LINKED DEVICE: ' + deviceFriendlyName )
            .addHeader('cookie', that.cookie)
            .post( that.baseURL + that.createUserLinkedDevicesPath,
                {
                   "quantity" : 1,
                   "friendly_names" : deviceFriendlyName
                },
                { json: true },
                { headers: { "Content-Type":"application/json"}})
            .expectStatus(200)
            .expectHeaderContains('content-type', 'application/json')
            .inspectJSON()
            .expectJSON({
                "result" : "ok",
            })
            .after(function(res, body){
                that.testDevice.deviceId = body.body.devices[0].device_id;
                that.testDevice.SecretKey = body.body.devices[0].device_secret_key;
                that.testDevice.auth = 
                    new Buffer( that.testDevice.deviceId + ':' + that.testDevice.SecretKey ).toString("base64");
            })
            .after(function(){
                if(callback){
                    callback();
                }
            })
            .toss()
    }
    that.sessionVerifyDevice = function( callback ){
        frisby.create('VERIFY DEVICE ' + that.testDevice.deviceId)
            .get( that.baseURL + that.devicePath +  that.testDevice.deviceId,
                { headers: { "Content-Type":"application/json",
                              "cookie": that.cookie
                            }
            })
            .expectStatus(200)
            .inspectJSON()
            .after(function(){
                if(callback){
                    callback();
                }
            })
            .toss()
    }
    that.deviceSimpleAuthVerify = function( callback ){
        frisby.create('VERIFY DEVICE ' + that.testDevice.deviceId)
            .get( that.baseURL + that.devicePath +  that.testDevice.deviceId,
                { headers: { "Content-Type":"application/json", 
                             "authorization": that.testDevice.auth
                            }
            })
            .expectStatus(200)
            .inspectJSON()
            .after(function(){
                if(callback){
                    callback();
                }
            })
            .toss()
    }
}

module.exports = TestUser;