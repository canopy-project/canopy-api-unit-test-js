'use strict'

var testUser = require('../testUser');

/*
    Test: Verify user-linked device with session auth
*/

var Test = function( ){
    var that = this;
    that.user = new testUser( __filename, '** VERIFY USER-LINKED DEVICE **' );
    that.test = function(){
        that.user.register( {}, that.login );
    }
    that.login = function(){
        that.user.usernameLogin( {}, that.createDevice );
    }
    that.createDevice = function(){
        that.user.createDevice( {}, that.verifyDevice );
    }
    that.verifyDevice= function(){
        that.user.sessionVerifyDevice( that.user.delete );
    }
}

var test = new Test();

test.test();
