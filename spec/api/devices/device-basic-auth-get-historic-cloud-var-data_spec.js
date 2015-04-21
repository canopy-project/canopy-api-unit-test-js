'use strict'

var testUser = require('../testUser');

/*
 *   Test: Get historic cloud var data
 */
var Test = function( ){
    var that = this;
    that.user = new testUser( __filename, '** BASIC AUTH GET HISTORIC CLOUD VAR DATA **' );
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
    that.verifyDevice = function(){
        that.user.testDevice.basicAuthVerifySelf( {}, that.declareCloudVariables );
    }
    that.declareCloudVariables = function(){
        that.user.testDevice.basicAuthDeclareCloudVariables( that.variableDeclarationJSON, that.setCloudVariables );
    }    
    that.setCloudVariables = function(){
        that.user.testDevice.basicAuthSetCloudVariables({  
                'variableUpdates': that.setVariablesJSON,
                'expectJSON': that.expectJSON 
        },  that.verifyUpdate );
    }
    that.verifyUpdate = function(){
        that.user.testDevice.basicAuthVerifySelf( that.expectJSON, that.getHistoricCloudVarData );
    }
    that.getHistoricCloudVarData = function(){
        that.user.testDevice.getHistoricCloudVarData( 'humidity', that.delete );
    }
    that.delete = function(){
        that.user.usernameLogin( {}, that.user.delete );
    }
}

var test = new Test();

test.test();
