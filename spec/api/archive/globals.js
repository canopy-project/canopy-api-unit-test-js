'use strict'

//  Allow self-signed SSL certificates
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

//  Initialize 'New User' credentials
var nNum = 130;

var nUsr = 'newuser' + nNum;
var nEmail = 'newuser' + nNum + '@user.user';
var nPW = 'newuser' + nNum;

//  Initialize 'Existing User' credentials
var eNum = 8235;
var eUsr = 'disposableuser' + eNum;
var eEmail = 'disposableuser' + eNum + '@user.user';
var ePW = 'disposableuser' + eNum;
var basicUserAuth = 'Basic ' + new Buffer( eUsr + ':' + ePW ).toString("base64");

//  Set url
var url = 'https://dev02.canopy.link/api/';

//  Set Endpoints
var login = 'login'
var userSelf = 'user/self';
var userSelfDevices = 'user/self/devices'

var createUser =  'create_user';
var createUserLinkedDevices = 'create_devices';

var devicepath = 'device/'

module.exports.url = url;

module.exports.nUsr   = nUsr;
module.exports.nEmail = nEmail;
module.exports.nPW    = nPW;

module.exports.eUsr = eUsr;
module.exports.eEmail = eEmail;
module.exports.ePW = ePW;

module.exports.login = login;
module.exports.basicUserAuth = basicUserAuth;

module.exports.userSelf = userSelf;
module.exports.userSelfDevices = userSelfDevices;

module.exports.createUser = createUser;
module.exports.createUserLinkedDevices = createUserLinkedDevices;

module.exports.devicepath = devicepath;