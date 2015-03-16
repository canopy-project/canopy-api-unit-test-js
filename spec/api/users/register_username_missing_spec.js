'use strict'

var testUser = require('../testUser');

/*
    Test: Create a test user with a missing username,
    expect fail with 500
*/
  
var Test = function(){
    var that = this;
    that.username = undefined;
    that.email = undefined;
    that.password = undefined;
    that.expectStatus = 400;
    that.expectJSON = 
        { 
            error_msg: 'String "username" expected',
            error_type: 'bad_input',
            result: 'error' 
        }

    that.user = new testUser( '** FAIL TEST: REGISTER USER WITH UNDEFINED USERNAME **' );
    that.test = function(){
        that.user.register( that.username, that.email, that.password, that.expectStatus, that.expectJSON, true );
    }
}

var test = new Test();

test.test();