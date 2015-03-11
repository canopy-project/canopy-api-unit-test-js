'use strict'

//  Set url
var url = 'https://dev02.canopy.link/api/';

//  Allow self-signed SSL certificates
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

//  Initialize 'New User' credentials
var nNum = 129;

var nUsr = 'newuser' + nNum;
var nEmail = 'newuser' + nNum + '@user.user';
var nPW = 'newuser' + nNum;

//  Initialize 'Existing User' credentials
var eUsr = 'newuser' + (nNum - 1) ;
var eEmail = 'newuser' + (nNum - 1) + '@user.user';
var ePW = 'newuser' + (nNum - 1);

//  Initialize 'Disposable User' credentials
var dUsr = 'disposableuser' + nNum;
var dEmail = 'disposableuser' + nNum + '@user.user';
var dPW = 'disposableuser' + nNum;

module.exports.url = url;

module.exports.eUsr   = eUsr;
module.exports.eEmail = eEmail;
module.exports.ePW    = ePW;

module.exports.nUsr   = nUsr;
module.exports.nEmail = nEmail;
module.exports.nPW    = nPW;

module.exports.dUsr = dUsr;
module.exports.dEmail = dEmail;
module.exports.dPW = dPW;