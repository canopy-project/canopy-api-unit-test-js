'use strict'

var testUser = require('../testUser');

/*
    Test: Create a test user, register, login, and logout
*/

var Test = function(){
    var that = this;
    that.username = undefined;
    that.email = undefined;
    that.password = undefined;
    that.expectStatus= undefined;
    that.user = new testUser( 'Unit Test: Logout User' );
    that.test = function(){
        that.user.register( that.username, that.email, that.password, that.expectStatus, that.login );
    }
    that.login = function(){
        that.user.usernameLogin( that.user.logout );
    }
    that.logout = function(){
        that.user.logout( that.delete );
    }
    that.delete = function(){
        that.user.usernameLogin( that.user.delete );
    }
}

var test = new Test();

test.test();