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

var userSelfEndpoint = 'user/self' // 'me'

module.exports.url = url;

module.exports.nUsr   = nUsr;
module.exports.nEmail = nEmail;
module.exports.nPW    = nPW;

module.exports.userSelfEndpoint = userSelfEndpoint;