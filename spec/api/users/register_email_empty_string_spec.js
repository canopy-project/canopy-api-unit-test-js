'use strict'

var testUser = require('../testUser');

/*
    Test: Create a test user, register, login, verifies self, then deletes self 
*/

var Test = function(){
    var that = this;
    that.username = undefined;
    that.email = '';
    that.password = undefined;
    that.expectStatus = 400;
    that.user = new testUser( 'Unit Test: Register User With Email That is an Empty String' );
    that.test = function(){
        that.user.register( that.username, that.email, that.password, that.expectStatus, that.login );
    }
    that.login = function(){
        that.user.usernameLogin( that.verify );
    }
    that.verify = function(){
        that.user.verify( that.user.delete );
    }
}

var test = new Test();

test.test();