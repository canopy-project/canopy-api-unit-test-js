'use strict'

var testUser = require('../testUser');


/*
 *    Test: Update user-linked device friendly name with device basic auth
 */

var Test = function( ){
    var that = this;
    that.user = new testUser( '** UPDATE DEVICE FREINDLY NAME BASIC AUTH **' );
    that.updateJSON = { "friendly_name": "NEW FRIENDLY NAME" };
    that.test = function(){
        console.log('Registering');
        that.user.register( {}, that.login );
    }
    that.login = function(){
        that.user.usernameLogin( {}, that.createDevice );
    }
    that.createDevice = function(){
        that.user.createDevice( {}, that.verifyDevice);
    }
    that.verifyDevice = function(){
        that.user.testDevice.basicAuthVerifySelf( {}, that.updateProperties );
    }
    that.updateProperties = function(){
        that.user.testDevice.basicAuthUpdateProperties( that.updateJSON, that.verifyUpdate );
    }
    that.verifyUpdate = function(){
        console.log( '********Verifying Changes********' );
        that.user.testDevice.basicAuthVerifySelf( that.updateJSON , that.delete );
    }
    that.delete = function(){
        that.user.usernameLogin( {}, that.user.delete );
    }
}

var test = new Test();

test.test();