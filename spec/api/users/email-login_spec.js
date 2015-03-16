'use strict'

var testUser = require('../testUser');

/*
    Test: Login User with Email
*/

var Test = function(){
    var that = this;
    that.username = undefined;
    that.email = undefined;
    that.password = undefined;
    that.expectStatus= undefined;
    that.expectJSON = undefined;
    that.user = new testUser( '** LOG IN WITH EMAIL **' );
    that.test = function(){
        that.user.register( that.username, that.email, that.password, that.expectStatus, that.login );
    }
    that.login = function(){
        that.user.emailLogin( that.user.email, that.user.password, that.expectStatus, that.expectJSON, that.user.delete );
    }
}

var test = new Test();

test.test();