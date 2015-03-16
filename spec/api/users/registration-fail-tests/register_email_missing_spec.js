'use strict'

var testUser = require('../../testUser');
var h = require('../../helper-functions');

/*
    Test: Create a test user with a missing email,
*/
  
var Test = function(){
    var that = this;
    that.username = h.generateUsername();
    that.email = undefined;
    that.password = h.generatePassword();
    that.expectStatus = 400;
    that.expectJSON = 
        { 
            error_msg: 'String "email" expected',
            error_type: 'bad_input',
            result: 'error' 
        }

    that.user = new testUser( '** FAIL TEST: REGISTER USER WITH UNDEFINED EMAIL **' );
    that.test = function(){
        that.user.register( that.username, that.email, that.password, that.expectStatus, that.expectJSON, true );
    }
}

var test = new Test();

test.test();