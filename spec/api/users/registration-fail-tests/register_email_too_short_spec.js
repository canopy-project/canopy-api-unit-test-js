'use strict'

var testUser = require('../../testUser');

/*
    Test: Create a test user with a too short email
*/
  
var Test = function(){
    var that = this;
    that.user = new testUser( '** FAIL TEST: REGISTER WITH TOO SHORT EMAIL **' );
    that.test = function(){
        that.user.register({
            email: ' ',
            expectStatus: 500,
            expectJSON: 
                { 
                    error_type: 'internal_error',
                    result: 'error' 
                }
        });
    }
}

var test = new Test();

test.test();