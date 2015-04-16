'use strict'

var testUser = require('../testUser');

/*
    Test: Set cloud variables using session auth
*/

var Test = function( ){
    var that = this;
    that.user = new testUser( __filename, '** SESSION AUTH SET CLOUD VARS FOR DEVICE**' );
    that.variableDeclarationJSON =  {
                "var_decls" : {
                    "out float32 temperature" : { },
                    "out float32 humidity" : { },
                    "in int8 dimmer_brightness" : { },
                    "in bool reboot_now" : { }
                 }
    }
      
    that.setVariablesJSON =  {
        "vars" : {
            "temperature" : 65,
            "humidity" : 32,
            "dimmer_brightness" : 99
        }
    };

    that.expectJSON = {
        "vars" : { 
            "dimmer_brightness": { 
                    v: 99 
            },
            "humidity": { 
                v: 32 
            },
            "temperature": { 
                v: 65 
            } 
        }
    };

    that.test = function(){
        that.user.register( {}, that.login );
    }
    that.login = function(){
        that.user.usernameLogin( {}, that.createDevice );
    }
    that.createDevice = function(){
        that.user.createDevice( __filename, {}, that.verifyDevice );
    }
    that.verifyDevice= function(){
        that.user.sessionVerifyDevice( {}, that.declareCloudVariables ); 
    }
    that.declareCloudVariables = function(){
        that.user.sessionDeclareCloudVariables( that.variableDeclarationJSON, that.setCloudVariables );
    }
    that.setCloudVariables = function(){
        that.user.sessionSetCloudVariables( {
                'variableUpdates': that.setVariablesJSON,
                'expectJSON': that.expectJSON
            }, that.verifyDeviceUpdate )
    }
    that.verifyDeviceUpdate = function(){
        that.user.sessionVerifyDevice( that.expectJSON, that.delete )
    }
    that.delete = function(){
        that.user.delete();
    }
}

var test = new Test();

test.test();
