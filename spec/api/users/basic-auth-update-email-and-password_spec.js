'use strict'

var testUser = require('../testUser');
var h = require('../helper-functions');

/*
 *   Test: Update Email and Password using Basic Auth
 */

var Test = function(){
    var that = this;
    var newEmail = h.generateEmail();
    var newPassword = h.generatePassword();
    that.user = new testUser( __filename, '** BASIC AUTH UPDATE EMAIL & Password**' );

    that.test = function(){
        that.user.register( {}, that.update );
    }
    
    that.update = function(){
        that.user.basicAuthUpdate( {
            "jsonBody" : {
                "email" : newEmail,
                "password" : newPassword
            }
        }, that.verify );
    }

    that.verify = function(){
        that.user.basicAuthVerify({
            "expectJSON" : {
                "email" : newEmail,
                "password" : newPassword
            } 
        }, that.user.basicAuthDelete);
    }
}

var test = new Test();

test.test();
