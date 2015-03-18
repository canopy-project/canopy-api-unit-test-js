'use strict'

var testUser = require('../testUser');

/*
    Test: Verify user-linked device with device simple auth
*/

var Test = function( ){
    var that = this;
    that.user = new testUser( '** REGISTER USER-LINKED DEVICE **' );
    that.test = function(){
        console.log('REGISTERING')
        that.user.register( {}, that.login );
    }
    that.login = function(){
        console.log('LOGGING IN');
        that.user.usernameLogin( {}, that.createDevice );
    }
    that.createDevice = function(){
        console.log('CREATING DEVICE');
        that.user.createDevice( {}, that.verifyDevice);
    }
    that.verifyDevice= function(){
        console.log('VERIFYING DEVICE');
        that.user.deviceBasicAuthVerify( that.user.delete );
    }
}

var test = new Test();

test.test();