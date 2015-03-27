'use strict'

var testUser = require('../../testUser');

/*
    Test: Create a test user with a missing username
*/
  
var Test = function(){
    var that = this;
    that.user = new testUser( '** FAIL TEST: REGISTER USER WITH UNDEFINED USERNAME **' );
    that.test = function(){
        that.user.register({
            username: { forceUndefined: true },
            expectStatus: 400,
            expectJSON:
                { 
                    error_type: 'bad_input',
                    result: 'error' 
                }
        });
    }
}

var test = new Test();

test.test();