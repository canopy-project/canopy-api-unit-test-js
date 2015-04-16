'use strict'

var testUser = require('../testUser');

/*
    Test: Delete device using session auth
*/

var Test = function( ){
    var that = this;
    that.user = new testUser( __filename, '** DELETE DEVICE USING SESSION AUTH**' );
    that.test = function(){
        that.user.register( {}, that.login );
    }
    that.login = function(){
        that.user.usernameLogin( {}, that.createDevice );
    }
    that.createDevice = function(){
        that.user.createDevice( __filename, {}, that.verifyDevice );
    }
    that.verifyDevice= function(){
        that.user.sessionVerifyDevice( {}, that.deleteDevice ); 
    }
    that.deleteDevice = function(){
        // write sessionDeleteDevice
        that.user.sessionDeleteDevice( {}, that.deleteUser );
    }
    that.deleteUser = function(){
        that.user.delete();
    }
}

var test = new Test();

test.test();
