'use strict'

var Q = require('q');
var testUser = require('../testUser');

/*
    Test: Create a test user, register and login
*/
//
var user = testUser;
user.register( user.login );