'use strict'

var testUser = require('../testUser');

/*
 *   Test: Declare device cloud variables using session auth
 */

var Test = function( ){
    var that = this;
    that.user = new testUser( __filename, '** SESSION AUTH DECLARE CLOUD VARS FOR DEVICE**' );
    that.variableDeclarationJSON =  {
                "var_decls" : {
                    "out float32 temperature" : { },
                    "out float32 humidity" : { },
                    "in int8 dimmer_brightness" : { },
                    "in bool reboot_now" : { }
                 }
    }
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
        that.user.sessionVerifyDevice( {}, that.updateDeviceProperties ); 
    }
    that.updateDeviceProperties = function(){
        that.user.sessionDeclareCloudVariables( that.variableDeclarationJSON, that.verifyDeviceUpdate );
    }
    that.verifyDeviceUpdate = function(){
        that.user.sessionVerifyDevice( that.variableDeclarationJSON, that.delete )
    }
    that.delete = function(){
        that.user.delete();
    }
}

var test = new Test();

test.test();
