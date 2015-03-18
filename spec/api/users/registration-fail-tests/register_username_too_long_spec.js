'use strict'

var testUser = require('../../testUser');

/*
    Test: Create a test user with a too long Username
*/
  
var Test = function(){
    var that = this;
    that.user = new testUser( '** FAIL TEST: REGISTER USER WITH TOO LONG USERNAME **' );
    
    that.test = function(){
        that.user.register({
            username: 'abcdefghijklmnopqrstuvwxy',
            expectStatus: 500,
            expectJSON: 
                { 
                    error_msg: 'Problem Creating AccountUsername too long',
                    error_type: 'internal_error',
                    result: 'error' 
                }
        });
    }
}

var test = new Test();

test.test();