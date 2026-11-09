var http = require("http");
var https = require("https");
var URL = require("url");
var requestArgs = require("./request-args.js");

function sendGetRequest(url) {
    var parsedURL = URL.parse(url);
    var requestModule = null;
    if (parsedURL.protocol == "http:") {
        requestModule = http;
    }
    if (parsedURL.protocol == "https:") {
        requestModule = https;
    }
    if (!requestModule) {
        throw new Error("Unrecognized protocol for GET request "+parsedURL.protocol);
    }
    return new Promise((resolve, reject) => {
        
        var request = requestModule.request({
            method:"GET",
            ...requestArgs,
            ...parsedURL
        },(res) => {
            var data = [];
            res.on("data", (chunk) => {
                data.push(chunk);
            });
            res.on("end", async () => {
                if (res.statusCode == 302) {
                    resolve(await getRequest(res.headers.location));
                } else {
                    if (res.statusCode !== 200) {
                        reject("Response not OK. " + http.STATUS_CODES[""+res.statusCode]);
                    } else {
                        resolve({
                            response: res,
                            buffer: Buffer.concat(data)
                        });
                    }
                }
            });
        });
        request.end();
    });
}

module.exports = {
    sendGetRequest
};