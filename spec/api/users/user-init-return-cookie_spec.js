'use strict'

var frisby = require('frisby');
var Q = require('q');
/*var f = require('../functions');*/
var testUser = require('../testUser');
/*
    Test: Initialize User, Delete User
*/
// Initialize user creates a user, logs it in, verifies it, and returns a cookie
// You can then use that cookie for the remainder of your session requests

return Q.when(testUser.initUser(), function (cookie) {

    console.log("cookie: " + cookie);

}, function (error) {
});



  