'use strict'

var Q = require('q');
var testUser = require('../testUser');

/*
    Test: Create a test user
*/
// Initialize user creates a user, logs it in, verifies it, and returns a cookie
// You can then use that cookie for the remainder of your session requests

return Q.when(testUser.createUser(), function () {
    }, function (error) {
});



  