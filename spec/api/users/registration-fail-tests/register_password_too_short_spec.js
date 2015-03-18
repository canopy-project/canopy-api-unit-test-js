'use strict'

var testUser = require('../../testUser');

/*
    Test: Create user with too short password
*/
  
var Test = function(){
    var that = this;
    that.user = new testUser( '** FAIL TEST: CREATE USER WITH TOO SHORT PASSWORD **' );
    that.test = function(){
        that.user.register({
            password: ' ',
            expectStatus: 500,
            expectJSON:
                {   
                    error_msg: 'Problem Creating AccountPassword too short',
                    error_type: 'internal_error',
                    result: 'error' 
                }
        });
    }
}

var test = new Test();

test.test();