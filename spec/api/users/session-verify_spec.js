'use strict'

var testUser = require('../testUser');

/*
    Test: Verify User
*/

var Test = function(){
    var that = this;
    that.user = new testUser( __filename, '** VERIFY USER **' );

    that.test = function(){
        that.user.register( {}, that.login);
    }
    that.login = function(){
        that.user.usernameLogin( {}, that.verify );
    }
    that.verify = function(){
        that.user.verify( {}, that.user.delete );
    }
}

var test = new Test();

test.test();
