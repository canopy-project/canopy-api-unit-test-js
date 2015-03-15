'use strict'

var Q = require('q');
var testUser = require('../testUser');

/*
    Test: Create a test user and login
*/
//
var user = testUser;
user.register(user.login);

function showBananas(){
    console.log('BANANASS');
}

function showMe(){
    console.log('THIS: ');
    console.dir(this);
}
