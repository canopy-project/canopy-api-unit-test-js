'use strict'

var testUser = require('../../testUser');
var h = require('../../helper-functions');

/*
    Test: Verify user-linked device with bad device basic auth credentials
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
        that.user.testDevice.basicAuthVerifySelf({ 
            expectStatus: 401,
            headers: {
                "Content-Type": "application/json",
                "Authorization" : h.generateAuthString( h.generateUsername(), h.generatePassword() )
            }
        }, that.delete );
    }
    that.delete = function(){
        that.user.usernameLogin( {}, that.user.delete );
    }
}

var test = new Test();

test.test();