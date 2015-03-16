'use strict'

var testUser = require('../testUser');

/*
    Test: Create a test user with a too short Username,
    expect fail with 500
*/
  
var Test = function(){
    var that = this;
    that.username = ' ';
    that.email = undefined;
    that.password = undefined;
    that.expectStatus = 500;
    that.expectJSON = 
            { 
                error_msg: 'Problem Creating AccountUsername too short',
                error_type: 'internal_error',
                result: 'error' 
            }
    that.user = new testUser( 'Unit Test: Register with Username, Email, and Password that are a Empty Strings' );
    that.test = function(){
        that.user.register( that.username, that.email, that.password, that.expectStatus );
    }
}

var test = new Test();

test.test();