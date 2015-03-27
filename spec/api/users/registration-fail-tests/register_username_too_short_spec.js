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