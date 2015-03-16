'use strict'

var testUser = require('../testUser');

/*
    Test: Logout User
*/

var Test = function(){
    var that = this;
    that.username = undefined;
    that.email = undefined;
    that.password = undefined;
    that.expectStatus = undefined;
    that.expectJSON = undefined;
    that.user = new testUser( '** LOGOUT **' );
    that.test = function(){
        that.user.register( that.username, that.email, that.password, that.expectStatus, that.expectJSON, false, that.login );
    }
    that.login = function(){
        that.user.usernameLogin( that.username, that.password, that.expectStatus, that.expectJSON, that.user.logout );
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