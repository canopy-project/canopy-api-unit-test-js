'use strict'

var testUser = require('../../testUser');

/*
    Test: Create a test user with an email w/o an @ symbol, expect to fail with 500
*/

var Test = function(){
    var that = this;
    that.username = undefined;
    that.email = 'idonthaveanATsymbol';
    that.password = undefined;
    that.expectStatus = 500;
    that.expectJSON = 
            { 
                error_type: 'internal_error',
                result: 'error' 
            }    
    that.user = new testUser( '** FAIL TEST: REGISTER WITH EMAIL W/0 "@" SYMBOL **' );
    that.test = function(){
        that.user.register( that.username, that.email, that.password, that.expectStatus, that.expectJSON, false);
    }
}

var test = new Test();

test.test();