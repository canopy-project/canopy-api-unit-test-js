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