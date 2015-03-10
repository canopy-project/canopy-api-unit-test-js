var frisby = require('frisby');

// 
var url = 'https://dev02.canopy.link/api/';

// Allow self-signed SSL certificates
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// Initialize 'New User' credentials

var newUserUN = 'newuser2';
var newUserEmail = 'newuser2@user.user';
var newUserPW = 'newuser2';

// Expect 'create_account' to return 200 if username and
// email are unique

frisby.create('POST account create')
  .post( url + 'create_account',
    { "username" : newUserUN, "email" : newUserEmail,  "password" : newUserPW },
    { json: true },
    { headers: { "Content-Type":"application/json"}})
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .toss();

// Expect 'create_account' to fail with 400 if username and email
// already exists

frisby.create('POST account create')
  .post( url + 'create_account',
    { "username" : newUserUN, "email" : newUserEmail,  "password" : newUserPW },
    { json: true },
    { headers: { "Content-Type":"application/json"}})
  .expectStatus(400)
  .expectHeaderContains('content-type', 'application/json')
  .toss();

