'use strict'

var testUser = require('../testUser');

/*
    Test: Create one user-linked Device
*/

var Test = function(){
    var that = this;
    that.username = undefined;
    that.email = undefined;
    that.password = undefined;
    that.expectStatus = undefined;
    that.devicename = undefined;
    that.expectRegisterJSON = undefined;
    that.expectLoginJSON = undefined;
    that.user = new testUser( '*** CREATE ONE USER-LINKED DEVICE ***' );
    that.test = function(){
        that.user.register( that.username, that.email, that.password, that.expectStatus, that.expectRegisterJSON, false, that.login );
    }
    that.login = function(){
        that.user.usernameLogin( that.username, that.password, that.expectStatus, that.expectLoginJSON, that.createDevice );
    }
    that.createDevice = function(){
        that.user.createDevice( that.devicename, that.delete );
    }
    that.delete = function(){
        that.user.delete; 
    }
}

var test = new Test();

test.test();