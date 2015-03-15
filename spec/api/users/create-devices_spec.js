'use strict'

var testUser = require('../testUser');

/*
    Test: Create a test user, register, login, verifies self, then deletes self 
*/

var Test = function(){
    var that = this;
    that.user = new testUser( 'Unit Test: Create Multiple User-Linked Devices ' );
    that.test = function(){
        that.user.register( that.login );
    }
    that.login = function(){
        that.user.usernameLogin( that.createDevices );
    }
    that.createDevices = function(){
        that.user.createDevices( 3, that.delete );
    }
    that.delete = function(){
        that.user.delete; 
    }
}

var test = new Test();

test.test();