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