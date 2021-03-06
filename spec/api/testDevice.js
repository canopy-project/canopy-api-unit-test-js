'use strict'
var frisbyRequest = require('./frisbyRequest');
var frisby = require('frisby');
var h = require('./helper-functions');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var TestDevice = function( testFilename, device, callback ){
    var that = this;
    that.UUID = device.UUID;
    that.secretKey = device.secretKey;
    that.friendlyName = device.friendlyName;
    that.baseURL = process.env.CANOPY_BASE_URL;
    that.testFilename = testFilename;
    that.devicePath = 'device/';
    that.selfPath = that.baseURL + that.devicePath + that.UUID;
    that.authString = h.generateAuthString( that.UUID, that.secretKey );
    that.basicAuthHeaders = {
        "Content-Type":"application/json", 
        "Authorization": that.authString
    }

    that.basicAuthVerifySelf = function ( device, callback ){
        this.expectJSON =  device.expectJSON ? device.expectJSON : {};
        this.expectStatus = device.expectStatus ? device.expectStatus : 200;
        this.headers = device.headers ? device.headers : that.basicAuthHeaders;
        frisbyRequest.Get({
            "headers" : this.headers,            
            "testFilename" : that.testFilename,
            "testname" : that.testName + ' ***  SELF-VERIFY DEVICE ' + that.UUID,
            "url" : that.selfPath,
            "expectStatus" : this.expectStatus
        })             
            .expectHeaderContains('content-type', 'application/json')
            .expectJSON( this.expectJSON )
            .after(function(){
                if(callback){
                    callback();
                }
            })
            .toss()
    }

    that.basicAuthDelete = function( callback ){
        frisbyRequest.Delete({
            "headers" : that.basicAuthHeaders,     
            "testFilename" : that.testFilename,
            "testname" : that.testName + ' ***  SELF-DELETE DEVICE ' + that.username,
            "url" : that.selfPath,
            "expectStatus" : 200
        })
           .expectHeaderContains('content-type', 'application/json')
           .expectJSON({
              "result" : "ok"
           })
           .after(function(){
                if( callback ){
                    callback();
                }
           })
            .toss()
    }

    that.basicAuthUpdateProperties = function( updateJSON, callback ){
        frisbyRequest.PostJson({
            "testFilename" : that.testFilename,
            "testname" : that.testName + ' ***  UPDATE DEVICE PROPERTIES FOR ' + that.UUID,
            "url" : that.selfPath,
            "jsonBody" : updateJSON,
            "headers" : that.basicAuthHeaders,
            "expectStatus" : 200
        })            
            .after(function(){
                if(callback){
                    callback();
                }
            })
            .toss()
    }

    that.basicAuthDeclareCloudVariables = function( variableDeclarations, callback ){
        frisbyRequest.PostJson({
            "testFilename" : that.testFilename,
            "testname" : that.testName + ' ***  DECLARE VARIABLES FOR DEVICE ' + that.UUID,
            "url" : that.selfPath,
            "jsonBody" : variableDeclarations,
            "headers" : that.basicAuthHeaders,
            "expectStatus" : 200
        })            
            .after(function(){
                if(callback){
                    callback()
                }
            })
            .toss()
    }

    that.basicAuthSetCloudVariables = function( update, callback ){
        frisbyRequest.PostJson({
            "testFilename" : that.testFilename,
            "testname" : that.testName + ' *** SET CLOUD VARIABLES FOR DEVICE ' + that.UUID,
            "url" : that.selfPath,
            "jsonBody" : update.variableUpdates,
            "headers" : that.basicAuthHeaders,
            "expectStatus" : 200
        })
            .after(function(){
                if(callback){
                    callback()
                }
            })
            .toss()
    }

    that.getHistoricCloudVarData = function( cloudVariable, callback ){
        frisbyRequest.Get({
            "headers" : that.basicAuthHeaders,
            "testFilename" : that.testFilename,
            "testname" : that.testName + ' *** GET HISTORIC CLOUD VAR DATA ' + that.UUID,
            "url" : that.selfPath + '/' + cloudVariable,
            "expectStatus" : 200
        })
            .after(function(){
                if(callback){
                    callback()
                }
            })
            .toss()
    }    
}

module.exports = TestDevice;
