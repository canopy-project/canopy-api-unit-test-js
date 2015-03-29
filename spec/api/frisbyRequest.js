/*-----------------------
 * Frisby Request Suite
 * ----------------------
 * This suite is optimized to produce legible error reporting
 *
 */

var frisby = require('frisby');

/*
 * 'verbose' is true if passed in as command line argument
 */

var verbose = (process.argv.indexOf("--verbose") >= 0);

/*
 * Creates a frisby POST test.
 * <params> contains the following fields:
 *      testname - Test name
 *      url - Request URL
 *      jsonBody - Request body
 *      headers - Request headers
 *      expectStatus - Expected response code
 */

function PostJson(params) {
    function dumpRequest(params) {
        console.log("------------------------------------------------------");
        console.log(params.testname);
        console.log("------------------------------------------------------");
        console.log("REQUEST: POST " + params.url);
        if (params.headers) {
            console.log("Headers: ");
            console.log(JSON.stringify(params.headers, null, 4));
            console.log("Body: ");
        }
        console.log(JSON.stringify(params.jsonBody, null, 4));
    }
    if (verbose) {
        dumpRequest(params);
    }
    return frisby.create(params.testname)
        .post(params.url, 
            params.jsonBody,
            { json: true })
        .addHeaders(params.headers)
        .expectStatus(params.expectStatus)
        .after(function(err, resp, body) {
            if (resp.statusCode != params.expectStatus || err || verbose) {
                if (!verbose) {
                    dumpRequest(params);
                }
                console.log("\nRESPONSE: " + resp.statusCode);
                if (err) {
                    console.log(err);
                }
                console.log(JSON.stringify(body, null, 4));
            }
            if (err) {
                // TBD: Display expected
            }
        });
}

/*
 * Creates a frisby GET test.
 * <params> contains the following fields:
 *      testname - Test name
 *      url - Request URL
 *      headers - Request headers ( must contain either cookie or basic-auth header)
 *      expectStatus - Expected response code
 */

function Get(params) {
    function dumpRequest(params) {
        console.log("------------------------------------------------------");
        console.log(params.testname);
        console.log("------------------------------------------------------");
        console.log("REQUEST: GET " + params.url);
        if (params.headers) {
            console.log("Headers: ");
            console.log(JSON.stringify(params.headers, null, 4));
        }
    }
    if (verbose) {
        dumpRequest(params);
    }
    return frisby.create(params.testname)
        .addHeaders(params.headers)
        .get(params.url)
        .expectStatus(params.expectStatus)
        .after(function(err, resp, body) {
            if (resp.statusCode != params.expectStatus || err || verbose) {
                if (!verbose) {
                    dumpRequest(params);
                }
                console.log("\nRESPONSE: " + resp.statusCode);
                if (err) {
                    console.log(err);
                }
                console.log(JSON.stringify(body, null, 4));
            }
            if (err) {
                // TBD: Display expected
            }
        });
}

/*
 * Creates a frisby DELETE test.
 * <params> contains the following fields:
 *      testname - Test name
 *      url - Request URL
 *      jsonBody - Request body (usually only pass in {"skip-email":true} ) 
 *      headers - Request headers ( must contain either cookie or basic-auth header)
 *      expectStatus - Expected response code
 */

function Delete(params) {
    function dumpRequest(params) {
        console.log("------------------------------------------------------");
        console.log(params.testname);
        console.log("------------------------------------------------------");
        console.log("REQUEST: POST " + params.url);
        if (params.headers) {
            console.log("Headers: ");
            console.log(JSON.stringify(params.headers, null, 4));
            console.log("Body: ");
        }
        console.log(JSON.stringify(params.jsonBody, null, 4));
    }
    if (verbose) {
        dumpRequest(params);
    }
    return frisby.create(params.testname)
        .addHeaders(params.headers)
        .delete(params.url, 
            params.jsonBody,
            { json: true })
        .expectStatus(params.expectStatus)
        .after(function(err, resp, body) {
            if (resp.statusCode != params.expectStatus || err || verbose) {
                if (!verbose) {
                    dumpRequest(params);
                }
                console.log("\nRESPONSE: " + resp.statusCode);
                if (err) {
                    console.log(err);
                }
                console.log(JSON.stringify(body, null, 4));
            }
            if (err) {
                // TBD: Display expected
            }
        });
}

module.exports.PostJson = PostJson;
module.exports.Get = Get;
module.exports.Delete = Delete;

