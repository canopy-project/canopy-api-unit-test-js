'use strict'

var testUser = require('../testUser');

/*
    Test: Create one user-linked Device
*/

var Test = function(){
    var that = this;
    that.user = new testUser( __filename, '*** CREATE ONE USER-LINKED DEVICE ***' );
    that.test = function(){
        that.user.register( {}, that.login );
    }
    that.login = function(){
        that.user.usernameLogin( {}, that.createDevice );
    }
    that.createDevice = function(){
        that.user.createDevice( {}, that.user.delete );
    }
}

var test = new Test();

test.test();
