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
    that.devicePath = 'device/'
    that.authString = function(){
        return 'Basic ' + new Buffer( that.UUID + ':' + that.secret_key ).toString("base64");
    }
    that.createCloudVariable = function( cloudVariableName ){}
    that.updateCloudVariable = function( cloudVariableName, value ){}
    that.basicAuthVerifySelf = function ( callback ){
        console.log('that.authString(): ' + that.authString() );
        frisby.create('VERIFY DEVICE ' + that.UUID)
            .get( that.baseURL + that.devicePath +  that.UUID,
                { headers: { "Content-Type":"application/json", 
                             "Authorization": that.authString()
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