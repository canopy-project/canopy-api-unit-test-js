'use strict'

var testUser = require('../../testUser');

/*
    Test: Create a test user with username with weird characters
*/
  
var Test = function(){
    var that = this;
    that.user = new testUser( '** FAIL TEST: REGISTER USER WITH USERNAME THAT WITH WEIRD CHARACTERS **' );

    that.test = function(){
        that.user.register({
            username: '%$^#@&*(',
            expectStatus: 500,
            expectJSON:
            {
                error_msg: 'Problem Creating AccountInvalid characters in username',
                error_type: 'internal_error',
                result: 'error' 
            }
        });
    }
}

var test = new Test();

test.test();