'use strict'

var testUser = require('../../testUser');
var h = require('../../helper-functions');

/*
    Test: Create a test user with username that starts with number
*/
  
var Test = function(){
    var that = this;
    that.user = new testUser( '** FAIL TEST: REGISTER USER WITH USERNAME THAT STARTS WITH NUMBER **' );
    
    that.test = function(){
        that.user.register({
            username: 9 + h.generateUsername(),
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