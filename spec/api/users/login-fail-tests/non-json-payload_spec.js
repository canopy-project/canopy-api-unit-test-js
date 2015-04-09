'use strict'

var testUser = require('../../testUser');
var h = require('../../helper-functions');
/*
    Test: Non-JSON payload returns 500 w/bad_input error
*/

var Test = function(){
    var that = this;
    that.user = new testUser( __filename, '** FAIL TEST: NON-JSON PAYLOAD RETURNS 500 **' );
    that.test = function(){
        that.user.register( {}, that.badLogin );
    }
    that.badLogin = function(){
       // Attempt to pass an array into the postJSON function
       that.user.usernameLogin({
          jsonBody: [],
          expectStatus: 400,
          expectJSON: { 
              error_type: 'bad_input',
              result: 'error' 
          }
        }, that.login )   
    }
    that.login = function(){
        that.user.usernameLogin( {}, that.user.delete );
    }
}

var test = new Test();

test.test();