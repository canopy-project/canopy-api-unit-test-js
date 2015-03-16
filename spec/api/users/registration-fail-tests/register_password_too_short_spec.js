'use strict'

var testUser = require('../../testUser');

/*
    Test: Create user with too short password
*/
  
var Test = function(){
    var that = this;
    that.username = undefined;
    that.email = undefined;
    that.password = ' ';
    that.expectStatus = 500;
    that.expectJSON = 
            {   error_msg: 'Problem Creating AccountPassword too short',
                error_type: 'internal_error',
                result: 'error' 
            }
    that.user = new testUser( '** FAIL TEST: CREATE USER WITH TOO SHORT PASSWORD **' );
    that.test = function(){
        that.user.register( that.username, that.email, that.password, that.expectStatus, that.expectJSON, false );
    }
}

var test = new Test();

test.test();