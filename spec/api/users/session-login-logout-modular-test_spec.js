'use strict'

var frisby = require('frisby');
var g = require('../globals');
var Q = require('q');
var f = require('../functions');
/*
    Test: Session-Based Login/Logout
*/

//  Expect g.createUser to return 200 if username and
//  email are unique

//  Initialize 'Disposable User' credentials
var dNum = 22224;
var dUsr = 'disposableuser' + dNum;
var dEmail = 'disposableuser' + dNum + '@user.user';
var dPW = 'disposableuser' + dNum;
console.log('g.createUser: ' + g.createUser);
console.log('g.url: ' + g.url);
var cookie = null;

f.initUser()
  .when( console.log('loggin'))
  .when( f.deleteUser() )
  .fail(function(err){
      log('error', 'something broke', err);
      cb(err);
  })



  