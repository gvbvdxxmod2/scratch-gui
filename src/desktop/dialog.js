var {ipcRender} = require("./ipcRender");

class Dialog {
    static alert(message) {
        return ipcRenderer.sendSync('alert', {
            message
        });
    }

    static confirm(message) {
        return ipcRenderer.sendSync('confirm', {
            message
        });
    }

    static prompt(message, defaultValue) {
        return ipcRenderer.sendSync('prompt', {
            message,
            defaultValue
        });
    }
}