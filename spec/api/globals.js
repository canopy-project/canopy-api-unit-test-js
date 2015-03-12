'use strict'

//  Set url
var url = 'https://dev02.canopy.link/api/';

//  Allow self-signed SSL certificates
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

//  Initialize 'New User' credentials
var nNum = 130;

var nUsr = 'newuser' + nNum;
var nEmail = 'newuser' + nNum + '@user.user';
var nPW = 'newuser' + nNum;

//  Initialize 'Disposable User' credentials
var eNum = 8235;
var eUsr = 'disposableuser' + eNum;
var eEmail = 'disposableuser' + eNum + '@user.user';
var ePW = 'disposableuser' + eNum;
var basicUserAuth = 'Basic ' + new Buffer( eUsr + ':' + ePW ).toString("base64")

var userSelfEndpoint = 'user/self' // 'me'

module.exports.url = url;

module.exports.nUsr   = nUsr;
module.exports.nEmail = nEmail;
module.exports.nPW    = nPW;

module.exports.eUsr = eUsr;
module.exports.eEmail = eEmail;
module.exports.ePW = ePW;

module.exports.basicUserAuth = basicUserAuth;

module.exports.userSelfEndpoint = userSelfEndpoint;