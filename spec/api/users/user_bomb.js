'use strict'

var testUser = require('../testUser');

/*
    Test: Create a test user, register, login, verifies self, then deletes self 
*/

var Test = function(){
    var that = this;
    that.user = new testUser( 'Unit Test: User Bomb ' );
    that.test = function(){
        that.user.register( that.login );
    }
    that.login = function(){
        that.user.usernameLogin( that.verify );
    }
    that.verify = function(){
        that.user.verify( that.user.delete );
    }
}
for(var i=0;i<10;i++){
    var test = new Test();
    test.test();
}