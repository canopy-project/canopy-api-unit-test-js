'use strict'

var testUser = require('../../testUser');
var h = require('../../helper-functions');

/*
    Test: REGISTER WITH EXISTING USERNAME
*/

var Test = function(){
    var that = this;
    that.user = new testUser( '** FAIL TEST: REGISTER WITH EXISTING USERNAME **' );
    
    that.test = function(){
        that.user.register( {}, that.reRegister );
    }
    that.reRegister = function(){
        var existingUser = new testUser( '** FAIL TEST: REGISTER WITH EXISTING USERNAME **');
        existingUser.register( {
            username: that.user.username,
            expectStatus: 400,
            expectJSON:
                { 
                    error_type: 'username_not_available',
                    result: 'error' 
                }
        }, that.login)
    }
    that.login = function(){
        that.user.usernameLogin({}, that.user.delete);
    }
}

var test = new Test();

test.test();