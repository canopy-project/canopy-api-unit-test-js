'use strict'

var testUser = require('../testUser');

/*
    Test: Create a test user, register, login, verify self, then delete self 
*/

var Test = function(){
    var that = this;
    that.username = undefined;
    that.email = undefined;
    that.password = undefined;
    that.expectStatus= undefined;
    that.user = new testUser( 'Unit Test: User-Linked Device Bomb ' + i + ' ' );
    that.test = function(){
        that.user.register( that.username, that.email, that.password, that.expectStatus, that.login );
    }
    that.login = function(){
        that.user.usernameLogin( that.username, that.password, that.expectStatus, that.expectJSON, that.createDevices );
    }
    that.createDevices = function(){
        that.user.createDevices( 10, that.delete );
    }
    that.delete = function(){
        that.user.delete; 
    }
}

var test = new Test();

test.test();