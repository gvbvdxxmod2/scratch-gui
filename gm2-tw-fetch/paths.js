
var path = require("path");
var fs = require("fs");

const GUI_PATH = path.join(__dirname, "../");

const NODE_MODULES_PATH = path.join(GUI_PATH, "./node_modules/");
if (!fs.existsSync(NODE_MODULES_PATH)) {
    throw new Error("node_modules directory doesn't exist. Did you forget to do 'yarn install' or 'npm install'?");
}

const VM_PATH = path.join(NODE_MODULES_PATH, "./scratch-vm/");
if (!fs.existsSync(VM_PATH)) {
    throw new Error("scratch-vm wasn't found. Did you forget to do 'yarn link scratch-vm' or 'npm link scratch-vm'?");
}

const GUI_LIB_PATH = path.join(GUI_PATH, "./src/gm2-tw-extension-lib-data/");
if (!fs.existsSync(GUI_LIB_PATH)) {
    fs.mkdirSync(GUI_LIB_PATH);
}

const VM_LIB_PATH = path.join(VM_PATH, "./src/gm2-tw-extension-lib-data/");
if (!fs.existsSync(VM_LIB_PATH)) {
    fs.mkdirSync(VM_LIB_PATH);
}

module.exports = {
    GUI_LIB_PATH,
    VM_LIB_PATH
};