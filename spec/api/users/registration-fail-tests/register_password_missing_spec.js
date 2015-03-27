'use strict'

var testUser = require('../../testUser');
var h = require('../../helper-functions');

/*
    Test: Create a test user with a missing password
*/
  
var Test = function(){
    var that = this;
    that.user = new testUser( '** FAIL TEST: REGISTER USER WITH UNDEFINED PASSWORD **' );
    that.test = function(){
        that.user.register( {
            password: { forceUndefined: true },
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