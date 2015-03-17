'use strict'
var frisby = require('frisby');
var h = require('./helper-functions');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var TestDevice = function( UUID, secret_key, callback ){
    var that = this;

    that.friendlyName = null;
    that.UUID = UUID;
    that.secret_key = secret_key;
    that.parameters = null;
    that.baseURL = 'https://dev02.canopy.link/api/';
    that.authString = function(){
        return new Buffer( that.UUID + ':' + that.secret_key ).toString("base64");
    }
    that.createCloudVariable = function( cloudVariableName ){}
    that.updateCloudVariable = function( cloudVariableName, value ){}
    that.verifySelf = function ( callback ){
        frisby.create('VERIFY DEVICE ' + that.UUID)
            .get( that.baseURL + that.devicePath +  that.testDevice.deviceId,
                { headers: { "Content-Type":"application/json", 
                             "authorization": that.authString
                            }
            })
            .expectStatus(200)
            .inspectJSON()
            .after(function(){
                if(callback){
                    callback();
                }
            })
            .toss()
    }
}

module.exports = TestDevice;