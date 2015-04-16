'use strict'

var testUser = require('../../testUser');
var h = require('../../helper-functions');
/*
 *   Test: Update Email using existing email
 */

var Test = function(){
    var that = this;
    that.user = new testUser( __filename, '** FAIL TEST: UPDATE EMAIL WITH EXISTING EMAIL USING SESSION AUTH **' );
    that.otherUser = new testUser( __filename, '** FAIL TEST: UPDATE EMAIL WITH EXISTING EMAIL USING SESSION AUTH **');
    that.test = function(){
        that.user.register( {}, that.registerOtherUser );
    }
    that.registerOtherUser = function(){
        that.otherUser.register( {}, that.login );
    }
    that.login = function(){
        that.user.usernameLogin( {}, that.update );
    }
    that.update = function(){
        that.user.update( {
            "jsonBody" : {
                "email" : that.otherUser.email
            },
            "expectJSON" : {
                "error_type": "bad_input",
                "result": 'error'              
            },
            "expectStatus": 400
        }, that.user.delete );
    }
}

var test = new Test();

test.test();
