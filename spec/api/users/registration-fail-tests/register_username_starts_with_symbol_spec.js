'use strict'

var testUser = require('../../testUser');
var h = require('../../helper-functions');

/*
 *   Test: Create a test user with username that starts with a symbol
 */
  
var Test = function(){
    var that = this;
    that.user = new testUser( '** FAIL TEST: REGISTER USERNAME THAT STARTS WITH A SYMBOL **' );

    that.test = function(){
        that.user.register({
            username: '_' + h.generateUsername(),
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