var log = require("../lib/log-desktop.js");
const EventEmitter = require('events');

log.log("Desktop enviroment was detected, desktop behaviors are now active.");


class DesktopAPI extends EventEmitter {
    constructor () {

    }
}

module.exports = new DesktopAPI();