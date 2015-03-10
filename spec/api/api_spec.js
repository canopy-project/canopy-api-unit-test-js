var frisby = require('frisby');
var host = 'https://dev02.canopy.link/api/';

frisby.create('POST account create')
  .post(host + 'create_account',
    { "username" : "newuser", "email" : "new@user.user",  "password" : "newuser" },
    { json: true },
    { headers: { "Content-Type":"application/json"}})
  .expectStatus(200)
  .toss();
