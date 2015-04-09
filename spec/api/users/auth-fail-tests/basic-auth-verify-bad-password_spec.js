'use strict'

var testUser = require('../../testUser');
var h = require('../../helper-functions');

/*
    Test: Attempt to authenticate using basic auth with bad password
*/

var Test = function(){
    var that = this;
    that.user = new testUser( __filename, '** BASIC AUTH BAD PASSWORD **' );

    that.test = function(){
        that.user.register( {}, that.login );
    }
    
    that.login = function(){
        that.user.basicAuthVerifySelf({
            authString: h.generateAuthString( that.user.username, h.generatePassword() ),
            expectStatus: 401,
            expectJSON: { 
                error_type: 'incorrect_username_or_password',
                result: 'error' 
            }                 
        }, that.delete );
    }

    that.delete = function(){
        that.user.basicAuthDelete( {} );
    }
}

var test = new Test();

test.test();
