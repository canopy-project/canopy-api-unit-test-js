'use strict'

var testUser = require('../../testUser');
var h = require('../../helper-functions');
/*
 *   Test: Attempt to log in without a username
 */

var Test = function(){
    var that = this;
    that.user = new testUser( __filename, '** FAIL TEST: USERNAME MISSING RETURNS 400, BAD_INPUT **' );
    that.test = function(){
        that.user.register( {}, that.badLogin );
    }
    that.badLogin = function(){
       that.user.usernameLogin({
       // Pass in an empty string as username
          username: '',
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