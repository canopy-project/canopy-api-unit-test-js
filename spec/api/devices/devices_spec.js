var frisby = require('frisby');

//  Set url
var url = 'https://dev02.canopy.link/api/';

//  Allow self-signed SSL certificates
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

//  Initialize 'New User' credentials
var nDevNum = 20;

var nDevUUID = 'newDevice' + nDevNum;
var nDevSecretKey = 'newDevice' + nDevNum;

