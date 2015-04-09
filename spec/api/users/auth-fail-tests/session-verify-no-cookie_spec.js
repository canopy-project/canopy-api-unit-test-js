'use strict'

var testUser = require('../../testUser');
var h = require('../../helper-functions');

/*
 *   Test: Verify User using no cookie, expect to fail with 401, not_authenticated
 */

var Test = function(){
    var that = this;
    that.user = new testUser( __filename, '** VERIFY USER  USING NO COOKIE**' );

    that.test = function(){
        that.user.register( {}, that.login);
    }
    that.login = function(){
        that.user.usernameLogin( {}, that.verify );
    }
    that.verify = function(){
        that.user.verify( {
            "cookie": "canopy-login-session=BADCOOKIESADCOOKIENSeWFXNW5EQlFBRW14dloyZGxaRjlwYmw5MWMyVnlibUZ0WlFaemRISnBibWNNRGdBTWRYTmxjalEwTnpBME1qWTF8aH1x4sbLbYltZyUG6TS4dezRe6Ex7wB2dsSaaX7lAxA=",
            "expectStatus" : 401,
            "expectJSON": {
                "error_type": "not_authenticated"
            } 
        }, that.user.delete );
    }
}

var test = new Test();

test.test();
