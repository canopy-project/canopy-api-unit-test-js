'use strict'

var testUser = require('../testUser');

/*
    Test: Create a test user with email too short, expect fail with 500
*/
  
var Test = function(){
    var that = this;
    that.username = undefined;
    that.email = ' ';
    that.password = undefined;
    that.expectStatus = 500;
    that.expectJSON = 
            { 
                error_type: 'internal_error',
                result: 'error' 
            }
    that.user = new testUser( 'Unit Test: Register with email that is too short' );
    that.test = function(){
        that.user.register( that.username, that.email, that.password, that.expectStatus );
    }
}

var test = new Test();

test.test();