'use strict'
var frisby = require('frisby');
var h = require('./helper-functions');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var TestDevice = function( device, callback ){
    var that = this;
    that.UUID = device.UUID;
    that.secretKey = device.secretKey;
    that.friendlyName = device.friendlyName;
    that.baseURL = 'https://dev02.canopy.link/api/';
    that.devicePath = 'device/';
    that.authString = h.generateAuthString( that.UUID, that.secretKey );

    that.basicAuthVerifySelf = function ( callback ){
        frisby.create('VERIFY DEVICE ' + that.UUID)
            .get( that.baseURL + that.devicePath +  that.UUID,
                { headers: { "Content-Type":"application/json", 
                             "Authorization": that.authString
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