var frisby = require('frisby');

// 
var url = 'https://dev02.canopy.link/api/';

// Allow self-signed SSL certificates
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

frisby.create('POST account create')
  .post( url + 'create_account',
    { "username" : "newuser", "email" : "new@user.user",  "password" : "newuser" },
    { json: true },
    { headers: { "Content-Type":"application/json"}})
  .expectStatus(200)
  .toss();
