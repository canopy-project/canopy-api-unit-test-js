'use strict'

var testUser = require('../../testUser');
var h = require('../../helper-functions');
/*
 *   Test: Update Password using too-short password using session auth
 */

var Test = function(){
    var that = this;
    that.user = new testUser( __filename, '** UPDATE PASSWORD WITH TOO SHORT PASSWORD USING SESSION AUTH **' );
    var newPassword = 'lol';

    that.test = function(){
        console.log('registering');
        that.user.register( {}, that.login);
    }

    that.login = function(){
        console.log(' logging in');
        that.user.usernameLogin( {}, that.update );
    }

    that.update = function(){
        console.log('updating');
        that.user.update( {
            "jsonBody" : {
                "password" : newPassword                
            },
            "expectJSON" : {
                "error_type": "bad_input",
                "result": 'error'              
            },
            "expectStatus": 400
        }, that.logout);
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
        that.user.usernameLogin({}, that.user.delete);
    }

}

var test = new Test();

test.test();
