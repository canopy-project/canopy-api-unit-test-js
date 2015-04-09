'use strict'

var testUser = require('../testUser');
var h = require('../helper-functions');
/*
 *   Test: Update Email using session auth
 */

var Test = function(){
    var that = this;
    that.user = new testUser( __filename, '** UPDATE EMAIL WITH SESSION AUTH **' );

    that.test = function(){
        that.user.register( {}, that.login);
    }
    that.login = function(){
        that.user.usernameLogin( {}, that.update );
    }
    that.update = function(){
        that.user.update( {
            "jsonBody" : {
                "email" : h.generateEmail()
            }
        }, that.user.delete );
    }
}

var test = new Test();

test.test();
