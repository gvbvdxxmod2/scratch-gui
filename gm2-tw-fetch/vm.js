
var Paths = require("./paths.js");
var path = require("path");
var fs = require("fs");

function cleanDir () {
    var files = fs.readdirSync(Paths.VM_LIB_PATH);
    for (var file of files) {
        fs.rmSync(path.join(Paths.VM_LIB_PATH, file), {
            recursive: true
        });
    }
}

function indent(amount) {
    return ("  ").repeat(amount);
}

function createMetadataJS(ExtensionData) {
    var importCode = "";
    var extensionsCode = [(`//`).repeat(20) + "\n"];
    var index = 0;

    importCode += `var { addExtensionToList, ExtensionType } = require("../extension-support/extension-list.js");`;

    for (var extensionInfo of ExtensionData) {

        var fileName = index + "." + extensionInfo.id + ".js";
        var target = path.join(Paths.VM_LIB_PATH, fileName);
        fs.writeFileSync(target, extensionInfo.js);

        var EXT_ID = JSON.stringify(extensionInfo.id);
        var EXT_URL = JSON.stringify(extensionInfo.url);
        var EXT_REQUIRE_PATH = JSON.stringify("!!raw-loader!./"+fileName);

        var code = ``;

        code += `/**`+ "\n";
        code += indent(1) + `Extension is fetched from ${extensionInfo.url}`+ "\n";
        code += indent(1) + `Name: ${extensionInfo.name}`+ "\n";
        code += indent(1) + `Description: ${extensionInfo.description}`+ "\n";
        code += indent(1) + `Authors: ${extensionInfo.authors.map((author) => author.name).join(", ")}`+ "\n";
        code += `*/`+ "\n";

        code += indent(0) + `addExtensionToList({` + "\n";
        code += indent(1) + `id: ${EXT_ID},` + "\n";
        code += indent(1) + `url: ${EXT_URL},` + "\n";
        code += indent(1) + `type: ExtensionType.EXTENSION_TW_ASYNC,` + "\n";
        code += indent(1) + `importFunc: async () => await import(${EXT_REQUIRE_PATH})` + "\n";
        code += indent(0) + `});` + "\n";

        code += (`//`).repeat(20) + "\n";

        extensionsCode.push(code);
        index += 1;
    }

    var finalCode =
        importCode + "\n\n"
        + extensionsCode.join("");
    
    fs.writeFileSync(path.join(Paths.VM_LIB_PATH, "index.js"), finalCode);
}

async function generateForVM (ExtensionData) {
    cleanDir();
    createMetadataJS(ExtensionData);
}

module.exports = {
    generateForVM
};