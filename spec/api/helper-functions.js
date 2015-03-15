'strict mode'

var generateUsername = function(){
    return  'user' + Math.floor( Math.random()*100000 );
}

var generateEmail = function(){
    var randomString = Math.random().toString(36).substring(2,10);
    return randomString + '@' + randomString + '.com';
}

var generatePassword = function(){
    return 'password' + Math.floor( Math.random()*100000 );
}

module.exports.generateUsername = generateUsername;
module.exports.generateEmail = generateEmail;
module.exports.generatePassword = generatePassword;