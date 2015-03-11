'use strict'

var frisby = require('frisby');

//  Set url
var url = 'https://dev02.canopy.link/api/';

//  Allow self-signed SSL certificates
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

//  Initialize 'Existing User' credentials
var eUsr = 'exists';
var eUsrEmail = 'exists@user.user';
var eUsrPW = 'exists'

//  Initialize 'Existing Device' credentials
var eDevUUID;
var eDevSecretKey;

/*
	Test: Session-based AUTH 
*/

/* 
	Session-based AUTH is for users only

	Endpoints: 
				Session-based AUTH Login: /api/login
				Session-based AUTH Logout: /api/logout
		
	Implementation:
		1) Log in to existing user account,
		2) Verify that a cookie is provided,
		3) Logout
*/

// Expect 'login' to return 200 and json:
// {"result" : "ok","username" : <USERNAME>,"email" : <EMAIL>}
frisby.create('POST user login')
  .post( url + 'login',
   { "username" : eUsr, "email" : eUsrEmail,  "password" : eUsrPW },
   { json: true },
   { headers: { "Content-Type":"application/json"}})
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .inspectJSON()
  .expectJSON({
  		"result" : "ok",
  		"username" : eUsr,
  		"email" : eUsrEmail
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
		it('should be 197 chars', function(){
		  expect( cookie.length ).toEqual(197);
		})
	});  
  	
  })
  .after(function(err, res, body){
  	// Expect POST to logout to return json {"result":"ok"}	
  	frisby.create('POST /api/logout')
  	  .post( url + 'logout' )
  	  .expectStatus(200)
	  .expectHeaderContains('content-type', 'application/json')
	  .expectJSON({
	  	"result" : "ok"
	  })
  })
.toss()

/*
	Test: BASIC AUTH for Users
*/

frisby.create('BASIC AUTH user POST login ')
  .post( url + 'login' ,
    { headers: {"Content-Type":"application/json", 
                "Authorization": "basic" 
                  + new Buffer( eUsr + ':' + eUsrPW ).toString("base64")
              }})
  .expectStatus(200)
  .toss()

/*
  Test: BASIC AUTH for Devices
*/

frisby.create('BASIC AUTH device POST login ')
  .post( url + 'login' ,
    { headers: {"Content-Type":"application/json", 
                "Authorization": "basic" 
                  + new Buffer( eUsr + ':' + eUsrPW ).toString("base64")
              }})
  .expectStatus(200)
  .toss()