'use strict'

var testUser = require('../testUser');
var h = require('../helper-functions');

/*
    Test: REGISTER WITH EXISTING USERNAME
*/

var Test = function(){
    var that = this;
    that.username = undefined;
    that.email = undefined;
    that.password = undefined;
    that.expectStatus= undefined;
    that.expectJSON = undefined;

    that.expectReRegisterStatus = 400;
    that.expectReRegisterJSON = { 
        error_type: 'username_not_available',
        result: 'error' 
    };
    that.user = new testUser( '** FAIL TEST: REGISTER WITH EXISTING USERNAME **' );
    that.test = function(){
        that.user.register( that.username, that.email, that.password, that.expectStatus, 
                            that.expectJSON, false, that.reRegister );
    }
    that.reRegister = function(){
        var existingUser = new testUser( '** FAIL TEST: REGISTER WITH EXISTING USERNAME **');
        existingUser.register( that.user.username, that.username, that.password, 
                                    that.expectReRegisterStatus, that.expectReRegisterJSON, 
                                    false, that.login)
    }
    that.login = function(){
        that.user.usernameLogin( that.username, that.password, that.expectStatus, that.expectJSON, that.verify );
    }
    that.verify = function(){
        that.user.verify( that.username, that.email, that.expectStatus, that.expectJSON, that.user.delete );
    }
}

var test = new Test();

test.test();