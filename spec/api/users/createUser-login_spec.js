'use strict'

var Q = require('q');
var testUser = require('../testUser');

/*
    Test: Create a test user
*/
// Initialize user creates a user, logs it in, verifies it, and returns a cookie
// You can then use that cookie for the remainder of your session requests

function test(callback){
    var user = testUser;
    Q.when(user.register(),
        function(value){
            console.log(value);
      }).then(user.login(),
            function(value){
              console.log(value);
            }
      );

};

test();

