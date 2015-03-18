'use strict'

var testUser = require('../testUser');

/*
    Test: Logout User
*/

var Test = function(){
    var that = this;
    that.user = new testUser( '** LOGOUT **' );

    that.test = function(){
        that.user.register( {}, that.login );
    }
    that.login = function(){
        that.user.usernameLogin( {}, that.logout );
    }
    that.logout = function(){
        that.user.logout( that.loginAgain );
    }
    that.loginAgain = function(){
        that.user.usernameLogin( {}, that.user.delete );
    }
}

var test = new Test();

test.test();