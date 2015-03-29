'use strict'

var testUser = require('../testUser');

/*
    Test: Verify user-linked device with device basic auth
*/

var Test = function( ){
    var that = this;
    that.user = new testUser( '** BASIC-AUTH DEVICE SELF-VERIFY **' );
    that.test = function(){
        console.log('Registering');
        that.user.register( {}, that.login );
    }
    that.login = function(){
        console.log('logging in');
        that.user.usernameLogin( {}, that.createDevice );
    }
    that.createDevice = function(){
        console.log('creating device');
        that.user.createDevice( {}, that.verifyDevice);
    }
    that.verifyDevice = function(){
        console.log('verifying device');
        that.user.testDevice.basicAuthVerifySelf( {
            device_id: that.user.testDevice.device_id,
            friendly_name: that.user.testDevice.friendly_name,
            location_note: that.user.testDevice.location_note
        }, that.delete );
    }
    that.delete = function(){
        that.user.usernameLogin( {}, that.user.delete );
    }
}

var test = new Test();

test.test();