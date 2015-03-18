'use strict'

var testUser = require('../testUser');

/*
    Test: Create Multiple User-Linked Devices
*/

var Test = function(){
    var that = this;

    that.user = new testUser( '** CREATE MULTIPLE USER-LINKED DEVICES **' );
    that.test = function(){
        that.user.register( {}, that.login );
    }
    that.login = function(){
        that.user.usernameLogin( {}, that.createDevices );
    }
    that.createDevices = function(){
        that.user.createDevices( {}, that.user.delete );
    }
}

var test = new Test();

test.test();