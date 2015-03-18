'use strict'

var testUser = require('../testUser');
var h = require('../helper-functions');

/*
    Test: Update user-linked device properties with device basic auth
*/

var Test = function( ){
    var that = this;
    that.user = new testUser( '** UPDATE DEVICE PROPERTIES BASIC AUTH **' );
    that.test = function(){
        console.log('Registering');
        that.user.register( {}, that.login );
    }
    that.login = function(){
        that.user.usernameLogin( {}, that.createDevice );
    }
    that.createDevice = function(){
        that.user.createDevice( {}, that.verifyDevice);
    }
    that.verifyDevice = function(){
        that.user.testDevice.basicAuthVerifySelf( that.updateProperties );
    }
    that.updateProperties = function(){
        that.user.testDevice.basicAuthUpdateProperties( that.verifyUpdate );
    }
    that.verifyUpdate = function(){
        console.log( '********Verifying Changes********' );
        that.user.testDevice.basicAuthVerifySelf( that.delete );
    }
    that.delete = function(){
        that.user.usernameLogin( {}, that.user.delete )   
    }
}

var test = new Test();

test.test();