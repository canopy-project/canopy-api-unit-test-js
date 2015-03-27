'use strict'

var testUser = require('../testUser');

/*
 *   Test: Set cloud variables of user-linked device with device basic auth
 */
var Test = function( ){
    var that = this;
    that.user = new testUser( '** SET CLOUD VARS **' );
    that.variableDeclarationJSON =  {
                "var_decls" : {
                    "out float32 temperature" : { },
                    "out float32 humidity" : { },
                    "in int8 dimmer_brightness" : { }
                 }
    };    
    that.setVariablesJSON =  {
                "vars" : {
                    "temperature" : 65,
                    "humidity" : 32,
                    "dimmer_brightness" : 99
                 }
    };
    that.expectJSON = {
                "vars":{
                    "temperature" : {v:65},
                    "humidity" : {v:32},
                    "dimmer_brightness": {v:99}
                }
    };
    that.test = function(){
        console.log( 'Registering' );
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
        that.user.testDevice.basicAuthDeclareCloudVariables( that.variableDeclarationJSON,  that.setCloudVariables );
    }    
    that.setCloudVariables = function(){
        that.user.testDevice.basicAuthSetCloudVariables( {  'variableUpdates': that.setVariablesJSON,
                                                            'expectJSON': that.expectJSON 
                                                        },  that.verifyUpdate );
    }
    that.verifyUpdate = function(){
        console.log('********Verifying Changes********');
        that.user.testDevice.basicAuthVerifySelf( that.setVariablesJSON, that.delete );
    }
    that.delete = function(){
        that.user.usernameLogin( {}, that.user.delete )   
    }
}

var test = new Test();

test.test();