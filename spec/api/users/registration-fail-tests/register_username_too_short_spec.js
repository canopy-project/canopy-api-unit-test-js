'use strict'

var testUser = require('../../testUser');

/*
    Test: Create a test user with a too short Username
*/
  
var Test = function(){
    var that = this;
    that.user = new testUser( '** FAIL TEST: REGISTER USER WITH TOO SHORT USERNAME **' );
    
    that.test = function(){
        that.user.register({
            username: 'abcd',
            expectStatus: 500,
            expectJSON:
                { 
                    error_msg: 'Problem Creating AccountUsername too short',
                    error_type: 'internal_error',
                    result: 'error' 
                }           
        });
    }
}

var test = new Test();

test.test();