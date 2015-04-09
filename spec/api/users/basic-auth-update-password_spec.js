'use strict'

var testUser = require('../testUser');
var h = require('../helper-functions');

/*
    Test: Update Password using Basic Auth
*/

var Test = function(){
    var that = this;
    that.user = new testUser( __filename, '** BASIC AUTH UPDATE PASSWORD **' );

    that.test = function(){
        that.user.register( {}, that.update );
    }
    
    that.update = function(){
        that.user.basicAuthUpdate( {
            "jsonBody" : {
                "password" : h.generatePassword()
            }
        }, that.user.basicAuthDelete );
    }
}

var test = new Test();

test.test();
