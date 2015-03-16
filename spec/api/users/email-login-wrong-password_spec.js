'use strict'

var testUser = require('../testUser');
var h = require('../helper-functions');
/*
    Test: Log in with wrong password
*/

var Test = function(){
    var that = this;
    that.username = undefined;
    that.email = undefined;
    that.password = undefined;
    that.expectRegisterStatus = undefined;
    that.expectJSON = undefined;
    that.expectLoginErrorJSON = { 
        error_type: 'incorrect_username_or_password',
        result: 'error' 
    }
    that.differentLoginPassword = h.generatePassword();
    that.expectLoginStatus = 401;
    var expectJSON = 
    console.log('this: ' + this);
    that.user = new testUser( '** FAIL TEST: LOG IN WITH WRONG PASSWORD **' );
    that.test = function(){
        that.user.register( that.username, that.email, that.password, that.expectStatus, that.expectRegisterJSON, false, that.login );
    }
    that.badLogin = function(){
        that.user.emailLogin( that.user.email, that.differentLoginPassword, that.expectLoginStatus, expectLoginErrorJSON, that.login );
    }
    that.login = function(){
        that.user.emailLogin( that.user.email, that.user.password, that.expectStatus, that.expectJSON, that.user.delete );
    }    
}

var test = new Test();

test.test();