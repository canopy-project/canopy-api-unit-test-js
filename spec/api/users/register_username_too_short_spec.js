'use strict'

var testUser = require('../testUser');

/*
    Test: Create a test user with a too short Username
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
    that.user = new testUser( '** FAIL TEST: REGISTER USER WITH TOO SHORT USERNAME **' );
    that.test = function(){
        that.user.register( that.username, that.email, that.password, that.expectStatus, that.expectJSON, false );
    }
}

var test = new Test();

test.test();