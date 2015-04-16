'use strict'

var testUser = require('../../testUser');
var h = require('../../helper-functions');
/*
 *   Test: Update Password using too-long password using session auth
 */

var Test = function(){
    var that = this;
    var longPassword = '';
    for(var i=0;i<10;i++){
        longPassword += h.generatePassword();
    }    
    that.user = new testUser( __filename, '** UPDATE PASSWORD WITH TOO LONG PASSWORD USING SESSION AUTH **' );

    that.test = function(){
        that.user.register( {}, that.login);
    }
    that.login = function(){
        that.user.usernameLogin( {}, that.update );
    }
    that.update = function(){
        that.user.update( {
            "jsonBody" : {
                "password" : longPassword                
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
