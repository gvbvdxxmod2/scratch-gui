
var Paths = require("./paths.js");
var path = require("path");
var fs = require("fs");

function copyImageToGUI (extensionInfo, index) {
    if (!extensionInfo.image) {
        return null;
    }
    
    var fileName = index + "." + extensionInfo.id + "." + extensionInfo.imageType;
    var target = path.join(Paths.GUI_LIB_PATH, fileName);
    fs.writeFileSync(target, extensionInfo.image);
    
    return "./"+fileName;
}

function cleanDir () {
    var files = fs.readdirSync(Paths.GUI_LIB_PATH);
    for (var file of files) {
        fs.rmSync(path.join(Paths.GUI_LIB_PATH, file), {
            recursive: true
        });
    }
}

async function createImages (ExtensionData) {
    var imagePaths = {};
    var index = 0;
    for (var extensionInfo of ExtensionData) {
        if (extensionInfo.image) {
            var relativePath = copyImageToGUI(extensionInfo, index);
            console.log(`Created image for ${extensionInfo.id}.`);
            imagePaths[extensionInfo.id] = relativePath;
        }
        index += 1;
    }
    return imagePaths;
}

function indent(amount) {
    return ("  ").repeat(amount);
}

function createMetadataJSX(ExtensionData, imagePaths = {}) {
    var importCode = "";
    var infoJSONCode = [];
    var index = 0;

    for (var extensionInfo of ExtensionData) {
        var imageIdentifier = null;
        if (extensionInfo.image) {
            imageIdentifier = `TWExtension${index}Image`;
            importCode += `import ${imageIdentifier} from ${JSON.stringify(imagePaths[extensionInfo.id])};` + "\n";
        }
        var jsonCode = ``;
        jsonCode += indent(1) + `{` + "\n";
        jsonCode += indent(2) + `id: ${JSON.stringify(extensionInfo.id)},` + "\n";
        jsonCode += indent(2) + `image: ${imageIdentifier || null},` + "\n";
        jsonCode += indent(2) + `name: ${JSON.stringify(extensionInfo.name)},` + "\n";
        jsonCode += indent(2) + `description: ${JSON.stringify(extensionInfo.description)},` + "\n";
        jsonCode += indent(2) + `authors: ${JSON.stringify(extensionInfo.authors)}` + "\n";
        jsonCode += indent(1) + `}`;

        infoJSONCode.push(jsonCode);
        index += 1;
    }

    var finalCode =
        importCode + "\n"
        + "export default [\n"
        + infoJSONCode.join(",\n")
        + "\n];";

    fs.writeFileSync(path.join(Paths.GUI_LIB_PATH, "index.jsx"), finalCode);
}

async function generateForGUI (ExtensionData) {
    cleanDir();
    var imagePaths = await createImages(ExtensionData);
    createMetadataJSX(ExtensionData, imagePaths);
}

module.exports = {
    generateForGUI
};