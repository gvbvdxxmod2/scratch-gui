var path = require("path");
var fs = require("fs");

var SMALL_LOG = false;

var URLs = require("./urls.js");
var {sendGetRequest} = require("./request-util.js");

var {generateForGUI} = require("./gui.js");
var {generateForVM} = require("./vm.js");

async function fetchExtensionMetadata() {
    var {buffer} = await sendGetRequest(URLs.EXTENSION_METADATA_URL);

    return JSON.parse(buffer.toString());
}

function getExtensionURL(slug) {
    return URLs.EXTENSION_DOWNLOAD_URL_PREFIX + slug + ".js";
}

async function fetchExtensionJavaScript(slug) {
    var fullUrl = getExtensionURL(slug);
    var {buffer} = await sendGetRequest(fullUrl);

    return buffer.toString();
}

function getExtensionImageFileExt(image) {
    return (""+image).split(".").pop();
}

async function fetchExtensionImage(image) {
    var fullUrl = URLs.EXTENSION_DOWNLOAD_URL_PREFIX + image;
    var {buffer} = await sendGetRequest(fullUrl);

    return buffer;
}

var ExtensionInfo = {};

async function getExtensionInfo() {
    console.log("Fetching from TW extension library...");
    ExtensionInfo = await fetchExtensionMetadata();
}

var ExtensionData = [];

async function fetchExtension(extension) {
    var data = {};
    
    data.id = extension.id;
    data.description = extension.description;
    data.name = extension.name;
    data.authors = (extension.by ? extension.by : []).concat((extension.credit ? extension.credit : [])).map((user) => {
        return {
            name: user.name || "",
            link: user.link || null,
        };
    });

    var extensionURL = getExtensionURL(extension.slug);
    var javascript = await fetchExtensionJavaScript(extension.slug);
    data.url = extensionURL;
    data.js = javascript;

    if (extension.image) {
        var imageExt = getExtensionImageFileExt(extension.image);
        var imageData = await fetchExtensionImage(extension.image);

        data.image = imageData;
        data.imageType = imageExt;
    }

    if (SMALL_LOG) {
        console.log("Fetched extension '"+extension.id+"'.");
        return data;
    }

    console.log(
        "Fetched extension '"+extension.id+"':" +
        "\n" + `Name: ${data.name}` +
        "\n" + `ID: ${data.id}` +
        "\n" + `URL: ${data.url}` +
        "\n" + `Description: ${data.description}` +
        "\n" + `Has Image?: ${data.image ? "YES" : "NO"}` +
        "\n" + `JavaScript size (characters): ${data.js.length}` +
        "\n" + `JavaScript size (lines): ${data.js.split("\n").length}`
    );

    return data;
}

function pullExtensions(finishedCallback) {
    var extensions = ExtensionInfo.extensions;
    var total = extensions.length;
    var curIndex = 0;
    var maxFetching = 10;
    var fetching = 0;
    var finished = false;

    ExtensionData = [];
    var c = 0;
    while (c < total) {
        ExtensionData.push(null);
        c += 1;
    }
    ExtensionData.length = total;

    async function doFetchFor(forIndex) {
        var extension = extensions[forIndex];
        var data = await fetchExtension(extension);
        //await (new Promise((resolve) => setTimeout(resolve,200)));
        ExtensionData[forIndex] = data; //Extensions should always be ordered for consistency.
    }

    async function newFetch(index) {
        fetching += 1;
        await doFetchFor(index);
        fetching -= 1;

        fetchLoop();
    }

    async function fetchLoop() {
        if (fetching > maxFetching) {
            return;
        }
        if (curIndex >= total) {
            if (finished || fetching !== 0) {
                return;
            }
            finishedCallback();
            finished = true;
            return;
        }
        var loop = true;
        while (loop) {
            newFetch(curIndex);
            curIndex += 1;
            if (fetching > maxFetching) {
                loop = false;
            }
            if (curIndex >= total) {
                loop = false;
            }
        }
    }

    fetchLoop();
}

(async function () {
    await getExtensionInfo();
    await (new Promise((resolve) => pullExtensions(resolve)));
    console.log("Generating for GUI...");
    await generateForGUI(ExtensionData);
    console.log("Generating for VM...");
    await generateForVM(ExtensionData);
})();
