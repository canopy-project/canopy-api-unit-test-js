'use strict'

var testUser = require('../testUser');

/*
    Test: Verify user-linked device with session auth
*/

var Test = function( ){
    var that = this;
    that.username = undefined;
    that.email = undefined;
    that.password = undefined;
    that.expectStatus= undefined;
    that.devicename = undefined;
    that.expectJSON = undefined;
    that.user = new testUser( '** REGISTER USER-LINKED DEVICE **' );
    that.test = function(){
        that.user.register( that.username, that.email, that.password, that.expectStatus, that.expectJSON, false, that.login );
    }
    that.login = function(){
        that.user.usernameLogin( that.username, that.password, that.expectStatus, that.expectJSON, that.createDevices );
    }
    that.createDevices = function(){
        that.user.createDevice( that.devicename, that.sessionVerifyDevice );
    }
    that.verifyDevice= function(){
        that.user.verifyDevice( that.user.delete );
    }
}

var test = new Test();

test.test();