'use strict'

var testUser = require('../testUser');

/*
    Test: Login User with Username
*/

var Test = function(){
    var that = this;
    that.user = new testUser( __filename, '** LOG IN WITH USERNAME **' );
    that.test = function(){
        that.user.register( {}, that.login );
    }
    that.login = function(){
        that.user.usernameLogin( {}, that.user.delete );
    }
}

var test = new Test();

test.test();
