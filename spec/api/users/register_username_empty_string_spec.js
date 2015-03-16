'use strict'

var testUser = require('../testUser');

/*
    Test: Create a test user with an Email that is an empty string, expect to fail with 400 
*/
  
var Test = function(){
    var that = this;
    that.username = '';
    that.email = undefined;
    that.password = undefined;
    that.expectStatus = 400;
    that.user = new testUser( 'Unit Test: Register Email With Username that is an Empty String' );
    that.test = function(){
        that.user.register( that.username, that.email, that.password, that.expectStatus);
    }
}

var test = new Test();

test.test();