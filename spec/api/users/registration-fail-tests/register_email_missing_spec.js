'use strict'

var testUser = require('../../testUser');
var h = require('../../helper-functions');

/*
    Test: Create a test user with a missing email,
*/
  
var Test = function(){
    var that = this;

    that.user = new testUser( '** FAIL TEST: REGISTER USER WITH UNDEFINED EMAIL **' );
    that.test = function(){
        that.user.register( {
            email: { forceUndefined: true },
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