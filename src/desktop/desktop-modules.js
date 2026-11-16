
var Remote = window.require("@electron/remote");
var Electron = window.require('electron');

module.exports = {
    Remote,
    ipc: Electron.ipcRender,
};