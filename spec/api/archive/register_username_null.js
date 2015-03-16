'use strict'

var testUser = require('../testUser');

/*
    Test: Create a test user with an Email that is null, expect to fail with 400 
*/
  
var Test = function(){
    var that = this;
    that.username = null;
    that.email = undefined;
    that.password = undefined;
    this.expectJSON = 
            { 
                error_type: 'internal_error',
                result: 'error' 
            }    
    that.expectStatus = 500;
    that.user = new testUser( 'Unit Test: Register Username that is Null' );
    that.test = function(){
        that.user.register( that.username, that.email, that.password, that.expectStatus);
    }
}

var test = new Test();

test.test();