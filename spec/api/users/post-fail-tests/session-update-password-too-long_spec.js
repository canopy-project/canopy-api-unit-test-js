'use strict'

var testUser = require('../../testUser');
var h = require('../../helper-functions');
/*
 *   Test: Update Password using too-long password using session auth
 */

var Test = function(){
    var that = this;
    var goodPassword = '';
    var newPassword = '';
    for(var i=0;i<10;i++){
        newPassword += h.generatePassword();
    }    
    that.user = new testUser( __filename, '** UPDATE PASSWORD WITH TOO LONG PASSWORD USING SESSION AUTH **' );

    that.test = function(){
        that.user.register( {}, that.login);
    }
    that.login = function(){
        that.user.usernameLogin( {}, that.update );
    }
    that.update = function(){
        // store the good password to use later
        goodPassword = that.user.password;

        that.user.update( {
            "jsonBody" : {
                "password" : newPassword                
            },
            "expectJSON" : {
                "error_type": "bad_input",
                "result": 'error'              
            },
            "expectStatus": 400
        }, that.logout );
    }

    that.logout = function(){
        console.log(' logging out');
        that.user.logout( that.failLogin );
    }

    that.failLogin = function(){
        console.log('attempting to log in with bad pw')
        that.user.usernameLogin( {
            "password" : newPassword,
            "expectStatus" : 401
        }, that.delete );
    }

    that.delete = function(){
        that.user.usernameLogin({
            "password": goodPassword
        }, that.user.delete);
    }

}

var test = new Test();

test.test();
