'use strict'

var testUser = require('../testUser');

/*
    Test: Create a test user with a Password that is an Empty String, expect to fail with 400 
*/
  
var Test = function(){
    var that = this;
    that.username = undefined;
    that.email = undefined;
    that.password = '';
    that.expectStatus = 400;
    that.user = new testUser( 'Unit Test: Register Password that is an Empty String' );
    that.test = function(){
        that.user.register( that.username, that.email, that.password, that.expectStatus);
    }
}

var test = new Test();

test.test();