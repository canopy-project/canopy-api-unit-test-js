'use strict'

var testUser = require('../testUser');
var h = require('../helper-functions');

/*
    Test: Update Email using Basic Auth
*/

var Test = function(){
    var that = this;
    that.user = new testUser( __filename, '** BASIC AUTH UPDATE EMAIL **' );
    var newEmail = h.generateEmail();

    that.test = function(){
        that.user.register( {}, that.update );
    }
    
    that.update = function(){
        that.user.basicAuthUpdate( {
            "jsonBody" : {
                "email" : newEmail
            }
        }, that.verify );
    }

    that.verify = function(){
        that.user.basicAuthVerifySelf({
            expectJSON : {
                "email" : newEmail
            }
        }, that.user.basicAuthDelete ); 
    }
}

var test = new Test();

test.test();
