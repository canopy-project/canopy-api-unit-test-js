'use strict'

var testUser = require('../../testUser');
var h = require('../../helper-functions');

/*
 *   Test: Create user with too long password
 */
  
var Test = function(){
    var that = this;
    that.user = new testUser( '** FAIL TEST: REGISTER USER WITH TOO LONG PASSWORD **' );
    // make a long password
    var longPassword = '';
    for(var i=0;i<10;i++){
        longPassword += h.generatePassword();
    }
    that.test = function(){
        that.user.register({
            password: longPassword,
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