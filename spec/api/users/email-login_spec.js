'use strict'

var testUser = require('../testUser');

/*
    Test: Create a test user, register, login, and logout
*/

var Test = function(){
    var that = this;
    that.user = new testUser();
    that.test = function(){
        that.user.register( that.login );
    }
    that.login = function(){
        that.user.emailLogin( that.user.delete );
    }
}

var test = new Test();

test.test();