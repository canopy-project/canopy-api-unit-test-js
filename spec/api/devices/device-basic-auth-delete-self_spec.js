'use strict'

var testUser = require('../testUser');

/*
    Test: Verify user-linked device with device basic auth
*/

var Test = function( ){
    var that = this;
    that.user = new testUser( __filename, '** BASIC-AUTH DEVICE SELF-VERIFY **' );
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
        that.user.testDevice.basicAuthVerifySelf( {
            device_id: that.user.testDevice.device_id,
            friendly_name: that.user.testDevice.friendly_name,
            location_note: that.user.testDevice.location_note
        }, that.deleteDeviceAndUser );
    }
    that.deleteDeviceAndUser = function(){
        that.user.testDevice.basicAuthDelete( that.user.delete );
    }
}

var test = new Test();

test.test();
