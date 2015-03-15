'use strict'

var Q = require('q');
var testUser = require('../testUser');

/*
    Test: Create a test user and register
*/

var Test = function(){
    var that = this;
    that.user = new testUser();
    that.test = function(){
        var user = new testUser();
        user.register( );
    }
}

var test = new Test();

test.test();