'use strict'

var testUser = require('../testUser');
var h = require('../helper-functions');

/*
    Test: Add/Update cloud var of user-linked device with device basic auth
*/

var Test = function( ){
    var that = this;
    that.user = new testUser( '** UPDATE CLOUD VAR **' );
    that.test = function(){
        console.log( 'Registering' );
        that.user.register( {}, that.login );
    }
    that.login = function(){
        that.user.usernameLogin( {}, that.createDevice );
    }
    that.createDevice = function(){
        that.user.createDevice( {}, that.verifyDevice );
    }
    that.verifyDevice = function(){
        that.user.testDevice.basicAuthVerifySelf( that.updateCloudVariable );
    }
    that.updateCloudVariable = function(){
        that.user.testDevice.basicAuthUpdateCloudVariable( that.verifyUpdate );
    }
    that.verifyUpdate = function(){
        console.log('********Verifying Changes********');
        that.user.testDevice.basicAuthVerifySelf( that.delete );
    }
    that.delete = function(){
        that.user.usernameLogin( {}, that.user.delete )   
    }
}

var test = new Test();

test.test();