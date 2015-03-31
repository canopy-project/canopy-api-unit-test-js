'use strict'

var testUser = require('../testUser');

/*
    Test: List User-Linked Devices
*/

var Test = function(){
    var that = this;

    that.user = new testUser( __filename, '** LIST USER-LINKED DEVICES **' );
    that.test = function(){
        that.user.register( {}, that.login );
    }
    that.login = function(){
        that.user.usernameLogin( {}, that.createDevices );
    }
    that.createDevices = function(){
        that.user.createDevices( {quantity: 2}, that.listDevices );
    }
    that.listDevices = function(){
        that.user.listDevices( that.user.delete );
    }
}

var test = new Test();

test.test();
