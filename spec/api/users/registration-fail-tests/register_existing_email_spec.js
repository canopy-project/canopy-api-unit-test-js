'use strict'

var testUser = require('../../testUser');
var h = require('../../helper-functions');

/*
    Test: REGISTER WITH EXISTING EMAIL
*/

var Test = function(){
    var that = this;
    that.user = new testUser( '** FAIL TEST: REGISTER WITH EXISTING EMAIL **' );
    
    that.test = function(){
        that.user.register( {}, that.reRegister );
    }
    that.reRegister = function(){
        var existingUser = new testUser( '** FAIL TEST: REGISTER WITH EXISTING EMAIL **');
        existingUser.register( {
            email: that.user.email,
            expectStatus: 400,
            expectJSON:
                { 
                    error_type: 'email_taken',
                    result: 'error' 
                }
        }, that.login)
    }
    that.login = function(){
        that.user.usernameLogin( {}, that.user.delete );
    }
}

var test = new Test();

test.test();