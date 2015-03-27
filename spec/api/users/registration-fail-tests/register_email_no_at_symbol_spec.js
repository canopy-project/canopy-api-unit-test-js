'use strict'

var testUser = require('../../testUser');

/*
    Test: Create a test user with an email w/o an @ symbol
*/

var Test = function(){
    var that = this;
    that.user = new testUser( '** FAIL TEST: REGISTER WITH EMAIL W/0 "@" SYMBOL **' );
    that.test = function(){
        that.user.register({
            email: 'idonthaveanATsymbol',
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