'use strict'

var testUser = require('../testUser');

/*
    Test: Update device friendly name using session auth
*/

var Test = function( ){
    var that = this;
    that.user = new testUser( __filename, '** UPDATE USER-LINKED DEVICE FRIENDLY NAME USING SESSION AUTH**' );
    that.updateJSON = { "friendly_name" : "NEW FRIENDLY NAME" };
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
        that.user.sessionUpdateDeviceProperties( that.updateJSON, that.verifyDeviceUpdate );
    }
    that.verifyDeviceUpdate = function(){
        that.user.sessionVerifyDevice( that.updateJSON, that.delete )
    }
    that.delete = function(){
        that.user.delete();
    }
}

var test = new Test();

test.test();
