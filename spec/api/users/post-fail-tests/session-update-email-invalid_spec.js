'use strict'

var testUser = require('../../testUser');
var h = require('../../helper-functions');
/*
 *   Test: Update Email using invalid email
 */

var Test = function(){
    var that = this;
    that.user = new testUser( __filename, '** FAIL TEST: UPDATE EMAIL WITH INVALID EMAIL USING SESSION AUTH **' );

    that.test = function(){
        that.user.register( {}, that.login);
    }
    that.login = function(){
        that.user.usernameLogin( {}, that.update );
    }
    that.update = function(){
        that.user.update( {
            "jsonBody" : {
                "email" : 'jalslffowowfw'                
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
