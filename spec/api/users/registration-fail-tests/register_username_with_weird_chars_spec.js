'use strict'

var testUser = require('../../testUser');

/*
    Test: Create a test user with username with weird characters
*/
  
var Test = function(){
    var that = this;
    that.username = '%$^#@&*(';
    that.email = undefined;
    that.password = undefined;
    that.expectStatus = 500;
    that.expectJSON = 
        {
            error_msg: 'Problem Creating AccountInvalid characters in username',
            error_type: 'internal_error',
            result: 'error' 
        }

    that.user = new testUser( '** FAIL TEST: REGISTER USER WITH USERNAME THAT WITH WEIRD CHARACTERS **' );
    that.test = function(){
        that.user.register( that.username, that.email, that.password, that.expectStatus, that.expectJSON, false );
    }
}

var test = new Test();

test.test();