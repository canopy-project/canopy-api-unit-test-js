'use strict'

var testUser = require('../testUser');

/*
    Test: Declare cloud vars of user-linked device with device basic auth
*/

var Test = function( ){
    var that = this;
    that.user = new testUser( __filename, '** DECLARE CLOUD VARS **' );
    that.variableDeclarationJSON =  {
                "var_decls" : {
                    "out float32 temperature" : { },
                    "out float32 humidity" : { },
                    "in int8 dimmer_brightness" : { },
                    "in bool reboot_now" : { },
                 }
};
    that.test = function(){
        that.user.register( {}, that.login );
    }
    that.login = function(){
        that.user.usernameLogin( {}, that.createDevice );
    }
    that.createDevice = function(){
        that.user.createDevice( {}, that.verifyDevice );
    }
    that.verifyDevice = function(){
        that.user.testDevice.basicAuthVerifySelf( {}, that.declareCloudVariables );
    }
    that.declareCloudVariables = function(){
        that.user.testDevice.basicAuthDeclareCloudVariables( that.variableDeclarationJSON,  that.verifyUpdate );
    }
    that.verifyUpdate = function(){
        that.user.testDevice.basicAuthVerifySelf( that.variableDeclarationJSON, that.delete );
    }
    that.delete = function(){
        that.user.usernameLogin( {}, that.user.delete )   
    }
}

var test = new Test();

test.test();
