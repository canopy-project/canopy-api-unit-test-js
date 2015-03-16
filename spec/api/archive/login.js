'use strict'

var Q = require('q');
var testUser = require('../testUser');

/*
    Test: Create a test user, register and login
*/
//

var Test = function(){
    var that = this;
    that.user = new testUser();
    that.test = function(){
        that.user.register( that.user.login );
    }
}

var test = new Test();

test.test();