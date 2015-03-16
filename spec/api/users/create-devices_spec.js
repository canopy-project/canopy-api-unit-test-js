'use strict'

var testUser = require('../testUser');

/*
    Test: Create Multiple User-Linked Devices
*/

var Test = function(){
    var that = this;
    that.username = undefined;
    that.email = undefined;
    that.password = undefined;
    that.expectStatus= undefined;  
    that.expectRegisterJSON = undefined;
    that.expectLoginJSON = undefined;
    that.user = new testUser( '** CREATE MULTIPLE USER-LINKED DEVICES **' );
    that.test = function(){
        that.user.register( that.username, that.email, that.password, that.expectStatus, that.expectRegisterJSON, false, that.login );
    }
    that.login = function(){
        that.user.usernameLogin( that.username, that.password, that.expectStatus, that.expectLoginJSON, that.createDevices );
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