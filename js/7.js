(window["webpackJsonpGUI"] = window["webpackJsonpGUI"] || []).push([[7],{

/***/ "./node_modules/atob/browser-atob.js":
/*!*******************************************!*\
  !*** ./node_modules/atob/browser-atob.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer, module) {(function (w) {
  "use strict";

  function findBest(atobNative) {
    // normal window
    if ('function' === typeof atobNative) { return atobNative; }


    // browserify (web worker)
    if ('function' === typeof Buffer) {
      return function atobBrowserify(a) {
        //!! Deliberately using an API that's deprecated in node.js because
        //!! this file is for browsers and we expect them to cope with it.
        //!! Discussion: github.com/node-browser-compat/atob/pull/9
        return new Buffer(a, 'base64').toString('binary');
      };
    }

    // ios web worker with base64js
    if ('object' === typeof w.base64js) {
      // bufferToBinaryString
      // https://git.coolaj86.com/coolaj86/unibabel.js/blob/master/index.js#L50
      return function atobWebWorker_iOS(a) {
        var buf = w.base64js.b64ToByteArray(a);
        return Array.prototype.map.call(buf, function (ch) {
          return String.fromCharCode(ch);
        }).join('');
      };
    }

		return function () {
			// ios web worker without base64js
			throw new Error("You're probably in an old browser or an iOS webworker." +
				" It might help to include beatgammit's base64-js.");
    };
  }

  var atobBest = findBest(w.atob);
  w.atob = atobBest;

  if (( true) && module && module.exports) {
    module.exports = atobBest;
  }
}(window));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../buffer/index.js */ "./node_modules/buffer/index.js").Buffer, __webpack_require__(/*! ./../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/btoa/index.js":
/*!************************************!*\
  !*** ./node_modules/btoa/index.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {(function () {
  "use strict";

  function btoa(str) {
    var buffer;

    if (str instanceof Buffer) {
      buffer = str;
    } else {
      buffer = Buffer.from(str.toString(), 'binary');
    }

    return buffer.toString('base64');
  }

  module.exports = btoa;
}());

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "./node_modules/scratch-vm/src/extensions/scratch3_microbit/index.js":
/*!***************************************************************************!*\
  !*** ./node_modules/scratch-vm/src/extensions/scratch3_microbit/index.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const ArgumentType = __webpack_require__(/*! ../../extension-support/argument-type */ "./node_modules/scratch-vm/src/extension-support/argument-type.js");
const BlockType = __webpack_require__(/*! ../../extension-support/block-type */ "./node_modules/scratch-vm/src/extension-support/block-type.js");
const log = __webpack_require__(/*! ../../util/log */ "./node_modules/scratch-vm/src/util/log.js");
const cast = __webpack_require__(/*! ../../util/cast */ "./node_modules/scratch-vm/src/util/cast.js");
const formatMessage = __webpack_require__(/*! format-message */ "./node_modules/scratch-vm/node_modules/format-message/index.js");
const BLE = __webpack_require__(/*! ../../io/ble */ "./node_modules/scratch-vm/src/io/ble.js");
const Base64Util = __webpack_require__(/*! ../../util/base64-util */ "./node_modules/scratch-vm/src/util/base64-util.js");

/**
 * Icon png to be displayed at the left edge of each extension block, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len
const blockIconURI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAACXBIWXMAABYlAAAWJQFJUiTwAAAKcElEQVR42u2cfXAU9RnHv7u3L3d7l9yR5PIGXO7MkQKaYiCUWqJhFGvRMk4JZXSc8aXVaSmiYlthVHQEW99FxiIdrVY6teiMdoa+ICqhIqgQAsjwMgYDOQKXl7uY17u9293b3f5x5JKYe8+FJGSfvzbP/n77e/azz+95nt9v90KoqgpN0hdSQ6AB1ABqADWAmmgANYAaQA2gJhpADeBEE2q8GPLaWzu/CslyiY4k9dOn5uijtXGd7+jWkaReVpT3Hrhv6d0awEFC07rgD+ZeYYnXprhwigUAvjj0zbjxQCLebozT7iDzK1ZUWCru2K7L//6MVC8ue45Blz8n6rlQ815QtuohOlXiEdy/AUqPa6y59Mkh6Q1345GNja6m7pHEQKNl3t0704EXat4L6fSOmOeEI1vHKzwAyNJR9MPFpRUPOu0ONm2A0xatWaTLm5WfDrzvAppA8AbiG03fC8CQNkDKZK2YrPAuRrhpifJERsuYywveJc7CqcIDMAyeLm82dEXzw39I/qjXkpr3QuW9lxfAdOABGAKPslWDnbsy7Jl8BxTeM3SqmO0gaA5U6c3jymup0YSn9JyLee67wpTfBQAQjmyF3HFqiJcRtDECjy5dAmbmcgQPvjjxl3Lx4IVjnD/5cE1zkWtyP34VBGcdKLJnLgc9cznk1kMXFdzEn8KJ4KUqqsSHvcxWDf7j1UM8UPr6/YgHhhX8xAaYaXgAIB7fBnbuSrBzV8aNgarEQ/z6/YkLcDTg9V9XlXjQtuqoU1TpcUHlvZDOfDiuyh5qPMCLrJ1bDw3EuUtx81N/BH3pjQBJQ2HMF5V6iKfeRchVm9kkMtrwxmSdobeA9daBde8GwVlBcFYofS1Jw0vaAy9HeJHQwBUPzIBvGxDc92Rmp/BowJs10wkAONfsBs8HAAAltqngOAO8HZ3o6OiMqcvLy4E1Lwc8H8C5ZndMXdLJa/qNacNLCDBw/O8nFUNWxp/64+tWAwBefe1tHKg7CgC4/9d3ori4EHv3HcDrb26PqVt2602ovvaHaGlpw+8ffSamLqXYmya8jG8mpFy6iGLkWLh4HAwG4+r6j4VBfaPpLgU8IMGO9MLqW2pYQ9aQokuR5dgXIwCC1CUcNMj3hpdvLAdSF54EYpCHooRA0Swomo2pC0kCQpIAkqTA6LmYupgxL0X7m78+aG10NXVkpIwxsAwWXncDCESHLkohfPbpbiT6ZFPPZQ9fC0e58Wi6wTDj6UbT/rQAyiERS2pW4Kc3LQDLRO8miCEAKj7d83FcTxyLJJJJ+9MCqKoq9HomMrgkSThxsgEcZ8AMpwMkSYJlKDA0DVUFiHGWRDJp/4jXwqIo4uFHnkZXdw8AYGbZFXhs3WqQJDkhkkim7E8KoMlkxKbnn8DBunrwUli3e8/+yOAA0HjmHDq7upGXm5PUoDUr7hmWRB5Zt3FYwoime+vtd/H6G9uGJIxouniSyP6H7v8FystnY80jGzIA0MihsMAKu20aTp3JzFb6WCWRuDUvHwByw8cOhw2FBVaYjNzIAba1e3Hfb9aiq7MTNStuBwAsvr4KO3d9GnmKztIS5EyxTJiVSDT7p04tipx/9MnnYc7ORlu7NzMxsK3di5AkDHgGw2DTC+uHBeGJshJJZL/fxyMQEDKbRAiCQDAoQhBDYBkKNE2j4uqrhpUBoiSBIMZfEhkN+1NeiWSqEB2rlUg69md0JRIQRHy86z8jXsqNVRLJlP0jqgNJXXgAgjbCcONmCHUvQ+44NWG2s/rtH5Mt/ciToo0wLH4JBGO6LLazRiJk2vBYy4gHHw/bWSN+LZBKEhkMjzn/CaSiKgQOvJDyFB7L7axUJWNJZDA8IhQA1boPin7KZbMSGfUYyFx9b3hXg/cCsoBA2Z0AoYOaxlcC4+mdyCUDKBzanLFBJ3USyaRMuiSSKZmUSSSTMimTCABUlblRU9kAZ0E39p+eii21c+EL0jHbOwu6sfaWgyjND//U4oP6MmzZnfi79XT7mfQSNi7bh0JzOLG19XBY/89r49pYVebGqhuOosDsh1+gsWV3BXYdd2Q+BlaVuXFv9bHgkSbzk+vfcVRyjHhi47J9cftsXLYf7T36Ix8cLHlo6ydlv6qpPI2qssRZcuOy/Wjp4k5s+2zG+offKqtcUt6kJtNv7S0H0RtkvEufXTB/6bML5je2Wy7UVDbEbF9o9mPDsv2oP5v75vbPS26rP5u3fdXiozDppcwDrKlswOlWy9E//DX09Mt/azh8zzNM1RybF86C7pheVGD240CDeX3NWtfml94Rt+0+Mf3Lm8qbEnpfgdmPs+3G9+564vTT//pM/GrHYduWRP0AYOEMN/5S61xT92Vtfd2XtfWb/vu91fHALyxzw9tnkB/cTD5w+2Ou9375HHtfa7exM5mxRpKFaafdQQKgAcDERs98/foLHrXdaXfoABi8vczhWO2/28/TRR5z2h00gKymNl1ton79oigq6bQ7dE67Q+ew9mb1h4FYYwVESgLAXLSRa+3mWpIdK+UYuPiq89f8+XfT/+ftZQ4vLm9ZmUyfdcsv1M2fWfRaUCK8i8vdK1u6ktuAWPWTsztm24o/cnnYHUsrWzd1+fVJ9XtqxbG3XzFdNcPTawjcueibpxK1t+X26f/9R8a953jub4typOvm2b1XnvUmv8JKWMZcaZffX3XDERRP8cGaFRjWxtPLoZvXY4oxgPBNEsgxBhCUKEzL6Ru+JydS8Ak0giKFgESDJFQoKmCgQzAwIfQEWETzmoBIwd2VNaStu8uEHGO4Buz06zHHFv0dRkefAZ1+PQx0KNK2eIoPLCUj2zDc275qzgcBFWv+cf3IyxgTK2KOzQufEM5kfpGF12eGPSf8DXN+No/87HDWiwYYALw+M6ym8AscAxO++X7xCTRM7EDQzht0Da8v/NWo1dQDAxNCocUXs+303IGHdaptOmYXnh/SLlZbV+fwnwJm6UXEm/ojqgM/PFmJQ81OPHfrtqT7bN23BE8seTflYLvz5DwYGQHLKz5Puo/XZ8aLtT+D1dSDuxbsGQIymmz48DbwIguOESJOcce8XaO3oVpZ8k3Em5KVVAAMFnuOB9as1MbimCBunn04vBmR40ls29Wfgxf1KMn1gBdY+MXUCvK4ANvPndpLzrLzALjBN2VPwrDBksgLYkn1jBMp90nVY2++8vAw3RlPeLNYVZSPAEgjKWP6ZCn4lF+gMdnE08spQb73RQB9aXtgo6tJcNodf8rWz3L//Br340UW3sExEkXrFFKSSUVHqkRfkJZ8QSZk5gS6hw9H+GyDQAclSs41BVmSUIn+toAKIUTJskKoQUknCxKlkISKb/sM0NMyyVAhXW+AlYosfgOgQlUJVadTSUWBKoQoudvPioPbenq5oIUTaRUqenhWKi3oyVIUqKpKREoLggDhF6hQb4CV9LRM9rctMPN6glChp2SdTqeSskwoAECSKnG61fzFR/XsGu+FhmONriYl7TImsjoYKJyZSeB8CoBQo6spqU8TCO1fgE7gDVUNoCYaQA2gBlADqAHURAOoAdQAagA10QCOgfwfNp/hXbfBMCAAAAAASUVORK5CYII=';

/**
 * Enum for micro:bit BLE command protocol.
 * https://github.com/LLK/scratch-microbit-firmware/blob/master/protocol.md
 * @readonly
 * @enum {number}
 */
const BLECommand = {
  CMD_PIN_CONFIG: 0x80,
  CMD_DISPLAY_TEXT: 0x81,
  CMD_DISPLAY_LED: 0x82
};

/**
 * A time interval to wait (in milliseconds) before reporting to the BLE socket
 * that data has stopped coming from the peripheral.
 */
const BLETimeout = 4500;

/**
 * A time interval to wait (in milliseconds) while a block that sends a BLE message is running.
 * @type {number}
 */
const BLESendInterval = 100;

/**
 * A string to report to the BLE socket when the micro:bit has stopped receiving data.
 * @type {string}
 */
const BLEDataStoppedError = 'micro:bit extension stopped receiving data';

/**
 * Enum for micro:bit protocol.
 * https://github.com/LLK/scratch-microbit-firmware/blob/master/protocol.md
 * @readonly
 * @enum {string}
 */
const BLEUUID = {
  service: 0xf005,
  rxChar: '5261da01-fa7e-42ab-850b-7c80220097cc',
  txChar: '5261da02-fa7e-42ab-850b-7c80220097cc'
};

/**
 * Manage communication with a MicroBit peripheral over a Scrath Link client socket.
 */
class MicroBit {
  /**
   * Construct a MicroBit communication object.
   * @param {Runtime} runtime - the Scratch 3.0 runtime
   * @param {string} extensionId - the id of the extension
   */
  constructor(runtime, extensionId) {
    /**
     * The Scratch 3.0 runtime used to trigger the green flag button.
     * @type {Runtime}
     * @private
     */
    this._runtime = runtime;

    /**
     * The BluetoothLowEnergy connection socket for reading/writing peripheral data.
     * @type {BLE}
     * @private
     */
    this._ble = null;
    this._runtime.registerPeripheralExtension(extensionId, this);

    /**
     * The id of the extension this peripheral belongs to.
     */
    this._extensionId = extensionId;

    /**
     * The most recently received value for each sensor.
     * @type {Object.<string, number>}
     * @private
     */
    this._sensors = {
      tiltX: 0,
      tiltY: 0,
      buttonA: 0,
      buttonB: 0,
      touchPins: [0, 0, 0],
      gestureState: 0,
      ledMatrixState: new Uint8Array(5)
    };

    /**
     * The most recently received value for each gesture.
     * @type {Object.<string, Object>}
     * @private
     */
    this._gestures = {
      moving: false,
      move: {
        active: false,
        timeout: false
      },
      shake: {
        active: false,
        timeout: false
      },
      jump: {
        active: false,
        timeout: false
      }
    };

    /**
     * Interval ID for data reading timeout.
     * @type {number}
     * @private
     */
    this._timeoutID = null;

    /**
     * A flag that is true while we are busy sending data to the BLE socket.
     * @type {boolean}
     * @private
     */
    this._busy = false;

    /**
     * ID for a timeout which is used to clear the busy flag if it has been
     * true for a long time.
     */
    this._busyTimeoutID = null;
    this.reset = this.reset.bind(this);
    this._onConnect = this._onConnect.bind(this);
    this._onMessage = this._onMessage.bind(this);
  }

  /**
   * @param {string} text - the text to display.
   * @return {Promise} - a Promise that resolves when writing to peripheral.
   */
  displayText(text) {
    const output = new Uint8Array(text.length);
    for (let i = 0; i < text.length; i++) {
      output[i] = text.charCodeAt(i);
    }
    return this.send(BLECommand.CMD_DISPLAY_TEXT, output);
  }

  /**
   * @param {Uint8Array} matrix - the matrix to display.
   * @return {Promise} - a Promise that resolves when writing to peripheral.
   */
  displayMatrix(matrix) {
    return this.send(BLECommand.CMD_DISPLAY_LED, matrix);
  }

  /**
   * @return {number} - the latest value received for the tilt sensor's tilt about the X axis.
   */
  get tiltX() {
    return this._sensors.tiltX;
  }

  /**
   * @return {number} - the latest value received for the tilt sensor's tilt about the Y axis.
   */
  get tiltY() {
    return this._sensors.tiltY;
  }

  /**
   * @return {boolean} - the latest value received for the A button.
   */
  get buttonA() {
    return this._sensors.buttonA;
  }

  /**
   * @return {boolean} - the latest value received for the B button.
   */
  get buttonB() {
    return this._sensors.buttonB;
  }

  /**
   * @return {number} - the latest value received for the motion gesture states.
   */
  get gestureState() {
    return this._sensors.gestureState;
  }

  /**
   * @return {Uint8Array} - the current state of the 5x5 LED matrix.
   */
  get ledMatrixState() {
    return this._sensors.ledMatrixState;
  }

  /**
   * Called by the runtime when user wants to scan for a peripheral.
   */
  scan() {
    if (this._ble) {
      this._ble.disconnect();
    }
    this._ble = new BLE(this._runtime, this._extensionId, {
      filters: [{
        services: [BLEUUID.service]
      }]
    }, this._onConnect, this.reset);
  }

  /**
   * Called by the runtime when user wants to connect to a certain peripheral.
   * @param {number} id - the id of the peripheral to connect to.
   */
  connect(id) {
    if (this._ble) {
      this._ble.connectPeripheral(id);
    }
  }

  /**
   * Disconnect from the micro:bit.
   */
  disconnect() {
    if (this._ble) {
      this._ble.disconnect();
    }
    this.reset();
  }

  /**
   * Reset all the state and timeout/interval ids.
   */
  reset() {
    if (this._timeoutID) {
      window.clearTimeout(this._timeoutID);
      this._timeoutID = null;
    }
  }

  /**
   * Return true if connected to the micro:bit.
   * @return {boolean} - whether the micro:bit is connected.
   */
  isConnected() {
    let connected = false;
    if (this._ble) {
      connected = this._ble.isConnected();
    }
    return connected;
  }

  /**
   * Send a message to the peripheral BLE socket.
   * @param {number} command - the BLE command hex.
   * @param {Uint8Array} message - the message to write
   */
  send(command, message) {
    if (!this.isConnected()) return;
    if (this._busy) return;

    // Set a busy flag so that while we are sending a message and waiting for
    // the response, additional messages are ignored.
    this._busy = true;

    // Set a timeout after which to reset the busy flag. This is used in case
    // a BLE message was sent for which we never received a response, because
    // e.g. the peripheral was turned off after the message was sent. We reset
    // the busy flag after a while so that it is possible to try again later.
    this._busyTimeoutID = window.setTimeout(() => {
      this._busy = false;
    }, 5000);
    const output = new Uint8Array(message.length + 1);
    output[0] = command; // attach command to beginning of message
    for (let i = 0; i < message.length; i++) {
      output[i + 1] = message[i];
    }
    const data = Base64Util.uint8ArrayToBase64(output);
    this._ble.write(BLEUUID.service, BLEUUID.txChar, data, 'base64', true).then(() => {
      this._busy = false;
      window.clearTimeout(this._busyTimeoutID);
    });
  }

  /**
   * Starts reading data from peripheral after BLE has connected to it.
   * @private
   */
  _onConnect() {
    this._ble.read(BLEUUID.service, BLEUUID.rxChar, true, this._onMessage);
    this._timeoutID = window.setTimeout(() => this._ble.handleDisconnectError(BLEDataStoppedError), BLETimeout);
  }

  /**
   * Process the sensor data from the incoming BLE characteristic.
   * @param {object} base64 - the incoming BLE data.
   * @private
   */
  _onMessage(base64) {
    // parse data
    const data = Base64Util.base64ToUint8Array(base64);
    this._sensors.tiltX = data[1] | data[0] << 8;
    if (this._sensors.tiltX > 1 << 15) this._sensors.tiltX -= 1 << 16;
    this._sensors.tiltY = data[3] | data[2] << 8;
    if (this._sensors.tiltY > 1 << 15) this._sensors.tiltY -= 1 << 16;
    this._sensors.buttonA = data[4];
    this._sensors.buttonB = data[5];
    this._sensors.touchPins[0] = data[6];
    this._sensors.touchPins[1] = data[7];
    this._sensors.touchPins[2] = data[8];
    this._sensors.gestureState = data[9];

    // cancel disconnect timeout and start a new one
    window.clearTimeout(this._timeoutID);
    this._timeoutID = window.setTimeout(() => this._ble.handleDisconnectError(BLEDataStoppedError), BLETimeout);
  }

  /**
   * @param {number} pin - the pin to check touch state.
   * @return {number} - the latest value received for the touch pin states.
   * @private
   */
  _checkPinState(pin) {
    return this._sensors.touchPins[pin];
  }
}

/**
 * Enum for tilt sensor direction.
 * @readonly
 * @enum {string}
 */
const MicroBitTiltDirection = {
  FRONT: 'front',
  BACK: 'back',
  LEFT: 'left',
  RIGHT: 'right',
  ANY: 'any'
};

/**
 * Enum for micro:bit gestures.
 * @readonly
 * @enum {string}
 */
const MicroBitGestures = {
  MOVED: 'moved',
  SHAKEN: 'shaken',
  JUMPED: 'jumped'
};

/**
 * Enum for micro:bit buttons.
 * @readonly
 * @enum {string}
 */
const MicroBitButtons = {
  A: 'A',
  B: 'B',
  ANY: 'any'
};

/**
 * Enum for micro:bit pin states.
 * @readonly
 * @enum {string}
 */
const MicroBitPinState = {
  ON: 'on',
  OFF: 'off'
};

/**
 * Scratch 3.0 blocks to interact with a MicroBit peripheral.
 */
class Scratch3MicroBitBlocks {
  /**
   * @return {string} - the name of this extension.
   */
  static get EXTENSION_NAME() {
    return 'micro:bit';
  }

  /**
   * @return {string} - the ID of this extension.
   */
  static get EXTENSION_ID() {
    return 'microbit';
  }

  /**
   * @return {number} - the tilt sensor counts as "tilted" if its tilt angle meets or exceeds this threshold.
   */
  static get TILT_THRESHOLD() {
    return 15;
  }

  /**
   * @return {array} - text and values for each buttons menu element
   */
  get BUTTONS_MENU() {
    return [{
      text: 'A',
      value: MicroBitButtons.A
    }, {
      text: 'B',
      value: MicroBitButtons.B
    }, {
      text: formatMessage({
        id: 'microbit.buttonsMenu.any',
        default: 'any',
        description: 'label for "any" element in button picker for micro:bit extension'
      }),
      value: MicroBitButtons.ANY
    }];
  }

  /**
   * @return {array} - text and values for each gestures menu element
   */
  get GESTURES_MENU() {
    return [{
      text: formatMessage({
        id: 'microbit.gesturesMenu.moved',
        default: 'moved',
        description: 'label for moved gesture in gesture picker for micro:bit extension'
      }),
      value: MicroBitGestures.MOVED
    }, {
      text: formatMessage({
        id: 'microbit.gesturesMenu.shaken',
        default: 'shaken',
        description: 'label for shaken gesture in gesture picker for micro:bit extension'
      }),
      value: MicroBitGestures.SHAKEN
    }, {
      text: formatMessage({
        id: 'microbit.gesturesMenu.jumped',
        default: 'jumped',
        description: 'label for jumped gesture in gesture picker for micro:bit extension'
      }),
      value: MicroBitGestures.JUMPED
    }];
  }

  /**
   * @return {array} - text and values for each pin state menu element
   */
  get PIN_STATE_MENU() {
    return [{
      text: formatMessage({
        id: 'microbit.pinStateMenu.on',
        default: 'on',
        description: 'label for on element in pin state picker for micro:bit extension'
      }),
      value: MicroBitPinState.ON
    }, {
      text: formatMessage({
        id: 'microbit.pinStateMenu.off',
        default: 'off',
        description: 'label for off element in pin state picker for micro:bit extension'
      }),
      value: MicroBitPinState.OFF
    }];
  }

  /**
   * @return {array} - text and values for each tilt direction menu element
   */
  get TILT_DIRECTION_MENU() {
    return [{
      text: formatMessage({
        id: 'microbit.tiltDirectionMenu.front',
        default: 'front',
        description: 'label for front element in tilt direction picker for micro:bit extension'
      }),
      value: MicroBitTiltDirection.FRONT
    }, {
      text: formatMessage({
        id: 'microbit.tiltDirectionMenu.back',
        default: 'back',
        description: 'label for back element in tilt direction picker for micro:bit extension'
      }),
      value: MicroBitTiltDirection.BACK
    }, {
      text: formatMessage({
        id: 'microbit.tiltDirectionMenu.left',
        default: 'left',
        description: 'label for left element in tilt direction picker for micro:bit extension'
      }),
      value: MicroBitTiltDirection.LEFT
    }, {
      text: formatMessage({
        id: 'microbit.tiltDirectionMenu.right',
        default: 'right',
        description: 'label for right element in tilt direction picker for micro:bit extension'
      }),
      value: MicroBitTiltDirection.RIGHT
    }];
  }

  /**
   * @return {array} - text and values for each tilt direction (plus "any") menu element
   */
  get TILT_DIRECTION_ANY_MENU() {
    return [...this.TILT_DIRECTION_MENU, {
      text: formatMessage({
        id: 'microbit.tiltDirectionMenu.any',
        default: 'any',
        description: 'label for any direction element in tilt direction picker for micro:bit extension'
      }),
      value: MicroBitTiltDirection.ANY
    }];
  }

  /**
   * Construct a set of MicroBit blocks.
   * @param {Runtime} runtime - the Scratch 3.0 runtime.
   */
  constructor(runtime) {
    /**
     * The Scratch 3.0 runtime.
     * @type {Runtime}
     */
    this.runtime = runtime;

    // Create a new MicroBit peripheral instance
    this._peripheral = new MicroBit(this.runtime, Scratch3MicroBitBlocks.EXTENSION_ID);
  }

  /**
   * @returns {object} metadata for this extension and its blocks.
   */
  getInfo() {
    return {
      id: Scratch3MicroBitBlocks.EXTENSION_ID,
      name: Scratch3MicroBitBlocks.EXTENSION_NAME,
      blockIconURI: blockIconURI,
      showStatusButton: true,
      blocks: [{
        opcode: 'whenButtonPressed',
        text: formatMessage({
          id: 'microbit.whenButtonPressed',
          default: 'when [BTN] button pressed',
          description: 'when the selected button on the micro:bit is pressed'
        }),
        blockType: BlockType.HAT,
        arguments: {
          BTN: {
            type: ArgumentType.STRING,
            menu: 'buttons',
            defaultValue: MicroBitButtons.A
          }
        }
      }, {
        opcode: 'isButtonPressed',
        text: formatMessage({
          id: 'microbit.isButtonPressed',
          default: '[BTN] button pressed?',
          description: 'is the selected button on the micro:bit pressed?'
        }),
        blockType: BlockType.BOOLEAN,
        arguments: {
          BTN: {
            type: ArgumentType.STRING,
            menu: 'buttons',
            defaultValue: MicroBitButtons.A
          }
        }
      }, '---', {
        opcode: 'whenGesture',
        text: formatMessage({
          id: 'microbit.whenGesture',
          default: 'when [GESTURE]',
          description: 'when the selected gesture is detected by the micro:bit'
        }),
        blockType: BlockType.HAT,
        arguments: {
          GESTURE: {
            type: ArgumentType.STRING,
            menu: 'gestures',
            defaultValue: MicroBitGestures.MOVED
          }
        }
      }, '---', {
        opcode: 'displaySymbol',
        text: formatMessage({
          id: 'microbit.displaySymbol',
          default: 'display [MATRIX]',
          description: 'display a pattern on the micro:bit display'
        }),
        blockType: BlockType.COMMAND,
        arguments: {
          MATRIX: {
            type: ArgumentType.MATRIX,
            defaultValue: '0101010101100010101000100'
          }
        }
      }, {
        opcode: 'displayText',
        text: formatMessage({
          id: 'microbit.displayText',
          default: 'display text [TEXT]',
          description: 'display text on the micro:bit display'
        }),
        blockType: BlockType.COMMAND,
        arguments: {
          TEXT: {
            type: ArgumentType.STRING,
            defaultValue: formatMessage({
              id: 'microbit.defaultTextToDisplay',
              default: 'Hello!',
              description: "default text to display.\n                                IMPORTANT - the micro:bit only supports letters a-z, A-Z.\n                                Please substitute a default word in your language\n                                that can be written with those characters,\n                                substitute non-accented characters or leave it as \"Hello!\".\n                                Check the micro:bit site documentation for details"
            })
          }
        }
      }, {
        opcode: 'displayClear',
        text: formatMessage({
          id: 'microbit.clearDisplay',
          default: 'clear display',
          description: 'display nothing on the micro:bit display'
        }),
        blockType: BlockType.COMMAND
      }, '---', {
        opcode: 'whenTilted',
        text: formatMessage({
          id: 'microbit.whenTilted',
          default: 'when tilted [DIRECTION]',
          description: 'when the micro:bit is tilted in a direction'
        }),
        blockType: BlockType.HAT,
        arguments: {
          DIRECTION: {
            type: ArgumentType.STRING,
            menu: 'tiltDirectionAny',
            defaultValue: MicroBitTiltDirection.ANY
          }
        }
      }, {
        opcode: 'isTilted',
        text: formatMessage({
          id: 'microbit.isTilted',
          default: 'tilted [DIRECTION]?',
          description: 'is the micro:bit is tilted in a direction?'
        }),
        blockType: BlockType.BOOLEAN,
        arguments: {
          DIRECTION: {
            type: ArgumentType.STRING,
            menu: 'tiltDirectionAny',
            defaultValue: MicroBitTiltDirection.ANY
          }
        }
      }, {
        opcode: 'getTiltAngle',
        text: formatMessage({
          id: 'microbit.tiltAngle',
          default: 'tilt angle [DIRECTION]',
          description: 'how much the micro:bit is tilted in a direction'
        }),
        blockType: BlockType.REPORTER,
        arguments: {
          DIRECTION: {
            type: ArgumentType.STRING,
            menu: 'tiltDirection',
            defaultValue: MicroBitTiltDirection.FRONT
          }
        }
      }, '---', {
        opcode: 'whenPinConnected',
        text: formatMessage({
          id: 'microbit.whenPinConnected',
          default: 'when pin [PIN] connected',
          description: 'when the pin detects a connection to Earth/Ground'
        }),
        blockType: BlockType.HAT,
        arguments: {
          PIN: {
            type: ArgumentType.STRING,
            menu: 'touchPins',
            defaultValue: '0'
          }
        }
      }],
      menus: {
        buttons: {
          acceptReporters: true,
          items: this.BUTTONS_MENU
        },
        gestures: {
          acceptReporters: true,
          items: this.GESTURES_MENU
        },
        pinState: {
          acceptReporters: true,
          items: this.PIN_STATE_MENU
        },
        tiltDirection: {
          acceptReporters: true,
          items: this.TILT_DIRECTION_MENU
        },
        tiltDirectionAny: {
          acceptReporters: true,
          items: this.TILT_DIRECTION_ANY_MENU
        },
        touchPins: {
          acceptReporters: true,
          items: ['0', '1', '2']
        }
      }
    };
  }

  /**
   * Test whether the A or B button is pressed
   * @param {object} args - the block's arguments.
   * @return {boolean} - true if the button is pressed.
   */
  whenButtonPressed(args) {
    if (args.BTN === 'any') {
      return this._peripheral.buttonA | this._peripheral.buttonB;
    } else if (args.BTN === 'A') {
      return this._peripheral.buttonA;
    } else if (args.BTN === 'B') {
      return this._peripheral.buttonB;
    }
    return false;
  }

  /**
   * Test whether the A or B button is pressed
   * @param {object} args - the block's arguments.
   * @return {boolean} - true if the button is pressed.
   */
  isButtonPressed(args) {
    if (args.BTN === 'any') {
      return (this._peripheral.buttonA | this._peripheral.buttonB) !== 0;
    } else if (args.BTN === 'A') {
      return this._peripheral.buttonA !== 0;
    } else if (args.BTN === 'B') {
      return this._peripheral.buttonB !== 0;
    }
    return false;
  }

  /**
   * Test whether the micro:bit is moving
   * @param {object} args - the block's arguments.
   * @return {boolean} - true if the micro:bit is moving.
   */
  whenGesture(args) {
    const gesture = cast.toString(args.GESTURE);
    if (gesture === 'moved') {
      return this._peripheral.gestureState >> 2 & 1;
    } else if (gesture === 'shaken') {
      return this._peripheral.gestureState & 1;
    } else if (gesture === 'jumped') {
      return this._peripheral.gestureState >> 1 & 1;
    }
    return false;
  }

  /**
   * Display a predefined symbol on the 5x5 LED matrix.
   * @param {object} args - the block's arguments.
   * @return {Promise} - a Promise that resolves after a tick.
   */
  displaySymbol(args) {
    const symbol = cast.toString(args.MATRIX).replace(/\s/g, '');
    const reducer = (accumulator, c, index) => {
      const value = c === '0' ? accumulator : accumulator + Math.pow(2, index);
      return value;
    };
    const hex = symbol.split('').reduce(reducer, 0);
    if (hex !== null) {
      this._peripheral.ledMatrixState[0] = hex & 0x1F;
      this._peripheral.ledMatrixState[1] = hex >> 5 & 0x1F;
      this._peripheral.ledMatrixState[2] = hex >> 10 & 0x1F;
      this._peripheral.ledMatrixState[3] = hex >> 15 & 0x1F;
      this._peripheral.ledMatrixState[4] = hex >> 20 & 0x1F;
      this._peripheral.displayMatrix(this._peripheral.ledMatrixState);
    }
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, BLESendInterval);
    });
  }

  /**
   * Display text on the 5x5 LED matrix.
   * @param {object} args - the block's arguments.
   * @return {Promise} - a Promise that resolves after the text is done printing.
   * Note the limit is 19 characters
   * The print time is calculated by multiplying the number of horizontal pixels
   * by the default scroll delay of 120ms.
   * The number of horizontal pixels = 6px for each character in the string,
   * 1px before the string, and 5px after the string.
   */
  displayText(args) {
    const text = String(args.TEXT).substring(0, 19);
    if (text.length > 0) this._peripheral.displayText(text);
    const yieldDelay = 120 * (6 * text.length + 6);
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, yieldDelay);
    });
  }

  /**
   * Turn all 5x5 matrix LEDs off.
   * @return {Promise} - a Promise that resolves after a tick.
   */
  displayClear() {
    for (let i = 0; i < 5; i++) {
      this._peripheral.ledMatrixState[i] = 0;
    }
    this._peripheral.displayMatrix(this._peripheral.ledMatrixState);
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, BLESendInterval);
    });
  }

  /**
   * Test whether the tilt sensor is currently tilted.
   * @param {object} args - the block's arguments.
   * @property {TiltDirection} DIRECTION - the tilt direction to test (front, back, left, right, or any).
   * @return {boolean} - true if the tilt sensor is tilted past a threshold in the specified direction.
   */
  whenTilted(args) {
    return this._isTilted(args.DIRECTION);
  }

  /**
   * Test whether the tilt sensor is currently tilted.
   * @param {object} args - the block's arguments.
   * @property {TiltDirection} DIRECTION - the tilt direction to test (front, back, left, right, or any).
   * @return {boolean} - true if the tilt sensor is tilted past a threshold in the specified direction.
   */
  isTilted(args) {
    return this._isTilted(args.DIRECTION);
  }

  /**
   * @param {object} args - the block's arguments.
   * @property {TiltDirection} DIRECTION - the direction (front, back, left, right) to check.
   * @return {number} - the tilt sensor's angle in the specified direction.
   * Note that getTiltAngle(front) = -getTiltAngle(back) and getTiltAngle(left) = -getTiltAngle(right).
   */
  getTiltAngle(args) {
    return this._getTiltAngle(args.DIRECTION);
  }

  /**
   * Test whether the tilt sensor is currently tilted.
   * @param {TiltDirection} direction - the tilt direction to test (front, back, left, right, or any).
   * @return {boolean} - true if the tilt sensor is tilted past a threshold in the specified direction.
   * @private
   */
  _isTilted(direction) {
    switch (direction) {
      case MicroBitTiltDirection.ANY:
        return Math.abs(this._peripheral.tiltX / 10) >= Scratch3MicroBitBlocks.TILT_THRESHOLD || Math.abs(this._peripheral.tiltY / 10) >= Scratch3MicroBitBlocks.TILT_THRESHOLD;
      default:
        return this._getTiltAngle(direction) >= Scratch3MicroBitBlocks.TILT_THRESHOLD;
    }
  }

  /**
   * @param {TiltDirection} direction - the direction (front, back, left, right) to check.
   * @return {number} - the tilt sensor's angle in the specified direction.
   * Note that getTiltAngle(front) = -getTiltAngle(back) and getTiltAngle(left) = -getTiltAngle(right).
   * @private
   */
  _getTiltAngle(direction) {
    switch (direction) {
      case MicroBitTiltDirection.FRONT:
        return Math.round(this._peripheral.tiltY / -10);
      case MicroBitTiltDirection.BACK:
        return Math.round(this._peripheral.tiltY / 10);
      case MicroBitTiltDirection.LEFT:
        return Math.round(this._peripheral.tiltX / -10);
      case MicroBitTiltDirection.RIGHT:
        return Math.round(this._peripheral.tiltX / 10);
      default:
        log.warn("Unknown tilt direction in _getTiltAngle: ".concat(direction));
    }
  }

  /**
   * @param {object} args - the block's arguments.
   * @return {boolean} - the touch pin state.
   * @private
   */
  whenPinConnected(args) {
    const pin = parseInt(args.PIN, 10);
    if (isNaN(pin)) return;
    if (pin < 0 || pin > 2) return false;
    return this._peripheral._checkPinState(pin);
  }
}
module.exports = Scratch3MicroBitBlocks;

/***/ }),

/***/ "./node_modules/scratch-vm/src/io/ble.js":
/*!***********************************************!*\
  !*** ./node_modules/scratch-vm/src/io/ble.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const JSONRPC = __webpack_require__(/*! ../util/jsonrpc */ "./node_modules/scratch-vm/src/util/jsonrpc.js");
class BLE extends JSONRPC {
  /**
   * A BLE peripheral socket object.  It handles connecting, over web sockets, to
   * BLE peripherals, and reading and writing data to them.
   * @param {Runtime} runtime - the Runtime for sending/receiving GUI update events.
   * @param {string} extensionId - the id of the extension using this socket.
   * @param {object} peripheralOptions - the list of options for peripheral discovery.
   * @param {object} connectCallback - a callback for connection.
   * @param {object} resetCallback - a callback for resetting extension state.
   */
  constructor(runtime, extensionId, peripheralOptions, connectCallback) {
    let resetCallback = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    super();
    this._socket = runtime.getScratchLinkSocket('BLE');
    this._socket.setOnOpen(this.requestPeripheral.bind(this));
    this._socket.setOnClose(this.handleDisconnectError.bind(this));
    this._socket.setOnError(this._handleRequestError.bind(this));
    this._socket.setHandleMessage(this._handleMessage.bind(this));
    this._sendMessage = this._socket.sendMessage.bind(this._socket);
    this._availablePeripherals = {};
    this._connectCallback = connectCallback;
    this._connected = false;
    this._characteristicDidChangeCallback = null;
    this._resetCallback = resetCallback;
    this._discoverTimeoutID = null;
    this._extensionId = extensionId;
    this._peripheralOptions = peripheralOptions;
    this._runtime = runtime;
    this._socket.open();
  }

  /**
   * Request connection to the peripheral.
   * If the web socket is not yet open, request when the socket promise resolves.
   */
  requestPeripheral() {
    this._availablePeripherals = {};
    if (this._discoverTimeoutID) {
      window.clearTimeout(this._discoverTimeoutID);
    }
    this._discoverTimeoutID = window.setTimeout(this._handleDiscoverTimeout.bind(this), 15000);
    this.sendRemoteRequest('discover', this._peripheralOptions).catch(e => {
      this._handleRequestError(e);
    });
  }

  /**
   * Try connecting to the input peripheral id, and then call the connect
   * callback if connection is successful.
   * @param {number} id - the id of the peripheral to connect to
   */
  connectPeripheral(id) {
    this.sendRemoteRequest('connect', {
      peripheralId: id
    }).then(() => {
      this._connected = true;
      this._runtime.emit(this._runtime.constructor.PERIPHERAL_CONNECTED);
      this._connectCallback();
    }).catch(e => {
      this._handleRequestError(e);
    });
  }

  /**
   * Close the websocket.
   */
  disconnect() {
    if (this._connected) {
      this._connected = false;
    }
    if (this._socket.isOpen()) {
      this._socket.close();
    }
    if (this._discoverTimeoutID) {
      window.clearTimeout(this._discoverTimeoutID);
    }

    // Sets connection status icon to orange
    this._runtime.emit(this._runtime.constructor.PERIPHERAL_DISCONNECTED);
  }

  /**
   * @return {bool} whether the peripheral is connected.
   */
  isConnected() {
    return this._connected;
  }

  /**
   * Start receiving notifications from the specified ble service.
   * @param {number} serviceId - the ble service to read.
   * @param {number} characteristicId - the ble characteristic to get notifications from.
   * @param {object} onCharacteristicChanged - callback for characteristic change notifications.
   * @return {Promise} - a promise from the remote startNotifications request.
   */
  startNotifications(serviceId, characteristicId) {
    let onCharacteristicChanged = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    const params = {
      serviceId,
      characteristicId
    };
    this._characteristicDidChangeCallback = onCharacteristicChanged;
    return this.sendRemoteRequest('startNotifications', params).catch(e => {
      this.handleDisconnectError(e);
    });
  }

  /**
   * Read from the specified ble service.
   * @param {number} serviceId - the ble service to read.
   * @param {number} characteristicId - the ble characteristic to read.
   * @param {boolean} optStartNotifications - whether to start receiving characteristic change notifications.
   * @param {object} onCharacteristicChanged - callback for characteristic change notifications.
   * @return {Promise} - a promise from the remote read request.
   */
  read(serviceId, characteristicId) {
    let optStartNotifications = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    let onCharacteristicChanged = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    const params = {
      serviceId,
      characteristicId
    };
    if (optStartNotifications) {
      params.startNotifications = true;
    }
    if (onCharacteristicChanged) {
      this._characteristicDidChangeCallback = onCharacteristicChanged;
    }
    return this.sendRemoteRequest('read', params).catch(e => {
      this.handleDisconnectError(e);
    });
  }

  /**
   * Write data to the specified ble service.
   * @param {number} serviceId - the ble service to write.
   * @param {number} characteristicId - the ble characteristic to write.
   * @param {string} message - the message to send.
   * @param {string} encoding - the message encoding type.
   * @param {boolean} withResponse - if true, resolve after peripheral's response.
   * @return {Promise} - a promise from the remote send request.
   */
  write(serviceId, characteristicId, message) {
    let encoding = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    let withResponse = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    const params = {
      serviceId,
      characteristicId,
      message
    };
    if (encoding) {
      params.encoding = encoding;
    }
    if (withResponse !== null) {
      params.withResponse = withResponse;
    }
    return this.sendRemoteRequest('write', params).catch(e => {
      this.handleDisconnectError(e);
    });
  }

  /**
   * Handle a received call from the socket.
   * @param {string} method - a received method label.
   * @param {object} params - a received list of parameters.
   * @return {object} - optional return value.
   */
  didReceiveCall(method, params) {
    switch (method) {
      case 'didDiscoverPeripheral':
        this._availablePeripherals[params.peripheralId] = params;
        this._runtime.emit(this._runtime.constructor.PERIPHERAL_LIST_UPDATE, this._availablePeripherals);
        if (this._discoverTimeoutID) {
          window.clearTimeout(this._discoverTimeoutID);
        }
        break;
      case 'userDidPickPeripheral':
        this._availablePeripherals[params.peripheralId] = params;
        this._runtime.emit(this._runtime.constructor.USER_PICKED_PERIPHERAL, this._availablePeripherals);
        if (this._discoverTimeoutID) {
          window.clearTimeout(this._discoverTimeoutID);
        }
        break;
      case 'userDidNotPickPeripheral':
        this._runtime.emit(this._runtime.constructor.PERIPHERAL_SCAN_TIMEOUT);
        if (this._discoverTimeoutID) {
          window.clearTimeout(this._discoverTimeoutID);
        }
        break;
      case 'characteristicDidChange':
        if (this._characteristicDidChangeCallback) {
          this._characteristicDidChangeCallback(params.message);
        }
        break;
      case 'ping':
        return 42;
    }
  }

  /**
   * Handle an error resulting from losing connection to a peripheral.
   *
   * This could be due to:
   * - battery depletion
   * - going out of bluetooth range
   * - being powered down
   *
   * Disconnect the socket, and if the extension using this socket has a
   * reset callback, call it. Finally, emit an error to the runtime.
   */
  handleDisconnectError(/* e */
  ) {
    // log.error(`BLE error: ${JSON.stringify(e)}`);

    if (!this._connected) return;
    this.disconnect();
    if (this._resetCallback) {
      this._resetCallback();
    }
    this._runtime.emit(this._runtime.constructor.PERIPHERAL_CONNECTION_LOST_ERROR, {
      message: "Scratch lost connection to",
      extensionId: this._extensionId
    });
  }
  _handleRequestError(/* e */
  ) {
    // log.error(`BLE error: ${JSON.stringify(e)}`);

    this._runtime.emit(this._runtime.constructor.PERIPHERAL_REQUEST_ERROR, {
      message: "Scratch lost connection to",
      extensionId: this._extensionId
    });
  }
  _handleDiscoverTimeout() {
    if (this._discoverTimeoutID) {
      window.clearTimeout(this._discoverTimeoutID);
    }
    this._runtime.emit(this._runtime.constructor.PERIPHERAL_SCAN_TIMEOUT);
  }
}
module.exports = BLE;

/***/ }),

/***/ "./node_modules/scratch-vm/src/util/base64-util.js":
/*!*********************************************************!*\
  !*** ./node_modules/scratch-vm/src/util/base64-util.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const atob = __webpack_require__(/*! atob */ "./node_modules/atob/browser-atob.js");
const btoa = __webpack_require__(/*! btoa */ "./node_modules/btoa/index.js");
class Base64Util {
  /**
   * Convert a base64 encoded string to a Uint8Array.
   * @param {string} base64 - a base64 encoded string.
   * @return {Uint8Array} - a decoded Uint8Array.
   */
  static base64ToUint8Array(base64) {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const array = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      array[i] = binaryString.charCodeAt(i);
    }
    return array;
  }

  /**
   * Convert a Uint8Array to a base64 encoded string.
   * @param {Uint8Array} array - the array to convert.
   * @return {string} - the base64 encoded string.
   */
  static uint8ArrayToBase64(array) {
    let binary = '';
    const len = array.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(array[i]);
    }
    return btoa(binary);
  }

  /**
  * Convert an array buffer to a base64 encoded string.
  * @param {array} buffer - an array buffer to convert.
  * @return {string} - the base64 encoded string.
  */
  static arrayBufferToBase64(buffer) {
    return Base64Util.uint8ArrayToBase64(new Uint8Array(buffer));
  }
}
module.exports = Base64Util;

/***/ }),

/***/ "./node_modules/scratch-vm/src/util/jsonrpc.js":
/*!*****************************************************!*\
  !*** ./node_modules/scratch-vm/src/util/jsonrpc.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

class JSONRPC {
  constructor() {
    this._requestID = 0;
    this._openRequests = {};
  }

  /**
   * Make an RPC request and retrieve the result.
   * @param {string} method - the remote method to call.
   * @param {object} params - the parameters to pass to the remote method.
   * @returns {Promise} - a promise for the result of the call.
   */
  sendRemoteRequest(method, params) {
    const requestID = this._requestID++;
    const promise = new Promise((resolve, reject) => {
      this._openRequests[requestID] = {
        resolve,
        reject
      };
    });
    this._sendRequest(method, params, requestID);
    return promise;
  }

  /**
   * Make an RPC notification with no expectation of a result or callback.
   * @param {string} method - the remote method to call.
   * @param {object} params - the parameters to pass to the remote method.
   */
  sendRemoteNotification(method, params) {
    this._sendRequest(method, params);
  }

  /**
   * Handle an RPC request from remote, should return a result or Promise for result, if appropriate.
   * @param {string} method - the method requested by the remote caller.
   * @param {object} params - the parameters sent with the remote caller's request.
   */
  didReceiveCall(/* method , params */
  ) {
    throw new Error('Must override didReceiveCall');
  }
  _sendMessage(/* jsonMessageObject */
  ) {
    throw new Error('Must override _sendMessage');
  }
  _sendRequest(method, params, id) {
    const request = {
      jsonrpc: '2.0',
      method,
      params
    };
    if (id !== null) {
      request.id = id;
    }
    this._sendMessage(request);
  }
  _handleMessage(json) {
    if (json.jsonrpc !== '2.0') {
      throw new Error("Bad or missing JSON-RPC version in message: ".concat(json));
    }
    if (json.hasOwnProperty('method')) {
      this._handleRequest(json);
    } else {
      this._handleResponse(json);
    }
  }
  _sendResponse(id, result, error) {
    const response = {
      jsonrpc: '2.0',
      id
    };
    if (error) {
      response.error = error;
    } else {
      response.result = result || null;
    }
    this._sendMessage(response);
  }
  _handleResponse(json) {
    const result = json.result,
      error = json.error,
      id = json.id;
    const openRequest = this._openRequests[id];
    delete this._openRequests[id];
    if (openRequest) {
      if (error) {
        openRequest.reject(error);
      } else {
        openRequest.resolve(result);
      }
    }
  }
  _handleRequest(json) {
    const method = json.method,
      params = json.params,
      id = json.id;
    const rawResult = this.didReceiveCall(method, params);
    if (id) {
      Promise.resolve(rawResult).then(result => {
        this._sendResponse(id, result);
      }, error => {
        this._sendResponse(id, null, error);
      });
    }
  }
}
module.exports = JSONRPC;

/***/ })

}]);
//# sourceMappingURL=7.js.map