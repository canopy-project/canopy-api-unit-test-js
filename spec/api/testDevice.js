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
    that.selfPath = that.baseURL + that.devicePath + that.UUID;
    that.authString = h.generateAuthString( that.UUID, that.secretKey );
    that.basicAuthHeaders = {"Content-Type":"application/json", "Authorization": that.authString}

    that.basicAuthVerifySelf = function ( callback ){
        frisby.create('VERIFY DEVICE ' + that.UUID)
            .get( that.selfPath,
                { headers: that.basicAuthHeaders }
            )
            .expectStatus(200)
            .inspectJSON()
            .after(function(){
                if(callback){
                    callback();
                }
            })
            .toss()
    }
    that.basicAuthUpdateProperties = function( callback ){
        console.log('**********updating properties******** ');

        frisby.create('UPDATE DEVICE PROPERTIES FOR ' + that.UUID)
            .addHeader("Authorization", that.authString)
            .addHeader("Content-Type", "application/json")
            .post( that.selfPath,
                { "location_note": "cobras here" },
                { json: true }
            )
            .expectStatus(200)
            .inspectJSON()
            .expectJSON({"location_note": "cobras here"})
            .after(function(){
                if(callback){
                    callback()
                }
            })
            .toss()
    }
    that.basicAuthUpdateCloudVariable = function( callback ){
        console.log('****Updating Cloud Var*****');
/*
                .post( that.baseURL + that.loginPath,
                { "username" : this.username, "password" : this.password },
                { json: true },
                { headers: { "Content-Type":"application/json"}})*/
        frisby.create('UPDATE CLOUD VAR')
            .addHeader("Authorization", that.authString)
            .addHeader("Content-Type", "application/json")
            .post( that.selfPath, 
                {"sddl" : {  "temperature" :{} }},
                { json: true }
            )
            .expectStatus( 200 )
            .inspectJSON()
            .expectJSON( {"sddl" : {  "temperature" :{} }}
            )
            .after(function(){
                if(callback){
                    callback()
                }
            })
            .toss()
    }
}
module.exports = TestDevice;

/*POST /api/device/<UUID>
{
    "sddl" : {
        "full-replacement" : true,
        <VAR_DECL> : <VAR_PROPERTIES>,
        ...
    }
}*/
/* friendly_name: 'devicej9nh6t9n'*/
/*          POST /api/device/<UUID>
          {
              "friendly_name" : <NEW_FRIENDLY_NAME>,
              "location_note" : <NEW_LOCATION_NOTE>
          }

*/
