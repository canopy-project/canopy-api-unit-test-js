'use strict'

var testUser = require('../testUser');

/*
    Test: Verify User using Basic Auth
*/

var Test = function(){
    var that = this;
    that.user = new testUser( '** BASIC AUTH VERIFY USER **' );

    that.test = function(){
        that.user.register( {}, that.basicAuthVerify );
    }
    
    that.basicAuthVerify = function(){
        that.user.basicAuthVerifySelf( that.user.basicAuthDelete );
    }
}

var test = new Test();

test.test();