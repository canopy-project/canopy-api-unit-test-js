'use strict'

var testUser = require('../testUser');

/*
    Test: Verify User
*/

var Test = function(){
    var that = this;
    that.username = undefined;
    that.email = undefined;
    that.password = undefined;
    that.expectStatus= undefined;
    that.expectJSON = undefined;
    that.user = new testUser( '** VERIFY USER **' );
    that.test = function(){
        that.user.register( that.username, that.email, that.password, that.expectStatus, that.login );
    }
    that.login = function(){
        that.user.usernameLogin( that.username, that.password, that.expectStatus, that.expectJSON, that.verify );
    }
    that.verify = function(){
        that.user.verify( that.username, that.email, that.expectStatus, that.expectJSON, that.user.delete );
    }
}

var test = new Test();

test.test();