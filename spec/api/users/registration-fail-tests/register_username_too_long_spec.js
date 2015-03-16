'use strict'

var testUser = require('../../testUser');

/*
    Test: Create a test user with a too long Username
*/
  
var Test = function(){
    var that = this;
    that.username = 'aaaaaaaaaaaaaaaaaaaaaaaaa';
    that.email = undefined;
    that.password = undefined;
    that.expectStatus = 500;
    that.expectJSON = 
            { 
                error_msg: 'Problem Creating AccountUsername too long',
                error_type: 'internal_error',
                result: 'error' 
            }
    that.user = new testUser( '** FAIL TEST: REGISTER USER WITH TOO LONG USERNAME **' );
    that.test = function(){
        that.user.register( that.username, that.email, that.password, that.expectStatus, that.expectJSON, false );
    }
}

var test = new Test();

test.test();