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
    that.devicePath = 'device/';
    that.cookie = null;
    that.testName = testName;
    that.testDevice = {};
    that.register = function( user, callback ){
        if ( !user.skipDefaults ){
            user.username ? that.username = user.username : that.username = h.generateUsername();
            user.email ? that.email = user.email : that.email = h.generateEmail();
            user.password ? that.password = user.password : that.password = h.generatePassword();
            user.expectStatus ? this.expectStatus = user.expectStatus : this.expectStatus = 200;
            user.expectJSON ? this.expectJSON = user.expectJSON : this.expectJSON = 
                {
                    "result" : "ok",
                    "activated" : false,
                    "username" : that.username,
                    "email" : that.email
                }
        } else {
            that.username = user.username;
            that.email = user.email;
            that.password = user.password;
            that.expectStatus = user.expectStatus;
            that.expectJSON = user.expectJSON;  
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
    that.usernameLogin = function( user, callback ){
        console.log( 'user.skipDefaults: ' + user.skipDefaults );
        if( user.skipDefaults === true ){
            this.username = user.username;
            this.password = user.password;
            this.expectStatus = user.expectStatus;
            this.expectJSON = user.expectJSON;
        } else {
            console.log('NOT SKIPPING DEFAULTS');
            user ? console.dir(user): null;
            user.username ? this.username = user.username : this.username = that.username;
            user.password ? this.password = user.password : this.password = that.password;
            user.expectStatus ? this.expectStatus = user.expectStatus : this.expectStatus = 200;
            user.expectJSON ? this.expectJSON = user.expectJSON : this.expectJSON = {
                    "result" : "ok",
                    "username" : that.username,
                    "email" : that.email
                }            

        }
        console.log('logging in user: ' + this.username);
        frisby.create(that.testName + ' *** LOGIN USER ' + this.username)
            .post( that.baseURL + that.loginPath,
                { "username" : this.username, "password" : this.password },
                { json: true },
                { headers: { "Content-Type":"application/json"}})
            .expectStatus(this.expectStatus)
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
    that.emailLogin = function( user, callback ){
        user.email ? this.email = user.email : this.email = that.email;
        user.password ? this.password = user.password : this.password = that.password;
        user.expectStatus ? this.expectStatus = user.expectStatus : this.expectStatus = 200;
        user.expectJSON ? this.expectJSON = user.expectJSON : this.expectJSON = {
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
    that.verify = function( user, callback ){   
        user.username ? this.username = user.username : this.username = that.username;
        user.email ? this.email = user.email : this.email = that.email;
        user.expectStatus ? this.expectStatus = user.expectStatus : this.expectStatus = that.expectStatus;
        user.expectJSON ? this.expectJSON = user.expectJSON : this.expectJSON = {
               "result" : "ok",
               "validated" : false,
               "username" : that.username,
               "email" : that.email
              }; 
        console.log('verifying user: ' + this.username);
        frisby.create(that.testName + ' *** VERIFY USER: ' + this.username)
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
    that.delete = function( callback ){
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
                that.testDevice = new TestDevice( 
                                        body.body.devices[0].device_id,
                                        body.body.devices[0].device_secret_key
                                    )
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
            .get( that.baseURL + that.devicePath +  that.testDevice.UUID,
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
            .get( that.baseURL + that.devicePath +  that.testDevice.UUID,
                { headers: { "Content-Type":"application/json", 
                             "authorization": that.testDevice.authString
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