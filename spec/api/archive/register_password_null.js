'use strict'

var testUser = require('../testUser');

/*
    Test: Create a test user with a Username, Email and Password 
    that are Empty Strings, expect to fail with 400 
*/
  
var Test = function(){
    var that = this;
    that.username = undefined;
    that.email = undefined;
    that.password = null;
    that.expectStatus = 500;
    that.user = new testUser( 'Unit Test: Register with Username, Email, and Password that are a Empty Strings' );
    that.test = function(){
        that.user.register( that.username, that.email, that.password, that.expectStatus );
    }
}

var test = new Test();

test.test();