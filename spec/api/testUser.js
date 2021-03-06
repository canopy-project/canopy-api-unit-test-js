'use strict'

var h = require('./helper-functions');
var TestDevice = require('./testDevice');
var frisbyRequest = require('./frisbyRequest');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var TestUser = function( testFilename, testName ){
    var that = this;
    that.username = null; 
    that.email = null;
    that.password = null;
    that.baseURL = process.env.CANOPY_BASE_URL;
    that.loginPath = 'login';
    that.logoutPath = 'logout';
    that.selfPath = 'user/self';
    that.selfDevicesPath = 'user/self/devices'; 
    that.createUserPath = 'create_user';
    that.createUserLinkedDevicesPath = 'create_devices';
    that.devicePath = 'device/';
    that.cookie = null;
    that.testFilename = testFilename;
    that.testName = testName;
    that.testDevice = {};
    that.testDeviceURL = null;

    that.register = function( user, callback ){
        user.username ? ( user.username.forceUndefined ? that.username = undefined : that.username = user.username) : that.username = h.generateUsername(); 
        user.email ? ( user.email.forceUndefined ? that.email = undefined : that.email = user.email) : that.email = h.generateEmail();
        user.password ? ( user.password.forceUndefined ? that.password = undefined : that.password = user.password) : that.password = h.generatePassword();
        user.expectStatus ? this.expectStatus = user.expectStatus : this.expectStatus = 200;
        user.expectJSON ? this.expectJSON = user.expectJSON : this.expectJSON = 
            {
                "result" : "ok",
                "activated" : false,
                "username" : that.username,
                "email" : that.email
            }
        frisbyRequest.PostJson({
            "testFilename" : that.testFilename,
            "testname" : that.testName + ' *** REGISTERING USER ' + that.username,
            "url" : that.baseURL + that.createUserPath,
            "jsonBody" : { 
                "username" : that.username, 
                "email" : that.email,  
                "password" : that.password, 
                "skip-email" : true
            },
            "headers" : {"Content-Type": "application/json"},
            "expectStatus" : this.expectStatus
        })
            .expectJSON( this.expectJSON )
            .expectHeaderContains('content-type', 'application/json')
            .afterJSON(function(){
                if(callback){
                    callback();
                }
            })
            .toss();
        };

    that.usernameLogin = function( user, callback ){
        user.username ? this.username = user.username : this.username = that.username || h.generateUsername();
        user.password ? this.password = user.password : this.password = that.password || h.generatePassword();
        user.expectStatus ? this.expectStatus = user.expectStatus : this.expectStatus = 200;
        user.expectJSON ? this.expectJSON = user.expectJSON : this.expectJSON = {
                "result" : "ok",
                "username" : that.username,
                "email" : that.email
            }
        user.expectResponse ? this.expectResponse = user.expectResponse : null;
        user.expectHeader ? this.expectHeader = user.expectHeader : h.generateUsername();
        user.jsonBody ? this.jsonBody = user.jsonBody : this.jsonBody = {
                "username" : that.username,
                "password" : that.password
            }
        frisbyRequest.PostJson({
            "testFilename" : that.testFilename,
            "testname" : that.testName + ' *** LOGIN USER ' + this.username,
            "url" : that.baseURL + that.loginPath,
            "jsonBody" : this.jsonBody,
            "headers" : {"Content-Type" : "application/json"},
            "expectStatus" : this.expectStatus
        })
            .expectHeader('content-type','application/json')
            .expectJSON(this.expectJSON)
            .after(function(body, res){
                res.headers['set-cookie'] ? that.cookie = res.headers['set-cookie'][0].split(';')[0] : null;
                if(callback){
                    callback();
                }
            })   
            .toss();
    };

    that.emailLogin = function( user, callback ){
        user.email ? this.email = user.email : this.email = that.email || h.generateEmail();
        user.password ? this.password = user.password : this.password = that.password || h.generatePassword();
        user.expectStatus ? this.expectStatus = user.expectStatus : this.expectStatus = 200;
        user.expectJSON ? this.expectJSON = user.expectJSON : this.expectJSON = {
                "result" : "ok",
                "username" : that.username,
                "email" : that.email
        }
        frisbyRequest.PostJson({
            "testFilename" : that.testFilename,
            "testname" : that.testName + ' ***  LOGIN USER ' + this.email,
            "url" : that.baseURL + that.loginPath,
            "jsonBody" : { 
                "username" : this.email,   
                "password" : this.password
            },
            "headers" : {"Content-Type": "application/json"},
            "expectStatus" : this.expectStatus
        })            
            .expectHeaderContains('content-type', 'application/json')
            .expectJSON( this.expectJSON )
            .after(function(body, res){
                res.headers['set-cookie'] ? that.cookie = res.headers['set-cookie'][0].split(';')[0] : null;
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
        this.cookie = user.cookie ? user.cookie : that.cookie;
        frisbyRequest.Get({
            "testFilename" : that.testFilename,
            "testname" : that.testName + ' ***  VERIFY USER ' + this.username,
            "url" : that.baseURL + that.selfPath,
            "headers" : {
                "Content-Type": "application/json",
                "cookie" : this.cookie
            },
            "expectStatus" : this.expectStatus
        })             
             .expectHeaderContains('content-type', 'application/json')
             .expectJSON( this.expectJSON )
              .after(function(body, res){
                  if(callback){
                      callback();
                  }
              })   
              .toss();
        };

    that.update = function( user, callback ){   
        this.username = user.username ? user.username : that.username;
        this.email = user.email ? user.email : that.email;
        this.expectStatus = user.expectStatus ? user.expectStatus : 200;
        this.expectJSON = user.expectJSON ? user.expectJSON : {
               "result" : "ok"
        };
        this.jsonBody = user.jsonBody ? user.jsonBody : {},              
        this.cookie = user.cookie ? user.cookie : that.cookie;
        frisbyRequest.PostJson({
            "testFilename" : that.testFilename,
            "testname" : that.testName + ' ***  VERIFY USER ' + this.username,
            "url" : that.baseURL + that.selfPath,
            "headers" : {
                "Content-Type": "application/json",
                "cookie" : this.cookie
            },
            "expectStatus" : this.expectStatus,
            "jsonBody" : this.jsonBody 
        })             
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
        frisbyRequest.Delete({
            "headers" : {
                "Content-Type": "application/json",
                "cookie" : that.cookie
            },
            "jsonBody" : {
                "skip-email" : true
            },                
            "testFilename" : that.testFilename,
            "testname" : that.testName + ' ***  DELETE USER ' + that.username,
            "url" : that.baseURL + that.selfPath,
            "expectStatus" : that.expectStatus
        })            
           .expectHeaderContains('content-type', 'application/json')
           .expectJSON({
              "result" : "ok"
           })
           .after(function(){
                if( callback ){
                    callback();
                }
           })
            .toss()            
    };

    that.logout = function( callback ){
        frisbyRequest.PostJson({
            "headers" : {
                "Content-Type": "application/json",
                "cookie" : that.cookie
            },            
            "testFilename" : that.testFilename,
            "testname" : that.testName + ' *** LOGOUT USER ' + that.username,
            "url" : that.baseURL + that.logoutPath,
            "expectStatus" : this.expectStatus
        })
            .expectHeaderContains('content-type', 'application/json')
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

    that.basicAuthLogin = function( user, callback ){
        this.authString = user.authString ? user.authString : h.generateAuthString( that.username, that.password );
        this.expectJSON = user.expectJSON ? user.expectJSON : {};
        this.expectStatus = user.expectStatus ? user.expectStatus : 200;
        user.jsonBody ? this.jsonBody = user.jsonBody : this.jsonBody = {};        
        frisbyRequest.PostJson({
            "headers" : {
                "Content-Type" : "application/json",
                "Authorization" : this.authString
            },
            "testFilename" : that.testFilename,
            "testname" : that.testName + ' *** LOGIN, BASIC AUTH ' + that.username,
            "url" : that.baseURL + that.selfPath,
            "expectJSON" : this.expectJSON,
            "expectStatus" : this.expectStatus,
            "jsonBody" : this.jsonBody,            
        })
            .after(function(){
                if(callback){
                    callback();
                }
            })
            .toss()
    }

    that.basicAuthVerifySelf = function ( user, callback ){
        this.authString = user.authString ? user.authString : h.generateAuthString( that.username, that.password );
        this.expectJSON = user.expectJSON ? user.expectJSON : {};
        this.expectStatus = user.expectStatus ? user.expectStatus : 200;       
        frisbyRequest.Get({
            "headers" : {
                "Content-Type" : "application/json",
                "Authorization" : this.authString
            },
            "testFilename" : that.testFilename,
            "testname" : that.testName + ' *** VERIFY USER, BASIC AUTH ' + that.username,
            "url" : that.baseURL + that.selfPath,
            "expectStatus" : this.expectStatus,
            "expectJSON" : this.expectJSON
        })
            .after(function(){
                if(callback){
                    callback();
                }
            })
            .toss()
    }

    that.basicAuthUpdate = function( user, callback ){
        this.authString = user.authString ? user.authString : h.generateAuthString( that.username, that.password );
        this.expectJSON = user.expectJSON ? user.expectJSON : {
            "result" : "ok"
        };
        this.expectStatus = user.expectStatus ? user.expectStatus : 200;
        this.jsonBody = user.jsonBody ? user.jsonBody : {},
        frisbyRequest.PostJson({
            "headers" : {
                "Content-Type": "application/json",
                "Authorization" : this.authString
            },
            "testFilename" : that.testFilename,
            "testname" : that.testName + ' ***  USER BASIC AUTH UPDATE ' + that.username,
            "url" : that.baseURL + that.selfPath,
            "expectStatus" : that.expectStatus,
            "jsonBody" : this.jsonBody
        })
           .expectHeaderContains('content-type', 'application/json')
           .expectJSON( this.expectJSON )
        .toss()
    }

    that.basicAuthDelete = function( user, callback ){
        this.authString = user.authString ? user.authString : h.generateAuthString( that.username, that.password );
        this.expectStatus = user.expectStatus ? user.expectStatus : 200;
        frisbyRequest.Delete({
            "headers" : {
                "Content-Type": "application/json",
                "Authorization" : this.authString
            },
            "jsonBody" : {
                "skip-email" : true
            },            
            "testFilename" : that.testFilename,
            "testname" : that.testName + ' ***  DELETE USER ' + that.username,
            "url" : that.baseURL + that.selfPath,
            "expectStatus" : that.expectStatus
        })
           .expectHeaderContains('content-type', 'application/json')
           .expectJSON({
              "result" : "ok"
           })
            .toss()          
    }

    that.createDevices = function( devices, callback ){
        var quantity = null;
        devices.quantity ? quantity = devices.quantity : quantity = 5;
        var friendlyNames = h.generateDeviceFriendlyNames( quantity );
        frisbyRequest.PostJson({
            "testFilename" : that.testFilename,
            "testname" : that.testName + ' ***  CREATING ' + quantity + ' USER-LINKED DEVICES',
            "url" : that.baseURL + that.createUserLinkedDevicesPath,
            "jsonBody" : { 
                "quantity" : quantity,
                "friendly_names" : friendlyNames
            },
            "headers" : {
                "Content-Type" : "application/json",
                "cookie" : that.cookie
            },
            "expectStatus" : this.expectStatus
        })    
            .expectHeaderContains('content-type', 'application/json')
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

    that.createDevice = function( testFilename, device, callback ){
        var deviceFriendlyName = null;
        device.devicename ? deviceFriendlyName = devicename : deviceFriendlyName = h.generateDeviceFriendlyNames( 1 );
        frisbyRequest.PostJson({
            "testFilename" : that.testFilename,
            "testname" : that.testName + ' ***  CREATING ONE USER-LINKED DEVICE',
            "url" : that.baseURL + that.createUserLinkedDevicesPath,
            "jsonBody" : { 
                "quantity" : 1,
                "friendly_names" : deviceFriendlyName
            },
            "headers" : {
                "Content-Type" : "application/json",
                "cookie" : that.cookie
            },
            "expectStatus" : this.expectStatus
        })        
            .expectHeaderContains('content-type', 'application/json')
            .expectJSON({
                "result" : "ok",
            })
            .after(function(res, body){
                //  Set this device as an object-scoped test device
                that.testDevice = new TestDevice(
                    testFilename,
                   {
                       UUID: body.body.devices[0].device_id,
                       secretKey: body.body.devices[0].device_secret_key,
                       friendlyName: deviceFriendlyName
                   }
                 );
                // Set this device's self-path as testDeviceURL for 
                // user session-auth interactions
                that.testDeviceURL = that.baseURL + that.devicePath +  that.testDevice.UUID;
            })
            .after(function(){
                if(callback){
                    callback();
                }
            })
            .toss()
    }

    that.listDevices = function( callback ){

/*        frisby.create(that.testName + ' *** LIST USER-LINKED DEVICES *** ')         
            .addHeader('cookie', that.cookie)
            .get( that.baseURL + that.selfDevicesPath )
            .expectStatus( 400 )*/
        frisbyRequest.Get({
            "headers" : {
                "Content-Type" : "application/json",
                "cookie" : that.cookie
            },            
            "testFilename" : that.testFilename,
            "testname" : that.testName + ' *** VERIFY DEVICE ' + that.testDevice.UUID,
            "url" : that.baseURL + that.selfDevicesPath,
            "expectStatus" : 200
        })            
            .after(function(){
                if( callback ){
                  callback()
                }
            })
            .toss()
    }


    that.sessionVerifyDevice = function( device, callback ){
        frisbyRequest.Get({
            "headers" : {
                "Content-Type" : "application/json",
                "cookie" : that.cookie
            },            
            "testFilename" : that.testFilename,
            "testname" : that.testName + ' *** VERIFY DEVICE ' + that.testDevice.UUID,
            "url" : that.testDeviceURL,
            "expectStatus" : 200
        })            
            .after(function(){
                if(callback){
                    callback();
                }
            })
            .toss()
    }


    that.sessionUpdateDeviceProperties = function( updateJSON, callback ){
        frisbyRequest.PostJson({
            "headers" : {
                "Content-Type" : "application/json",
                "cookie" : that.cookie
            },
            "testFilename" : that.testFilename,
            "testname" : that.testName + ' ***  SESSION UPDATE DEVICE PROPERTIES FOR ' + that.testDevice.UUID,
            "url" : that.testDeviceURL,
            "jsonBody" : updateJSON,
            "expectStatus" : 200            
        })
            .after( function(){
                if( callback ){
                    callback();
                }
            })
            .toss()            
    }

    that.sessionDeclareCloudVariables = function( variableDeclarations, callback ){
        frisbyRequest.PostJson({
            "headers" : {
                "Content-Type" : "application/json",
                "cookie" : that.cookie
            },
            "testFilename" : that.testFilename,
            "testname" : that.testName + ' ***  SESSION DECLARE VARIABLES FOR DEVICE ' + that.UUID,
            "url" : that.testDeviceURL,
            "jsonBody" : variableDeclarations,
            "expectStatus" : 200
        })            
            .after(function(){
                if(callback){
                    callback()
                }
            })
            .toss()
    }

    that.sessionSetCloudVariables = function( update, callback ){
        frisbyRequest.PostJson({
            "headers" : {
                "Content-Type" : "application/json",
                "cookie" : that.cookie
            },
            "testFilename" : that.testFilename,
            "testname" : that.testName + ' *** SESSION AUTH SET CLOUD VARIABLES FOR DEVICE ' + that.UUID,
            "url" : that.testDeviceURL,
            "jsonBody" : update.variableUpdates,
            "expectStatus" : 200
        })
            .after(function(){
                if(callback){
                    callback()
                }
            })
            .toss()
    }

    that.sessionDeleteDevice = function( device, callback ){
        frisbyRequest.Delete({
            "headers" : {
                "Content-Type" : "application/json",
                "cookie" : that.cookie
            },   
            "testFilename" : that.testFilename,
            "testname" : that.testName + ' ***  SESSION AUTH DELETE DEVICE ' + that.testDevice.UUID,
            "url" : that.testDeviceURL,
            "expectStatus" : 200
        })
           .expectHeaderContains('content-type', 'application/json')
           .expectJSON({
              "result" : "ok"
           })
           .after(function(){
                if( callback ){
                    callback();
                }
           })
            .toss()
    }

    that.getHistoricCloudVarData = function( cloudVariable, callback ){
        frisbyRequest.Get({
            "headers" : {
                "Content-Type" : "application/json",
                "cookie" : that.cookie
            },   
            "testFilename" : that.testFilename,
            "testname" : that.testName + ' ***  SESSION AUTH DELETE DEVICE ' + that.testDevice.UUID,
            "url" : that.testDeviceURL + '/' + cloudVariable,
            "expectStatus" : 200
        })
           .expectHeaderContains('content-type', 'application/json')
           .expectJSON({
              "result" : "ok"
           })
           .inspectJSON()
           .after(function(){
                if( callback ){
                    callback();
                }
           })
            .toss()
    }
}

module.exports = TestUser;
