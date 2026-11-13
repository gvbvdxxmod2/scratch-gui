(window["webpackJsonpGUI"] = window["webpackJsonpGUI"] || []).push([[6],{

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

/***/ "./node_modules/scratch-vm/src/extensions/scratch3_wedo2/index.js":
/*!************************************************************************!*\
  !*** ./node_modules/scratch-vm/src/extensions/scratch3_wedo2/index.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const ArgumentType = __webpack_require__(/*! ../../extension-support/argument-type */ "./node_modules/scratch-vm/src/extension-support/argument-type.js");
const BlockType = __webpack_require__(/*! ../../extension-support/block-type */ "./node_modules/scratch-vm/src/extension-support/block-type.js");
const Cast = __webpack_require__(/*! ../../util/cast */ "./node_modules/scratch-vm/src/util/cast.js");
const formatMessage = __webpack_require__(/*! format-message */ "./node_modules/scratch-vm/node_modules/format-message/index.js");
const color = __webpack_require__(/*! ../../util/color */ "./node_modules/scratch-vm/src/util/color.js");
const BLE = __webpack_require__(/*! ../../io/ble */ "./node_modules/scratch-vm/src/io/ble.js");
const Base64Util = __webpack_require__(/*! ../../util/base64-util */ "./node_modules/scratch-vm/src/util/base64-util.js");
const MathUtil = __webpack_require__(/*! ../../util/math-util */ "./node_modules/scratch-vm/src/util/math-util.js");
const RateLimiter = __webpack_require__(/*! ../../util/rateLimiter.js */ "./node_modules/scratch-vm/src/util/rateLimiter.js");
const log = __webpack_require__(/*! ../../util/log */ "./node_modules/scratch-vm/src/util/log.js");

/**
 * Icon svg to be displayed at the left edge of each extension block, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len
const iconURI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAACXBIWXMAABYlAAAWJQFJUiTwAAAF8klEQVR4Ae2cbWxTVRjH/7ctbVc2tyEMNpWBk0VIkLcEjSAQgglTE5HEaKqJi1E/mbCP/dJA0kQbvzgTQ0Ki2T7V6AeYGoEPLJmGKPiyzZDwEpYJCHSbQIcbdLvres1zOa13Xbvdu2eTDp9fst329Lnn5XfPPfece7tphmFAmDkuccdDBDIRgUxEIBMRyEQEMhGBTEQgExHIRAQyEYFMRCATEchEBDIRgUxEIBMRyEQEMhGBTEQgExHIxMPNIByNVQBoBUDb7kgo2KTS9wBoUmFNkVCwW6U3A1gP4JJKHwxHY/S+WcW2RkLBVhV7AMAOAIMAGlWstbyOSCh4QMU2Uoy1PBVL+a7IqZu1vOZIKNg20/azBarGvKxebw9HY22RULADwBFLTBcATQnZl4lVEimN4ssteXQrQfstebQpmW1q30xshyqvxRLbofYnYW9ZYgeV8C5LLOWlzbTxM3ouHI7GPgSwWx3Z0syBSBku6IYnlTbM+uQenJQaMnKHDaqAFnDrcCFbl3G1defEjas0a4N/Vz10OybyvapfrSX1sjpo+WIz0ME7QL3djgtHPTAcjb2mepw/b2ZaGh5NL5RnofR8R99dIC5fHusK5JsrCUpm7TSx21XvbcwTNwnbAsPR2GcA3qaG+H0LsHlDPZ7fca/ujZ+cRW9/Em5vCXzlNVhQUjFpf/3OTSRvXkKJz43Xt1bh1S1LUeq/5+njQ9/iVmLIfL1ieRU2b1iFtavztXNu6TrTi8PfnYI67WdPoOp5przV9Y8iuHdb9rOW9uumPI+vDIElddBckztPOqVn5X36Xj1WVQeynx1sOWbK83jc2PviM/dFXIYNax9H55leXLoyYHsfWwI14JCRRx7x5ckBU1oheYQ+1G9u39lVM0Hej7+cR7w/Yb7e9+5LqChfaLvixcK088BwNNZkAOV02ubK6+odwt3RcfOULSSPGEveG48bNj08If3kqXPmdtO6unkpDzYn0u/TLxrzcumJJ80Ut79sygzoFF6/siw75mUYupOEpmnY0/A0pw33FTsCa+hX5oJhZXgkZb5zub2O20CnL7EwkPeCPm+wI7CEBvi5wuOZ36tJW7X3uGXJXAgxk8P4eNpRPEvgskqfuR0Z/BNGejxvDM3/5gs0pboWv+motqybCc+tqUCzz43kaBJ/X+2eMjZ3ClNsjIzo5ioknXZ2b4AlkKYltLJoaY9jOJm/B0KJbtg4c4F/XOmH3+dF9dLKbBo1OD6QQGV56YQ55ODtO0jcHkZ1VSX8/n9nB9S7RkZ1rFy+NG8ZR9s70TeQQKDEh7vJUdt1Y9/OopXFB2/WcbMpyOexE9mlFS21aLlHMmKHfzBl0QT/hV2bzM9oLXv0xG8YGR0zpdLEn6RT2k+/XjDzoLX2G3u3TZBLUyral/Z5qCyAK1f/sl2/or+IWNel1Eji3MWrpjyCZHWqdNrSe6ieSHFERl4mP+q5GehgHGvvRGal5XI5uzU47f3A/R99YTgdF2wXrmkolr9ToZ5NvTjT4yOhoC2T057CJM/r9WDxoqmXa07R9THcuDVcMO8bt4ag6ynULKvkFjWBTLl0ugZKvNlyqLeSQKfYGgOpgXt2b5zVhlzrS+Dr451YvKg0b95txztxvS8xZ+VuXFuLJ5+oNgV+9c3PuHDxGs6cu+w4v//9RJo6x5bN9UgbBo4cPY1U6j+cSD8orFvzGFYuX4KxsRQGbth6FCICc9m5dY05HtN46AQRqPB5PWjY+ZT5RnMwkxGBFh5ZVmle9Z3MrGbjwfqccrC1vajrV7QCaVCfS6qrJj96nQlFK5CujPRT7MgYyEQEMhGBTGwJpAW4kJ9pBbo0zbx70X7y7AOv8HxP3LyB4YTpb2cZBt2iqL3QEwf9zDbX+waLca439QMeC7a+YBmOxugLiM/OTt2yaOoMoO+H6LOcNwf6xusrthsh/7mIh1yFmYhAJiKQiQhkIgKZiEAmIpCJCGQiApmIQCYikIkIZCICmYhAJiKQiQhkIgKZiEAmIpCJCGQiAjkA+AeOwQKMcWZqHgAAAABJRU5ErkJggg==';

/**
 * A list of WeDo 2.0 BLE service UUIDs.
 * @enum
 */
const BLEService = {
  DEVICE_SERVICE: '00001523-1212-efde-1523-785feabcd123',
  IO_SERVICE: '00004f0e-1212-efde-1523-785feabcd123'
};

/**
 * A list of WeDo 2.0 BLE characteristic UUIDs.
 *
 * Characteristics on DEVICE_SERVICE:
 * - ATTACHED_IO
 *
 * Characteristics on IO_SERVICE:
 * - INPUT_VALUES
 * - INPUT_COMMAND
 * - OUTPUT_COMMAND
 *
 * @enum
 */
const BLECharacteristic = {
  ATTACHED_IO: '00001527-1212-efde-1523-785feabcd123',
  LOW_VOLTAGE_ALERT: '00001528-1212-efde-1523-785feabcd123',
  INPUT_VALUES: '00001560-1212-efde-1523-785feabcd123',
  INPUT_COMMAND: '00001563-1212-efde-1523-785feabcd123',
  OUTPUT_COMMAND: '00001565-1212-efde-1523-785feabcd123'
};

/**
 * A time interval to wait (in milliseconds) in between battery check calls.
 * @type {number}
 */
const BLEBatteryCheckInterval = 5000;

/**
 * A time interval to wait (in milliseconds) while a block that sends a BLE message is running.
 * @type {number}
 */
const BLESendInterval = 100;

/**
 * A maximum number of BLE message sends per second, to be enforced by the rate limiter.
 * @type {number}
 */
const BLESendRateMax = 20;

/**
 * Enum for WeDo 2.0 sensor and output types.
 * @readonly
 * @enum {number}
 */
const WeDo2Device = {
  MOTOR: 1,
  PIEZO: 22,
  LED: 23,
  TILT: 34,
  DISTANCE: 35
};

/**
 * Enum for connection/port ids assigned to internal WeDo 2.0 output devices.
 * @readonly
 * @enum {number}
 */
// TODO: Check for these more accurately at startup?
const WeDo2ConnectID = {
  LED: 6,
  PIEZO: 5
};

/**
 * Enum for ids for various output commands on the WeDo 2.0.
 * @readonly
 * @enum {number}
 */
const WeDo2Command = {
  MOTOR_POWER: 1,
  PLAY_TONE: 2,
  STOP_TONE: 3,
  WRITE_RGB: 4,
  SET_VOLUME: 255
};

/**
 * Enum for modes for input sensors on the WeDo 2.0.
 * @enum {number}
 */
const WeDo2Mode = {
  TILT: 0,
  // angle
  DISTANCE: 0,
  // detect
  LED: 1 // RGB
};

/**
 * Enum for units for input sensors on the WeDo 2.0.
 *
 * 0 = raw
 * 1 = percent
 *
 * @enum {number}
 */
const WeDo2Unit = {
  TILT: 0,
  DISTANCE: 1,
  LED: 0
};

/**
 * Manage power, direction, and timers for one WeDo 2.0 motor.
 */
class WeDo2Motor {
  /**
   * Construct a WeDo 2.0 Motor instance.
   * @param {WeDo2} parent - the WeDo 2.0 peripheral which owns this motor.
   * @param {int} index - the zero-based index of this motor on its parent peripheral.
   */
  constructor(parent, index) {
    /**
     * The WeDo 2.0 peripheral which owns this motor.
     * @type {WeDo2}
     * @private
     */
    this._parent = parent;

    /**
     * The zero-based index of this motor on its parent peripheral.
     * @type {int}
     * @private
     */
    this._index = index;

    /**
     * This motor's current direction: 1 for "this way" or -1 for "that way"
     * @type {number}
     * @private
     */
    this._direction = 1;

    /**
     * This motor's current power level, in the range [0,100].
     * @type {number}
     * @private
     */
    this._power = 100;

    /**
     * Is this motor currently moving?
     * @type {boolean}
     * @private
     */
    this._isOn = false;

    /**
     * If the motor has been turned on or is actively braking for a specific duration, this is the timeout ID for
     * the end-of-action handler. Cancel this when changing plans.
     * @type {Object}
     * @private
     */
    this._pendingTimeoutId = null;

    /**
     * The starting time for the pending timeout.
     * @type {Object}
     * @private
     */
    this._pendingTimeoutStartTime = null;

    /**
     * The delay/duration of the pending timeout.
     * @type {Object}
     * @private
     */
    this._pendingTimeoutDelay = null;
    this.startBraking = this.startBraking.bind(this);
    this.turnOff = this.turnOff.bind(this);
  }

  /**
   * @return {number} - the duration of active braking after a call to startBraking(). Afterward, turn the motor off.
   * @constructor
   */
  static get BRAKE_TIME_MS() {
    return 1000;
  }

  /**
   * @return {int} - this motor's current direction: 1 for "this way" or -1 for "that way"
   */
  get direction() {
    return this._direction;
  }

  /**
   * @param {int} value - this motor's new direction: 1 for "this way" or -1 for "that way"
   */
  set direction(value) {
    if (value < 0) {
      this._direction = -1;
    } else {
      this._direction = 1;
    }
  }

  /**
   * @return {int} - this motor's current power level, in the range [0,100].
   */
  get power() {
    return this._power;
  }

  /**
   * @param {int} value - this motor's new power level, in the range [0,100].
   */
  set power(value) {
    const p = Math.max(0, Math.min(value, 100));
    // Lego Wedo 2.0 hub only turns motors at power range [30 - 100], so
    // map value from [0 - 100] to [30 - 100].
    if (p === 0) {
      this._power = 0;
    } else {
      const delta = 100 / p;
      this._power = 30 + 70 / delta;
    }
  }

  /**
   * @return {boolean} - true if this motor is currently moving, false if this motor is off or braking.
   */
  get isOn() {
    return this._isOn;
  }

  /**
   * @return {boolean} - time, in milliseconds, of when the pending timeout began.
   */
  get pendingTimeoutStartTime() {
    return this._pendingTimeoutStartTime;
  }

  /**
   * @return {boolean} - delay, in milliseconds, of the pending timeout.
   */
  get pendingTimeoutDelay() {
    return this._pendingTimeoutDelay;
  }

  /**
   * Turn this motor on indefinitely.
   */
  turnOn() {
    if (this._power === 0) return;
    const cmd = this._parent.generateOutputCommand(this._index + 1, WeDo2Command.MOTOR_POWER, [this._power * this._direction] // power in range 0-100
    );
    this._parent.send(BLECharacteristic.OUTPUT_COMMAND, cmd);
    this._isOn = true;
    this._clearTimeout();
  }

  /**
   * Turn this motor on for a specific duration.
   * @param {number} milliseconds - run the motor for this long.
   */
  turnOnFor(milliseconds) {
    if (this._power === 0) return;
    milliseconds = Math.max(0, milliseconds);
    this.turnOn();
    this._setNewTimeout(this.startBraking, milliseconds);
  }

  /**
   * Start active braking on this motor. After a short time, the motor will turn off.
   */
  startBraking() {
    if (this._power === 0) return;
    const cmd = this._parent.generateOutputCommand(this._index + 1, WeDo2Command.MOTOR_POWER, [127] // 127 = break
    );
    this._parent.send(BLECharacteristic.OUTPUT_COMMAND, cmd);
    this._isOn = false;
    this._setNewTimeout(this.turnOff, WeDo2Motor.BRAKE_TIME_MS);
  }

  /**
   * Turn this motor off.
   * @param {boolean} [useLimiter=true] - if true, use the rate limiter
   */
  turnOff() {
    let useLimiter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    if (this._power === 0) return;
    const cmd = this._parent.generateOutputCommand(this._index + 1, WeDo2Command.MOTOR_POWER, [0] // 0 = stop
    );
    this._parent.send(BLECharacteristic.OUTPUT_COMMAND, cmd, useLimiter);
    this._isOn = false;
  }

  /**
   * Clear the motor action timeout, if any. Safe to call even when there is no pending timeout.
   * @private
   */
  _clearTimeout() {
    if (this._pendingTimeoutId !== null) {
      clearTimeout(this._pendingTimeoutId);
      this._pendingTimeoutId = null;
      this._pendingTimeoutStartTime = null;
      this._pendingTimeoutDelay = null;
    }
  }

  /**
   * Set a new motor action timeout, after clearing an existing one if necessary.
   * @param {Function} callback - to be called at the end of the timeout.
   * @param {int} delay - wait this many milliseconds before calling the callback.
   * @private
   */
  _setNewTimeout(callback, delay) {
    this._clearTimeout();
    const timeoutID = setTimeout(() => {
      if (this._pendingTimeoutId === timeoutID) {
        this._pendingTimeoutId = null;
        this._pendingTimeoutStartTime = null;
        this._pendingTimeoutDelay = null;
      }
      callback();
    }, delay);
    this._pendingTimeoutId = timeoutID;
    this._pendingTimeoutStartTime = Date.now();
    this._pendingTimeoutDelay = delay;
  }
}

/**
 * Manage communication with a WeDo 2.0 peripheral over a Bluetooth Low Energy client socket.
 */
class WeDo2 {
  constructor(runtime, extensionId) {
    /**
     * The Scratch 3.0 runtime used to trigger the green flag button.
     * @type {Runtime}
     * @private
     */
    this._runtime = runtime;
    this._runtime.on('PROJECT_STOP_ALL', this.stopAll.bind(this));

    /**
     * The id of the extension this peripheral belongs to.
     */
    this._extensionId = extensionId;

    /**
     * A list of the ids of the motors or sensors in ports 1 and 2.
     * @type {string[]}
     * @private
     */
    this._ports = ['none', 'none'];

    /**
     * The motors which this WeDo 2.0 could possibly have.
     * @type {WeDo2Motor[]}
     * @private
     */
    this._motors = [null, null];

    /**
     * The most recently received value for each sensor.
     * @type {Object.<string, number>}
     * @private
     */
    this._sensors = {
      tiltX: 0,
      tiltY: 0,
      distance: 0
    };

    /**
     * The Bluetooth connection socket for reading/writing peripheral data.
     * @type {BLE}
     * @private
     */
    this._ble = null;
    this._runtime.registerPeripheralExtension(extensionId, this);

    /**
     * A rate limiter utility, to help limit the rate at which we send BLE messages
     * over the socket to Scratch Link to a maximum number of sends per second.
     * @type {RateLimiter}
     * @private
     */
    this._rateLimiter = new RateLimiter(BLESendRateMax);

    /**
     * An interval id for the battery check interval.
     * @type {number}
     * @private
     */
    this._batteryLevelIntervalId = null;
    this.reset = this.reset.bind(this);
    this._onConnect = this._onConnect.bind(this);
    this._onMessage = this._onMessage.bind(this);
    this._checkBatteryLevel = this._checkBatteryLevel.bind(this);
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
   * @return {number} - the latest value received from the distance sensor.
   */
  get distance() {
    return this._sensors.distance;
  }

  /**
   * Access a particular motor on this peripheral.
   * @param {int} index - the zero-based index of the desired motor.
   * @return {WeDo2Motor} - the WeDo2Motor instance, if any, at that index.
   */
  motor(index) {
    return this._motors[index];
  }

  /**
   * Stop all the motors that are currently running.
   */
  stopAllMotors() {
    this._motors.forEach(motor => {
      if (motor) {
        // Send the motor off command without using the rate limiter.
        // This allows the stop button to stop motors even if we are
        // otherwise flooded with commands.
        motor.turnOff(false);
      }
    });
  }

  /**
   * Set the WeDo 2.0 peripheral's LED to a specific color.
   * @param {int} inputRGB - a 24-bit RGB color in 0xRRGGBB format.
   * @return {Promise} - a promise of the completion of the set led send operation.
   */
  setLED(inputRGB) {
    const rgb = [inputRGB >> 16 & 0x000000FF, inputRGB >> 8 & 0x000000FF, inputRGB & 0x000000FF];
    const cmd = this.generateOutputCommand(WeDo2ConnectID.LED, WeDo2Command.WRITE_RGB, rgb);
    return this.send(BLECharacteristic.OUTPUT_COMMAND, cmd);
  }

  /**
   * Sets the input mode of the LED to RGB.
   * @return {Promise} - a promise returned by the send operation.
   */
  setLEDMode() {
    const cmd = this.generateInputCommand(WeDo2ConnectID.LED, WeDo2Device.LED, WeDo2Mode.LED, 0, WeDo2Unit.LED, false);
    return this.send(BLECharacteristic.INPUT_COMMAND, cmd);
  }

  /**
   * Switch off the LED on the WeDo 2.0.
   * @return {Promise} - a promise of the completion of the stop led send operation.
   */
  stopLED() {
    const cmd = this.generateOutputCommand(WeDo2ConnectID.LED, WeDo2Command.WRITE_RGB, [0, 0, 0]);
    return this.send(BLECharacteristic.OUTPUT_COMMAND, cmd);
  }

  /**
   * Play a tone from the WeDo 2.0 peripheral for a specific amount of time.
   * @param {int} tone - the pitch of the tone, in Hz.
   * @param {int} milliseconds - the duration of the note, in milliseconds.
   * @return {Promise} - a promise of the completion of the play tone send operation.
   */
  playTone(tone, milliseconds) {
    const cmd = this.generateOutputCommand(WeDo2ConnectID.PIEZO, WeDo2Command.PLAY_TONE, [tone, tone >> 8, milliseconds, milliseconds >> 8]);
    return this.send(BLECharacteristic.OUTPUT_COMMAND, cmd);
  }

  /**
   * Stop the tone playing from the WeDo 2.0 peripheral, if any.
   * @return {Promise} - a promise that the command sent.
   */
  stopTone() {
    const cmd = this.generateOutputCommand(WeDo2ConnectID.PIEZO, WeDo2Command.STOP_TONE);

    // Send this command without using the rate limiter, because it is
    // only triggered by the stop button.
    return this.send(BLECharacteristic.OUTPUT_COMMAND, cmd, false);
  }

  /**
   * Stop the tone playing and motors on the WeDo 2.0 peripheral.
   */
  stopAll() {
    if (!this.isConnected()) return;
    this.stopTone();
    this.stopAllMotors();
  }

  /**
   * Called by the runtime when user wants to scan for a WeDo 2.0 peripheral.
   */
  scan() {
    if (this._ble) {
      this._ble.disconnect();
    }
    this._ble = new BLE(this._runtime, this._extensionId, {
      filters: [{
        services: [BLEService.DEVICE_SERVICE]
      }],
      optionalServices: [BLEService.IO_SERVICE]
    }, this._onConnect, this.reset);
  }

  /**
   * Called by the runtime when user wants to connect to a certain WeDo 2.0 peripheral.
   * @param {number} id - the id of the peripheral to connect to.
   */
  connect(id) {
    if (this._ble) {
      this._ble.connectPeripheral(id);
    }
  }

  /**
   * Disconnects from the current BLE socket.
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
    this._ports = ['none', 'none'];
    this._motors = [null, null];
    this._sensors = {
      tiltX: 0,
      tiltY: 0,
      distance: 0
    };
    if (this._batteryLevelIntervalId) {
      window.clearInterval(this._batteryLevelIntervalId);
      this._batteryLevelIntervalId = null;
    }
  }

  /**
   * Called by the runtime to detect whether the WeDo 2.0 peripheral is connected.
   * @return {boolean} - the connected state.
   */
  isConnected() {
    let connected = false;
    if (this._ble) {
      connected = this._ble.isConnected();
    }
    return connected;
  }

  /**
   * Write a message to the WeDo 2.0 peripheral BLE socket.
   * @param {number} uuid - the UUID of the characteristic to write to
   * @param {Array} message - the message to write.
   * @param {boolean} [useLimiter=true] - if true, use the rate limiter
   * @return {Promise} - a promise result of the write operation
   */
  send(uuid, message) {
    let useLimiter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    if (!this.isConnected()) return Promise.resolve();
    if (useLimiter) {
      if (!this._rateLimiter.okayToSend()) return Promise.resolve();
    }
    return this._ble.write(BLEService.IO_SERVICE, uuid, Base64Util.uint8ArrayToBase64(message), 'base64');
  }

  /**
   * Generate a WeDo 2.0 'Output Command' in the byte array format
   * (CONNECT ID, COMMAND ID, NUMBER OF BYTES, VALUES ...).
   *
   * This sends a command to the WeDo 2.0 to actuate the specified outputs.
   *
   * @param  {number} connectID - the port (Connect ID) to send a command to.
   * @param  {number} commandID - the id of the byte command.
   * @param  {array}  values    - the list of values to write to the command.
   * @return {array}            - a generated output command.
   */
  generateOutputCommand(connectID, commandID) {
    let values = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    let command = [connectID, commandID];
    if (values) {
      command = command.concat(values.length).concat(values);
    }
    return command;
  }

  /**
   * Generate a WeDo 2.0 'Input Command' in the byte array format
   * (COMMAND ID, COMMAND TYPE, CONNECT ID, TYPE ID, MODE, DELTA INTERVAL (4 BYTES),
   * UNIT, NOTIFICATIONS ENABLED).
   *
   * This sends a command to the WeDo 2.0 that sets that input format
   * of the specified inputs and sets value change notifications.
   *
   * @param  {number}  connectID           - the port (Connect ID) to send a command to.
   * @param  {number}  type                - the type of input sensor.
   * @param  {number}  mode                - the mode of the input sensor.
   * @param  {number}  delta               - the delta change needed to trigger notification.
   * @param  {array}   units               - the unit of the input sensor value.
   * @param  {boolean} enableNotifications - whether to enable notifications.
   * @return {array}                       - a generated input command.
   */
  generateInputCommand(connectID, type, mode, delta, units, enableNotifications) {
    const command = [1,
    // Command ID = 1 = "Sensor Format"
    2,
    // Command Type = 2 = "Write"
    connectID, type, mode, delta, 0,
    // Delta Interval Byte 2
    0,
    // Delta Interval Byte 3
    0,
    // Delta Interval Byte 4
    units, enableNotifications ? 1 : 0];
    return command;
  }

  /**
   * Sets LED mode and initial color and starts reading data from peripheral after BLE has connected.
   * @private
   */
  _onConnect() {
    this.setLEDMode();
    this.setLED(0x0000FF);
    this._ble.startNotifications(BLEService.DEVICE_SERVICE, BLECharacteristic.ATTACHED_IO, this._onMessage);
    this._batteryLevelIntervalId = window.setInterval(this._checkBatteryLevel, BLEBatteryCheckInterval);
  }

  /**
   * Process the sensor data from the incoming BLE characteristic.
   * @param {object} base64 - the incoming BLE data.
   * @private
   */
  _onMessage(base64) {
    const data = Base64Util.base64ToUint8Array(base64);
    // log.info(data);

    /**
     * If first byte of data is '1' or '2', then either clear the
     * sensor present in ports 1 or 2 or set their format.
     *
     * If first byte of data is anything else, read incoming sensor value.
     */
    switch (data[0]) {
      case 1:
      case 2:
        {
          const connectID = data[0];
          if (data[1] === 0) {
            // clear sensor or motor
            this._clearPort(connectID);
          } else {
            // register sensor or motor
            this._registerSensorOrMotor(connectID, data[3]);
          }
          break;
        }
      default:
        {
          // read incoming sensor value
          const connectID = data[1];
          const type = this._ports[connectID - 1];
          if (type === WeDo2Device.DISTANCE) {
            this._sensors.distance = data[2];
          }
          if (type === WeDo2Device.TILT) {
            this._sensors.tiltX = data[2];
            this._sensors.tiltY = data[3];
          }
          break;
        }
    }
  }

  /**
   * Check the battery level on the WeDo 2.0. If the WeDo 2.0 has disconnected
   * for some reason, the BLE socket will get an error back and automatically
   * close the socket.
   */
  _checkBatteryLevel() {
    this._ble.read(BLEService.DEVICE_SERVICE, BLECharacteristic.LOW_VOLTAGE_ALERT, false);
  }

  /**
   * Register a new sensor or motor connected at a port.  Store the type of
   * sensor or motor internally, and then register for notifications on input
   * values if it is a sensor.
   * @param {number} connectID - the port to register a sensor or motor on.
   * @param {number} type - the type ID of the sensor or motor
   * @private
   */
  _registerSensorOrMotor(connectID, type) {
    // Record which port is connected to what type of device
    this._ports[connectID - 1] = type;

    // Record motor port
    if (type === WeDo2Device.MOTOR) {
      this._motors[connectID - 1] = new WeDo2Motor(this, connectID - 1);
    } else {
      // Set input format for tilt or distance sensor
      const typeString = type === WeDo2Device.DISTANCE ? 'DISTANCE' : 'TILT';
      const cmd = this.generateInputCommand(connectID, type, WeDo2Mode[typeString], 1, WeDo2Unit[typeString], true);
      this.send(BLECharacteristic.INPUT_COMMAND, cmd);
      this._ble.startNotifications(BLEService.IO_SERVICE, BLECharacteristic.INPUT_VALUES, this._onMessage);
    }
  }

  /**
   * Clear the sensor or motor present at port 1 or 2.
   * @param {number} connectID - the port to clear.
   * @private
   */
  _clearPort(connectID) {
    const type = this._ports[connectID - 1];
    if (type === WeDo2Device.TILT) {
      this._sensors.tiltX = this._sensors.tiltY = 0;
    }
    if (type === WeDo2Device.DISTANCE) {
      this._sensors.distance = 0;
    }
    this._ports[connectID - 1] = 'none';
    this._motors[connectID - 1] = null;
  }
}

/**
 * Enum for motor specification.
 * @readonly
 * @enum {string}
 */
const WeDo2MotorLabel = {
  DEFAULT: 'motor',
  A: 'motor A',
  B: 'motor B',
  ALL: 'all motors'
};

/**
 * Enum for motor direction specification.
 * @readonly
 * @enum {string}
 */
const WeDo2MotorDirection = {
  FORWARD: 'this way',
  BACKWARD: 'that way',
  REVERSE: 'reverse'
};

/**
 * Enum for tilt sensor direction.
 * @readonly
 * @enum {string}
 */
const WeDo2TiltDirection = {
  UP: 'up',
  DOWN: 'down',
  LEFT: 'left',
  RIGHT: 'right',
  ANY: 'any'
};

/**
 * Scratch 3.0 blocks to interact with a LEGO WeDo 2.0 peripheral.
 */
class Scratch3WeDo2Blocks {
  /**
   * @return {string} - the ID of this extension.
   */
  static get EXTENSION_ID() {
    return 'wedo2';
  }

  /**
   * @return {number} - the tilt sensor counts as "tilted" if its tilt angle meets or exceeds this threshold.
   */
  static get TILT_THRESHOLD() {
    return 15;
  }

  /**
   * Construct a set of WeDo 2.0 blocks.
   * @param {Runtime} runtime - the Scratch 3.0 runtime.
   */
  constructor(runtime) {
    /**
     * The Scratch 3.0 runtime.
     * @type {Runtime}
     */
    this.runtime = runtime;

    // Create a new WeDo 2.0 peripheral instance
    this._peripheral = new WeDo2(this.runtime, Scratch3WeDo2Blocks.EXTENSION_ID);
  }

  /**
   * @returns {object} metadata for this extension and its blocks.
   */
  getInfo() {
    return {
      id: Scratch3WeDo2Blocks.EXTENSION_ID,
      name: 'WeDo 2.0',
      blockIconURI: iconURI,
      showStatusButton: true,
      blocks: [{
        opcode: 'motorOnFor',
        text: formatMessage({
          id: 'wedo2.motorOnFor',
          default: 'turn [MOTOR_ID] on for [DURATION] seconds',
          description: 'turn a motor on for some time'
        }),
        blockType: BlockType.COMMAND,
        arguments: {
          MOTOR_ID: {
            type: ArgumentType.STRING,
            menu: 'MOTOR_ID',
            defaultValue: WeDo2MotorLabel.DEFAULT
          },
          DURATION: {
            type: ArgumentType.NUMBER,
            defaultValue: 1
          }
        }
      }, {
        opcode: 'motorOn',
        text: formatMessage({
          id: 'wedo2.motorOn',
          default: 'turn [MOTOR_ID] on',
          description: 'turn a motor on indefinitely'
        }),
        blockType: BlockType.COMMAND,
        arguments: {
          MOTOR_ID: {
            type: ArgumentType.STRING,
            menu: 'MOTOR_ID',
            defaultValue: WeDo2MotorLabel.DEFAULT
          }
        }
      }, {
        opcode: 'motorOff',
        text: formatMessage({
          id: 'wedo2.motorOff',
          default: 'turn [MOTOR_ID] off',
          description: 'turn a motor off'
        }),
        blockType: BlockType.COMMAND,
        arguments: {
          MOTOR_ID: {
            type: ArgumentType.STRING,
            menu: 'MOTOR_ID',
            defaultValue: WeDo2MotorLabel.DEFAULT
          }
        }
      }, {
        opcode: 'startMotorPower',
        text: formatMessage({
          id: 'wedo2.startMotorPower',
          default: 'set [MOTOR_ID] power to [POWER]',
          description: 'set the motor\'s power and turn it on'
        }),
        blockType: BlockType.COMMAND,
        arguments: {
          MOTOR_ID: {
            type: ArgumentType.STRING,
            menu: 'MOTOR_ID',
            defaultValue: WeDo2MotorLabel.DEFAULT
          },
          POWER: {
            type: ArgumentType.NUMBER,
            defaultValue: 100
          }
        }
      }, {
        opcode: 'setMotorDirection',
        text: formatMessage({
          id: 'wedo2.setMotorDirection',
          default: 'set [MOTOR_ID] direction to [MOTOR_DIRECTION]',
          description: 'set the motor\'s turn direction'
        }),
        blockType: BlockType.COMMAND,
        arguments: {
          MOTOR_ID: {
            type: ArgumentType.STRING,
            menu: 'MOTOR_ID',
            defaultValue: WeDo2MotorLabel.DEFAULT
          },
          MOTOR_DIRECTION: {
            type: ArgumentType.STRING,
            menu: 'MOTOR_DIRECTION',
            defaultValue: WeDo2MotorDirection.FORWARD
          }
        }
      }, {
        opcode: 'setLightHue',
        text: formatMessage({
          id: 'wedo2.setLightHue',
          default: 'set light color to [HUE]',
          description: 'set the LED color'
        }),
        blockType: BlockType.COMMAND,
        arguments: {
          HUE: {
            type: ArgumentType.NUMBER,
            defaultValue: 50
          }
        }
      }, {
        opcode: 'playNoteFor',
        text: formatMessage({
          id: 'wedo2.playNoteFor',
          default: 'play note [NOTE] for [DURATION] seconds',
          description: 'play a certain note for some time'
        }),
        blockType: BlockType.COMMAND,
        arguments: {
          NOTE: {
            type: ArgumentType.NUMBER,
            // TODO: ArgumentType.MIDI_NOTE?
            defaultValue: 60
          },
          DURATION: {
            type: ArgumentType.NUMBER,
            defaultValue: 0.5
          }
        },
        hideFromPalette: true
      }, {
        opcode: 'whenDistance',
        text: formatMessage({
          id: 'wedo2.whenDistance',
          default: 'when distance [OP] [REFERENCE]',
          description: 'check for when distance is < or > than reference'
        }),
        blockType: BlockType.HAT,
        arguments: {
          OP: {
            type: ArgumentType.STRING,
            menu: 'OP',
            defaultValue: '<'
          },
          REFERENCE: {
            type: ArgumentType.NUMBER,
            defaultValue: 50
          }
        }
      }, {
        opcode: 'whenTilted',
        text: formatMessage({
          id: 'wedo2.whenTilted',
          default: 'when tilted [TILT_DIRECTION_ANY]',
          description: 'check when tilted in a certain direction'
        }),
        func: 'isTilted',
        blockType: BlockType.HAT,
        arguments: {
          TILT_DIRECTION_ANY: {
            type: ArgumentType.STRING,
            menu: 'TILT_DIRECTION_ANY',
            defaultValue: WeDo2TiltDirection.ANY
          }
        }
      }, {
        opcode: 'getDistance',
        text: formatMessage({
          id: 'wedo2.getDistance',
          default: 'distance',
          description: 'the value returned by the distance sensor'
        }),
        blockType: BlockType.REPORTER
      }, {
        opcode: 'isTilted',
        text: formatMessage({
          id: 'wedo2.isTilted',
          default: 'tilted [TILT_DIRECTION_ANY]?',
          description: 'whether the tilt sensor is tilted'
        }),
        blockType: BlockType.BOOLEAN,
        arguments: {
          TILT_DIRECTION_ANY: {
            type: ArgumentType.STRING,
            menu: 'TILT_DIRECTION_ANY',
            defaultValue: WeDo2TiltDirection.ANY
          }
        }
      }, {
        opcode: 'getTiltAngle',
        text: formatMessage({
          id: 'wedo2.getTiltAngle',
          default: 'tilt angle [TILT_DIRECTION]',
          description: 'the angle returned by the tilt sensor'
        }),
        blockType: BlockType.REPORTER,
        arguments: {
          TILT_DIRECTION: {
            type: ArgumentType.STRING,
            menu: 'TILT_DIRECTION',
            defaultValue: WeDo2TiltDirection.UP
          }
        }
      }],
      menus: {
        MOTOR_ID: {
          acceptReporters: true,
          items: [{
            text: formatMessage({
              id: 'wedo2.motorId.default',
              default: 'motor',
              description: 'label for motor element in motor menu for LEGO WeDo 2 extension'
            }),
            value: WeDo2MotorLabel.DEFAULT
          }, {
            text: formatMessage({
              id: 'wedo2.motorId.a',
              default: 'motor A',
              description: 'label for motor A element in motor menu for LEGO WeDo 2 extension'
            }),
            value: WeDo2MotorLabel.A
          }, {
            text: formatMessage({
              id: 'wedo2.motorId.b',
              default: 'motor B',
              description: 'label for motor B element in motor menu for LEGO WeDo 2 extension'
            }),
            value: WeDo2MotorLabel.B
          }, {
            text: formatMessage({
              id: 'wedo2.motorId.all',
              default: 'all motors',
              description: 'label for all motors element in motor menu for LEGO WeDo 2 extension'
            }),
            value: WeDo2MotorLabel.ALL
          }]
        },
        MOTOR_DIRECTION: {
          acceptReporters: true,
          items: [{
            text: formatMessage({
              id: 'wedo2.motorDirection.forward',
              default: 'this way',
              description: 'label for forward element in motor direction menu for LEGO WeDo 2 extension'
            }),
            value: WeDo2MotorDirection.FORWARD
          }, {
            text: formatMessage({
              id: 'wedo2.motorDirection.backward',
              default: 'that way',
              description: 'label for backward element in motor direction menu for LEGO WeDo 2 extension'
            }),
            value: WeDo2MotorDirection.BACKWARD
          }, {
            text: formatMessage({
              id: 'wedo2.motorDirection.reverse',
              default: 'reverse',
              description: 'label for reverse element in motor direction menu for LEGO WeDo 2 extension'
            }),
            value: WeDo2MotorDirection.REVERSE
          }]
        },
        TILT_DIRECTION: {
          acceptReporters: true,
          items: [{
            text: formatMessage({
              id: 'wedo2.tiltDirection.up',
              default: 'up',
              description: 'label for up element in tilt direction menu for LEGO WeDo 2 extension'
            }),
            value: WeDo2TiltDirection.UP
          }, {
            text: formatMessage({
              id: 'wedo2.tiltDirection.down',
              default: 'down',
              description: 'label for down element in tilt direction menu for LEGO WeDo 2 extension'
            }),
            value: WeDo2TiltDirection.DOWN
          }, {
            text: formatMessage({
              id: 'wedo2.tiltDirection.left',
              default: 'left',
              description: 'label for left element in tilt direction menu for LEGO WeDo 2 extension'
            }),
            value: WeDo2TiltDirection.LEFT
          }, {
            text: formatMessage({
              id: 'wedo2.tiltDirection.right',
              default: 'right',
              description: 'label for right element in tilt direction menu for LEGO WeDo 2 extension'
            }),
            value: WeDo2TiltDirection.RIGHT
          }]
        },
        TILT_DIRECTION_ANY: {
          acceptReporters: true,
          items: [{
            text: formatMessage({
              id: 'wedo2.tiltDirection.up',
              default: 'up'
            }),
            value: WeDo2TiltDirection.UP
          }, {
            text: formatMessage({
              id: 'wedo2.tiltDirection.down',
              default: 'down'
            }),
            value: WeDo2TiltDirection.DOWN
          }, {
            text: formatMessage({
              id: 'wedo2.tiltDirection.left',
              default: 'left'
            }),
            value: WeDo2TiltDirection.LEFT
          }, {
            text: formatMessage({
              id: 'wedo2.tiltDirection.right',
              default: 'right'
            }),
            value: WeDo2TiltDirection.RIGHT
          }, {
            text: formatMessage({
              id: 'wedo2.tiltDirection.any',
              default: 'any',
              description: 'label for any element in tilt direction menu for LEGO WeDo 2 extension'
            }),
            value: WeDo2TiltDirection.ANY
          }]
        },
        OP: {
          acceptReporters: true,
          items: ['<', '>']
        }
      }
    };
  }

  /**
   * Turn specified motor(s) on for a specified duration.
   * @param {object} args - the block's arguments.
   * @property {MotorID} MOTOR_ID - the motor(s) to activate.
   * @property {int} DURATION - the amount of time to run the motors.
   * @return {Promise} - a promise which will resolve at the end of the duration.
   */
  motorOnFor(args) {
    // TODO: cast args.MOTOR_ID?
    let durationMS = Cast.toNumber(args.DURATION) * 1000;
    durationMS = MathUtil.clamp(durationMS, 0, 15000);
    return new Promise(resolve => {
      this._forEachMotor(args.MOTOR_ID, motorIndex => {
        const motor = this._peripheral.motor(motorIndex);
        if (motor) {
          motor.turnOnFor(durationMS);
        }
      });

      // Run for some time even when no motor is connected
      setTimeout(resolve, durationMS);
    });
  }

  /**
   * Turn specified motor(s) on indefinitely.
   * @param {object} args - the block's arguments.
   * @property {MotorID} MOTOR_ID - the motor(s) to activate.
   * @return {Promise} - a Promise that resolves after some delay.
   */
  motorOn(args) {
    // TODO: cast args.MOTOR_ID?
    this._forEachMotor(args.MOTOR_ID, motorIndex => {
      const motor = this._peripheral.motor(motorIndex);
      if (motor) {
        motor.turnOn();
      }
    });
    return new Promise(resolve => {
      window.setTimeout(() => {
        resolve();
      }, BLESendInterval);
    });
  }

  /**
   * Turn specified motor(s) off.
   * @param {object} args - the block's arguments.
   * @property {MotorID} MOTOR_ID - the motor(s) to deactivate.
   * @return {Promise} - a Promise that resolves after some delay.
   */
  motorOff(args) {
    // TODO: cast args.MOTOR_ID?
    this._forEachMotor(args.MOTOR_ID, motorIndex => {
      const motor = this._peripheral.motor(motorIndex);
      if (motor) {
        motor.turnOff();
      }
    });
    return new Promise(resolve => {
      window.setTimeout(() => {
        resolve();
      }, BLESendInterval);
    });
  }

  /**
   * Turn specified motor(s) off.
   * @param {object} args - the block's arguments.
   * @property {MotorID} MOTOR_ID - the motor(s) to be affected.
   * @property {int} POWER - the new power level for the motor(s).
   * @return {Promise} - a Promise that resolves after some delay.
   */
  startMotorPower(args) {
    // TODO: cast args.MOTOR_ID?
    this._forEachMotor(args.MOTOR_ID, motorIndex => {
      const motor = this._peripheral.motor(motorIndex);
      if (motor) {
        motor.power = MathUtil.clamp(Cast.toNumber(args.POWER), 0, 100);
        motor.turnOn();
      }
    });
    return new Promise(resolve => {
      window.setTimeout(() => {
        resolve();
      }, BLESendInterval);
    });
  }

  /**
   * Set the direction of rotation for specified motor(s).
   * If the direction is 'reverse' the motor(s) will be reversed individually.
   * @param {object} args - the block's arguments.
   * @property {MotorID} MOTOR_ID - the motor(s) to be affected.
   * @property {MotorDirection} MOTOR_DIRECTION - the new direction for the motor(s).
   * @return {Promise} - a Promise that resolves after some delay.
   */
  setMotorDirection(args) {
    // TODO: cast args.MOTOR_ID?
    this._forEachMotor(args.MOTOR_ID, motorIndex => {
      const motor = this._peripheral.motor(motorIndex);
      if (motor) {
        switch (args.MOTOR_DIRECTION) {
          case WeDo2MotorDirection.FORWARD:
            motor.direction = 1;
            break;
          case WeDo2MotorDirection.BACKWARD:
            motor.direction = -1;
            break;
          case WeDo2MotorDirection.REVERSE:
            motor.direction = -motor.direction;
            break;
          default:
            log.warn("Unknown motor direction in setMotorDirection: ".concat(args.DIRECTION));
            break;
        }
        // keep the motor on if it's running, and update the pending timeout if needed
        if (motor.isOn) {
          if (motor.pendingTimeoutDelay) {
            motor.turnOnFor(motor.pendingTimeoutStartTime + motor.pendingTimeoutDelay - Date.now());
          } else {
            motor.turnOn();
          }
        }
      }
    });
    return new Promise(resolve => {
      window.setTimeout(() => {
        resolve();
      }, BLESendInterval);
    });
  }

  /**
   * Set the LED's hue.
   * @param {object} args - the block's arguments.
   * @property {number} HUE - the hue to set, in the range [0,100].
   * @return {Promise} - a Promise that resolves after some delay.
   */
  setLightHue(args) {
    // Convert from [0,100] to [0,360]
    let inputHue = Cast.toNumber(args.HUE);
    inputHue = MathUtil.wrapClamp(inputHue, 0, 100);
    const hue = inputHue * 360 / 100;
    const rgbObject = color.hsvToRgb({
      h: hue,
      s: 1,
      v: 1
    });
    const rgbDecimal = color.rgbToDecimal(rgbObject);
    this._peripheral.setLED(rgbDecimal);
    return new Promise(resolve => {
      window.setTimeout(() => {
        resolve();
      }, BLESendInterval);
    });
  }

  /**
   * Make the WeDo 2.0 peripheral play a MIDI note for the specified duration.
   * @param {object} args - the block's arguments.
   * @property {number} NOTE - the MIDI note to play.
   * @property {number} DURATION - the duration of the note, in seconds.
   * @return {Promise} - a promise which will resolve at the end of the duration.
   */
  playNoteFor(args) {
    let durationMS = Cast.toNumber(args.DURATION) * 1000;
    durationMS = MathUtil.clamp(durationMS, 0, 3000);
    const note = MathUtil.clamp(Cast.toNumber(args.NOTE), 25, 125); // valid WeDo 2.0 sounds
    if (durationMS === 0) return; // WeDo 2.0 plays duration '0' forever
    return new Promise(resolve => {
      const tone = this._noteToTone(note);
      this._peripheral.playTone(tone, durationMS);

      // Run for some time even when no piezo is connected
      setTimeout(resolve, durationMS);
    });
  }

  /**
   * Compare the distance sensor's value to a reference.
   * @param {object} args - the block's arguments.
   * @property {string} OP - the comparison operation: '<' or '>'.
   * @property {number} REFERENCE - the value to compare against.
   * @return {boolean} - the result of the comparison, or false on error.
   */
  whenDistance(args) {
    switch (args.OP) {
      case '<':
        return this._peripheral.distance < Cast.toNumber(args.REFERENCE);
      case '>':
        return this._peripheral.distance > Cast.toNumber(args.REFERENCE);
      default:
        log.warn("Unknown comparison operator in whenDistance: ".concat(args.OP));
        return false;
    }
  }

  /**
   * Test whether the tilt sensor is currently tilted.
   * @param {object} args - the block's arguments.
   * @property {TiltDirection} TILT_DIRECTION_ANY - the tilt direction to test (up, down, left, right, or any).
   * @return {boolean} - true if the tilt sensor is tilted past a threshold in the specified direction.
   */
  whenTilted(args) {
    return this._isTilted(args.TILT_DIRECTION_ANY);
  }

  /**
   * @return {number} - the distance sensor's value, scaled to the [0,100] range.
   */
  getDistance() {
    return this._peripheral.distance;
  }

  /**
   * Test whether the tilt sensor is currently tilted.
   * @param {object} args - the block's arguments.
   * @property {TiltDirection} TILT_DIRECTION_ANY - the tilt direction to test (up, down, left, right, or any).
   * @return {boolean} - true if the tilt sensor is tilted past a threshold in the specified direction.
   */
  isTilted(args) {
    return this._isTilted(args.TILT_DIRECTION_ANY);
  }

  /**
   * @param {object} args - the block's arguments.
   * @property {TiltDirection} TILT_DIRECTION - the direction (up, down, left, right) to check.
   * @return {number} - the tilt sensor's angle in the specified direction.
   * Note that getTiltAngle(up) = -getTiltAngle(down) and getTiltAngle(left) = -getTiltAngle(right).
   */
  getTiltAngle(args) {
    return this._getTiltAngle(args.TILT_DIRECTION);
  }

  /**
   * Test whether the tilt sensor is currently tilted.
   * @param {TiltDirection} direction - the tilt direction to test (up, down, left, right, or any).
   * @return {boolean} - true if the tilt sensor is tilted past a threshold in the specified direction.
   * @private
   */
  _isTilted(direction) {
    switch (direction) {
      case WeDo2TiltDirection.ANY:
        return this._getTiltAngle(WeDo2TiltDirection.UP) >= Scratch3WeDo2Blocks.TILT_THRESHOLD || this._getTiltAngle(WeDo2TiltDirection.DOWN) >= Scratch3WeDo2Blocks.TILT_THRESHOLD || this._getTiltAngle(WeDo2TiltDirection.LEFT) >= Scratch3WeDo2Blocks.TILT_THRESHOLD || this._getTiltAngle(WeDo2TiltDirection.RIGHT) >= Scratch3WeDo2Blocks.TILT_THRESHOLD;
      default:
        return this._getTiltAngle(direction) >= Scratch3WeDo2Blocks.TILT_THRESHOLD;
    }
  }

  /**
   * @param {TiltDirection} direction - the direction (up, down, left, right) to check.
   * @return {number} - the tilt sensor's angle in the specified direction.
   * Note that getTiltAngle(up) = -getTiltAngle(down) and getTiltAngle(left) = -getTiltAngle(right).
   * @private
   */
  _getTiltAngle(direction) {
    switch (direction) {
      case WeDo2TiltDirection.UP:
        return this._peripheral.tiltY > 45 ? 256 - this._peripheral.tiltY : -this._peripheral.tiltY;
      case WeDo2TiltDirection.DOWN:
        return this._peripheral.tiltY > 45 ? this._peripheral.tiltY - 256 : this._peripheral.tiltY;
      case WeDo2TiltDirection.LEFT:
        return this._peripheral.tiltX > 45 ? 256 - this._peripheral.tiltX : -this._peripheral.tiltX;
      case WeDo2TiltDirection.RIGHT:
        return this._peripheral.tiltX > 45 ? this._peripheral.tiltX - 256 : this._peripheral.tiltX;
      default:
        log.warn("Unknown tilt direction in _getTiltAngle: ".concat(direction));
    }
  }

  /**
   * Call a callback for each motor indexed by the provided motor ID.
   * @param {MotorID} motorID - the ID specifier.
   * @param {Function} callback - the function to call with the numeric motor index for each motor.
   * @private
   */
  _forEachMotor(motorID, callback) {
    let motors;
    switch (motorID) {
      case WeDo2MotorLabel.A:
        motors = [0];
        break;
      case WeDo2MotorLabel.B:
        motors = [1];
        break;
      case WeDo2MotorLabel.ALL:
      case WeDo2MotorLabel.DEFAULT:
        motors = [0, 1];
        break;
      default:
        log.warn("Invalid motor ID: ".concat(motorID));
        motors = [];
        break;
    }
    for (const index of motors) {
      callback(index);
    }
  }

  /**
   * @param {number} midiNote - the MIDI note value to convert.
   * @return {number} - the frequency, in Hz, corresponding to that MIDI note value.
   * @private
   */
  _noteToTone(midiNote) {
    // Note that MIDI note 69 is A4, 440 Hz
    return 440 * Math.pow(2, (midiNote - 69) / 12);
  }
}
module.exports = Scratch3WeDo2Blocks;

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

/***/ }),

/***/ "./node_modules/scratch-vm/src/util/rateLimiter.js":
/*!*********************************************************!*\
  !*** ./node_modules/scratch-vm/src/util/rateLimiter.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Timer = __webpack_require__(/*! ../util/timer */ "./node_modules/scratch-vm/src/util/timer.js");
class RateLimiter {
  /**
   * A utility for limiting the rate of repetitive send operations, such as
   * bluetooth messages being sent to hardware devices. It uses the token bucket
   * strategy: a counter accumulates tokens at a steady rate, and each send costs
   * a token. If no tokens remain, it's not okay to send.
   * @param {number} maxRate the maximum number of sends allowed per second
   * @constructor
   */
  constructor(maxRate) {
    /**
     * The maximum number of tokens.
     * @type {number}
     */
    this._maxTokens = maxRate;

    /**
     * The interval in milliseconds for refilling one token. It is calculated
     * so that the tokens will be filled to maximum in one second.
     * @type {number}
     */
    this._refillInterval = 1000 / maxRate;

    /**
     * The current number of tokens in the bucket.
     * @type {number}
     */
    this._count = this._maxTokens;
    this._timer = new Timer();
    this._timer.start();

    /**
     * The last time in milliseconds when the token count was updated.
     * @type {number}
     */
    this._lastUpdateTime = this._timer.timeElapsed();
  }

  /**
   * Check if it is okay to send a message, by updating the token count,
   * taking a token and then checking if we are still under the rate limit.
   * @return {boolean} true if we are under the rate limit
   */
  okayToSend() {
    // Calculate the number of tokens to refill the bucket with, based on the
    // amount of time since the last refill.
    const now = this._timer.timeElapsed();
    const timeSinceRefill = now - this._lastUpdateTime;
    const refillCount = Math.floor(timeSinceRefill / this._refillInterval);

    // If we're adding at least one token, reset _lastUpdateTime to now.
    // Otherwise, don't reset it so that we can continue measuring time until
    // the next refill.
    if (refillCount > 0) {
      this._lastUpdateTime = now;
    }

    // Refill the tokens up to the maximum
    this._count = Math.min(this._maxTokens, this._count + refillCount);

    // If we have at least one token, use one, and it's okay to send.
    if (this._count > 0) {
      this._count--;
      return true;
    }
    return false;
  }
}
module.exports = RateLimiter;

/***/ })

}]);
//# sourceMappingURL=6.js.map