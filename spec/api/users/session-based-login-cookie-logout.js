'use strict'

var frisby = require('frisby');
var g = require('../globals');

/*
  Test: Session-based AUTH 
*/

/* 
  Session-based AUTH is for users only

  Endpoints: 
        Session-based AUTH Login POST to: /api/login
        Session-based AUTH Logout POST to: /api/logout
    
  Implementation:
    1) Log in to existing user account,
    2) Verify that a cookie is provided,
    3) Logout
*/

// Expect 'login' to return 200 and json:
// {"result" : "ok","username" : <USERNAME>,"email" : <EMAIL>}
frisby.create('auth/session-based-login-cookie-logout_spec: Session-based AUTH: POST user api/login, verify cookie provided,  and POST user api/logout')
  .post( g.url + 'login',
   { "username" : g.eUsr, "email" : g.eEmail,  "password" : g.ePW },
   { json: true },
   { headers: { "Content-Type":"application/json"}})
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .inspectJSON()
  .expectJSON({
      "result" : "ok",
      "username" : g.eUsr,
      "email" : g.eEmail
    })
  .after(function(body, res){
    //  Expect cookie to be provided  
    //  console.log(res.headers); 
    var cookie = res.headers['set-cookie'][0].split(';')[0];
    //  console.log(cookie);
    describe('verify cookie', function(){
    it('should not be null', function(){
       expect( cookie ).toBeDefined();
    });
  });  
    
  })
  .after(function(err, res, body){
    // Expect POST to logout to return json {"result":"ok"} 
    frisby.create('auth/session-based-login-cookie-logout_spec: POST /api/logout')
      .post( g.url + 'logout' )
      .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON({
      "result" : "ok"
    })
  })
.toss()
