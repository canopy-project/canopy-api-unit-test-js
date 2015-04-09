'use strict'

var testUser = require('../testUser');
var h = require('../helper-functions');

/*
    Test: Update Email using Basic Auth
*/

var Test = function(){
    var that = this;
    that.user = new testUser( __filename, '** BASIC AUTH UPDATE EMAIL **' );

    that.test = function(){
        that.user.register( {}, that.update );
    }
    
    that.update = function(){
        that.user.basicAuthUpdate( {
            "jsonBody" : {
                "email" : h.generateEmail()
            }
        }, that.user.basicAuthDelete );
    }
}

var test = new Test();

test.test();
