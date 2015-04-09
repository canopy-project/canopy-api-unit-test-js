'use strict'

var testUser = require('../../testUser');
var h = require('../../helper-functions');

/*
    Test: Attempt to authenticate using basic auth with bad credentials
*/

var Test = function(){
    var that = this;
    that.user = new testUser( __filename, '** BASIC AUTH BAD CREDENTIALS **' );

    that.test = function(){
        that.user.register( {}, that.login );
    }
    
    that.login = function(){
        that.user.basicAuthLogin({
            authString: h.generateAuthString(h.generateUsername(), h.generatePassword() ),
            expectStatus: 401,
            expectJSON: { 
                error_type: 'permission_denied',
                result: 'error' 
            }                 
        }, that.delete );
    }

    that.delete = function(){
        that.user.basicAuthDelete();
    }
}

var test = new Test();

test.test();
