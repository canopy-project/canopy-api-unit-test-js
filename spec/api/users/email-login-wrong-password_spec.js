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
    that.expectStatus = undefined;
    that.expectJSON = undefined;

    var password = h.generatePassword();
    var expectStatus = 401;
    var expectJSON = { 
        error_type: 'incorrect_username_or_password',
        result: 'error' 
    }
    console.log('this: ' + this);
    that.user = new testUser( '** FAIL TEST: LOG IN WITH WRONG PASSWORD **' );
    that.test = function(){
        that.user.register( that.username, that.email, that.password, that.expectStatus, that.login );
    }
    that.badLogin = function(){
        that.user.emailLogin( that.user.email, password, expectStatus, expectJSON, that.login );
    }
    that.login = function(){
        that.user.emailLogin( that.user.email, that.user.password, that.expectStatus, that.expectJSON, that.user.delete );
    }    
}

var test = new Test();

test.test();