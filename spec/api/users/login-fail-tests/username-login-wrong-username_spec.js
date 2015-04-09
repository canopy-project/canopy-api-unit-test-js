'use strict'

var testUser = require('../../testUser');
var h = require('../../helper-functions');
/*
    Test: Log in with wrong username
*/

var Test = function(){
    var that = this;
    that.user = new testUser( __filename, '** FAIL TEST: LOG IN WITH WRONG USERNAME **' );
    that.test = function(){
        that.user.register( {}, that.badLogin);
    }
    that.badLogin = function(){
        var badUser = new testUser( __filename, '** FAIL TEST: LOG IN WITH WRONG USERNAME **');
        badUser.usernameLogin( {
            // Use the test user's username to log into badUser's account. 
            // This function automatically uses the correct password
            username: that.user.username,
            expectStatus: 401,
            expectJSON: { error_type: 'incorrect_username_or_password',
                          result: 'error' }
        }, that.login);
    }
   that.login = function(){
        that.user.usernameLogin( {}, that.user.delete );
    }
}

var test = new Test();

test.test();
