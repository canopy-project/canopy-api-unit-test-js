'use strict'

var testUser = require('../testUser');

/*
    Test: Verify user-linked device with device basic auth
*/

var Test = function( ){
    var that = this;
    that.user = new testUser( '** BASIC-AUTH DEVICE SELF-VERIFY **' );
    that.test = function(){
        that.user.register( {}, that.login );
    }
    that.login = function(){
        that.user.usernameLogin( {}, that.createDevice );
    }
    that.createDevice = function(){
        that.user.createDevice( {}, that.verifyDevice);
    }
    that.verifyDevice= function(){
        that.user.deviceBasicAuthVerify( that.user.delete );
    }
}

var test = new Test();

test.test();