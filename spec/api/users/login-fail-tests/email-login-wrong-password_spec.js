'use strict'

var testUser = require('../../testUser');
var h = require('../../helper-functions');
/*
    Test: Log in with wrong password
*/

var Test = function(){
    var that = this;
    that.user = new testUser( '** FAIL TEST: LOG IN WITH WRONG PASSWORD **' );
    that.test = function(){
        that.user.register( {}, that.badLogin);
    }
    that.badLogin = function(){
        var badUser = new testUser( '** FAIL TEST: LOG IN WITH WRONG PASSWORD **');
        badUser.usernameLogin( {
            email: that.user.email,
            expectStatus: 401,
            expectJSON: { error_type: 'incorrect_username_or_password',
                          result: 'error' }
        }, that.login);
    }
   that.login = function(){
        that.user.emailLogin( {}, that.user.delete );
    }
}

var test = new Test();

test.test();