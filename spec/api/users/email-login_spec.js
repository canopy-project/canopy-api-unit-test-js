'use strict'

var testUser = require('../testUser');

/*
    Test: Login User with Email
*/

var Test = function(){
    var that = this;
    that.user = new testUser( __filename, '** LOG IN WITH EMAIL **' );
    that.test = function(){
        that.user.register( {}, that.login );
    }
    that.login = function(){
        that.user.emailLogin( {}, that.user.delete );
    }
}

var test = new Test();

test.test();
