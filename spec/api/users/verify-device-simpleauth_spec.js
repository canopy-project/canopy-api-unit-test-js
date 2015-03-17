'use strict'

var testUser = require('../testUser');

/*
    Test: Verify user-linked device with device simple auth
*/

var Test = function( ){
    var that = this;
    that.user = new testUser( '** REGISTER USER-LINKED DEVICE **' );
    that.test = function(){
        that.user.register( {}, that.login );
    }
    that.login = function(){
        that.user.usernameLogin( {}, that.createDevices );
    }
    that.createDevices = function(){
        that.user.createDevice( {}, that.verifyDevice);
    }
    that.verifyDevice= function(){
        that.user.deviceSimpleAuthVerify( that.user.delete );
    }
}

var test = new Test();

test.test();