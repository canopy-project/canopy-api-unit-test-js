'strict mode'
var _ = require('underscore');

var generateUsername = function(){
    return  'user' + Math.floor( Math.random()*100000000 );
}

var generateEmail = function(){
    var randomString = Math.random().toString(36).substring(2,15);
    return randomString + '@' + randomString + '.com';
}

var generatePassword = function(){
    return 'password' + Math.floor( Math.random()*100000000 );
}
var generateAuthString = function( username, password ){
        return 'Basic ' + new Buffer( username + ':' + password ).toString("base64");
    }
var generateDeviceFriendlyNames = function(deviceNumber){
    var deviceFriendlyNames = [];
    for(var i=0;i<deviceNumber;i++){
        deviceFriendlyNames.push(
              'device' + Math.random().toString(36).substring(2,10)
          );
    }
    return deviceFriendlyNames;
}
module.exports.generateUsername = generateUsername;
module.exports.generateEmail = generateEmail;
module.exports.generatePassword = generatePassword;
module.exports.generateAuthString = generateAuthString;
module.exports.generateDeviceFriendlyNames = generateDeviceFriendlyNames;