(window["webpackJsonpGUI"] = window["webpackJsonpGUI"] || []).push([[4],{

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

/***/ "./node_modules/scratch-vm/src/extensions/scratch3_boost/index.js":
/*!************************************************************************!*\
  !*** ./node_modules/scratch-vm/src/extensions/scratch3_boost/index.js ***!
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
 * The LEGO Wireless Protocol documentation used to create this extension can be found at:
 * https://lego.github.io/lego-ble-wireless-protocol-docs/index.html
 */

/**
 * Icon svg to be displayed at the left edge of each extension block, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len
const iconURI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACpQTFRF////fIel5ufolZ62/2YavsPS+YZOkJmy9/j53+Hk6+zs6N/b6dfO////tDhMHAAAAA50Uk5T/////////////////wBFwNzIAAAA6ElEQVR42uzX2w6DIBAEUGDVtlr//3dLaLwgiwUd2z7MJPJg5EQWiGhGcAxBggQJEiT436CIfqXJPTn3MKNYYMSDFpoAmp24OaYgvwKnFgL2zvVTCwHrMoMi+nUQLFthaNCCa0iwclLkDgYVsQp0mzxuqXgK1MRzoCLWgkPXNN2wI/q6Kvt7u/cX0HtejN8x2sXpnpb8J8D3b0Keuhh3X975M+i0xNVbg3s1TIasgK21bQyGO+s2PykaGMYbge8KrNrssvkOWDXkErB8UuBHETjoYLkKBA8ZfuDkbwVBggQJEiR4MC8BBgDTtMZLx2nFCQAAAABJRU5ErkJggg==';

/**
 * Boost BLE UUIDs.
 * @enum {string}
 */
const BoostBLE = {
  service: '00001623-1212-efde-1623-785feabcd123',
  characteristic: '00001624-1212-efde-1623-785feabcd123',
  sendInterval: 100,
  sendRateMax: 20
};

/**
 * Boost Motor Max Power Add. Defines how much more power than the target speed
 * the motors may supply to reach the target speed faster.
 * Lower number == softer, slower reached target speed.
 * Higher number == harder, faster reached target speed.
 * @constant {number}
 */
const BoostMotorMaxPowerAdd = 10;

/**
 * A time interval to wait (in milliseconds) in between battery check calls.
 * @type {number}
 */
const BoostPingInterval = 5000;

/**
 * The number of continuous samples the color-sensor will evaluate color from.
 * @type {number}
 */
const BoostColorSampleSize = 5;

/**
 * Enum for Boost sensor and actuator types.
 * @readonly
 * @enum {number}
 */
const BoostIO = {
  MOTOR_WEDO: 0x01,
  MOTOR_SYSTEM: 0x02,
  BUTTON: 0x05,
  LIGHT: 0x08,
  VOLTAGE: 0x14,
  CURRENT: 0x15,
  PIEZO: 0x16,
  LED: 0x17,
  TILT_EXTERNAL: 0x22,
  MOTION_SENSOR: 0x23,
  COLOR: 0x25,
  MOTOREXT: 0x26,
  MOTORINT: 0x27,
  TILT: 0x28
};

/**
 * Enum for ids for various output command feedback types on the Boost.
 * @readonly
 * @enum {number}
 */
const BoostPortFeedback = {
  IN_PROGRESS: 0x01,
  COMPLETED: 0x02,
  DISCARDED: 0x04,
  IDLE: 0x08,
  BUSY_OR_FULL: 0x10
};

/**
 * Enum for physical Boost Ports
 * @readonly
 * @enum {number}
 */

const BoostPort10000223OrOlder = {
  A: 55,
  B: 56,
  C: 1,
  D: 2
};
const BoostPort10000224OrNewer = {
  A: 0,
  B: 1,
  C: 2,
  D: 3
};

// Set default port mapping to support the newer firmware
let BoostPort = BoostPort10000224OrNewer;

/**
 * Ids for each color sensor value used by the extension.
 * @readonly
 * @enum {string}
 */
const BoostColor = {
  ANY: 'any',
  NONE: 'none',
  RED: 'red',
  BLUE: 'blue',
  GREEN: 'green',
  YELLOW: 'yellow',
  WHITE: 'white',
  BLACK: 'black'
};

/**
 * Enum for indices for each color sensed by the Boost vision sensor.
 * @readonly
 * @enum {number}
 */
const BoostColorIndex = {
  [BoostColor.NONE]: 255,
  [BoostColor.RED]: 9,
  [BoostColor.BLUE]: 3,
  [BoostColor.GREEN]: 5,
  [BoostColor.YELLOW]: 7,
  [BoostColor.WHITE]: 10,
  [BoostColor.BLACK]: 0
};

/**
 * Enum for Message Types
 * @readonly
 * @enum {number}
 */
const BoostMessage = {
  HUB_PROPERTIES: 0x01,
  HUB_ACTIONS: 0x02,
  HUB_ALERTS: 0x03,
  HUB_ATTACHED_IO: 0x04,
  ERROR: 0x05,
  PORT_INPUT_FORMAT_SETUP_SINGLE: 0x41,
  PORT_INPUT_FORMAT_SETUP_COMBINED: 0x42,
  PORT_INFORMATION: 0x43,
  PORT_MODEINFORMATION: 0x44,
  PORT_VALUE: 0x45,
  PORT_VALUE_COMBINED: 0x46,
  PORT_INPUT_FORMAT: 0x47,
  PORT_INPUT_FORMAT_COMBINED: 0x48,
  OUTPUT: 0x81,
  PORT_FEEDBACK: 0x82
};

/**
 * Enum for Hub Property Types
 * @readonly
 * @enum {number}
 */

const BoostHubProperty = {
  ADVERTISEMENT_NAME: 0x01,
  BUTTON: 0x02,
  FW_VERSION: 0x03,
  HW_VERSION: 0x04,
  RSSI: 0x05,
  BATTERY_VOLTAGE: 0x06,
  BATTERY_TYPE: 0x07,
  MANUFACTURER_NAME: 0x08,
  RADIO_FW_VERSION: 0x09,
  LEGO_WP_VERSION: 0x0A,
  SYSTEM_TYPE_ID: 0x0B,
  HW_NETWORK_ID: 0x0C,
  PRIMARY_MAC: 0x0D,
  SECONDARY_MAC: 0x0E,
  HW_NETWORK_FAMILY: 0x0F
};

/**
 * Enum for Hub Property Operations
 * @readonly
 * @enum {number}
 */

const BoostHubPropertyOperation = {
  SET: 0x01,
  ENABLE_UPDATES: 0x02,
  DISABLE_UPDATES: 0x03,
  RESET: 0x04,
  REQUEST_UPDATE: 0x05,
  UPDATE: 0x06
};

/**
 * Enum for Motor Subcommands (for 0x81)
 * @readonly
 * @enum {number}
 */
const BoostOutputSubCommand = {
  START_POWER: 0x01,
  START_POWER_PAIR: 0x02,
  SET_ACC_TIME: 0x05,
  SET_DEC_TIME: 0x06,
  START_SPEED: 0x07,
  START_SPEED_PAIR: 0x08,
  START_SPEED_FOR_TIME: 0x09,
  START_SPEED_FOR_TIME_PAIR: 0x0A,
  START_SPEED_FOR_DEGREES: 0x0B,
  START_SPEED_FOR_DEGREES_PAIR: 0x0C,
  GO_TO_ABS_POSITION: 0x0D,
  GO_TO_ABS_POSITION_PAIR: 0x0E,
  PRESET_ENCODER: 0x14,
  WRITE_DIRECT_MODE_DATA: 0x51
};

/**
 * Enum for Startup/Completion information for an output command.
 * Startup and completion bytes must be OR'ed to be combined to a single byte.
 * @readonly
 * @enum {number}
 */
const BoostOutputExecution = {
  // Startup information
  BUFFER_IF_NECESSARY: 0x00,
  EXECUTE_IMMEDIATELY: 0x10,
  // Completion information
  NO_ACTION: 0x00,
  COMMAND_FEEDBACK: 0x01
};

/**
 * Enum for Boost Motor end states
 * @readonly
 * @enum {number}
 */
const BoostMotorEndState = {
  FLOAT: 0,
  HOLD: 126,
  BRAKE: 127
};

/**
 * Enum for Boost Motor acceleration/deceleration profiles
 * @readyonly
 * @enum {number}
 */
const BoostMotorProfile = {
  DO_NOT_USE: 0x00,
  ACCELERATION: 0x01,
  DECELERATION: 0x02
};

/**
 * Enum for when Boost IO's are attached/detached
 * @readonly
 * @enum {number}
 */
const BoostIOEvent = {
  ATTACHED: 0x01,
  DETACHED: 0x00,
  ATTACHED_VIRTUAL: 0x02
};

/**
 * Enum for selected sensor modes.
 * @enum {number}
 */
const BoostMode = {
  TILT: 0,
  // angle (pitch/yaw)
  LED: 1,
  // Set LED to accept RGB values
  COLOR: 0,
  // Read indexed colors from Vision Sensor
  MOTOR_SENSOR: 2,
  // Set motors to report their position
  UNKNOWN: 0 // Anything else will use the default mode (mode 0)
};

/**
 * Enum for Boost motor states.
 * @param {number}
 */
const BoostMotorState = {
  OFF: 0,
  ON_FOREVER: 1,
  ON_FOR_TIME: 2,
  ON_FOR_ROTATION: 3
};

/**
 * Helper function for converting a JavaScript number to an INT32-number
 * @param {number} number - a number
 * @return {array} - a 4-byte array of Int8-values representing an INT32-number
 */
const numberToInt32Array = function numberToInt32Array(number) {
  const buffer = new ArrayBuffer(4);
  const dataview = new DataView(buffer);
  dataview.setInt32(0, number);
  return [dataview.getInt8(3), dataview.getInt8(2), dataview.getInt8(1), dataview.getInt8(0)];
};

/**
 * Helper function for converting a regular array to a Little Endian INT32-value
 * @param {Array} array - an array containing UInt8-values
 * @return {number} - a number
 */
const int32ArrayToNumber = function int32ArrayToNumber(array) {
  const i = Uint8Array.from(array);
  const d = new DataView(i.buffer);
  return d.getInt32(0, true);
};

/**
 * Manage power, direction, position, and timers for one Boost motor.
 */
class BoostMotor {
  /**
   * Construct a Boost Motor instance.
   * @param {Boost} parent - the Boost peripheral which owns this motor.
   * @param {int} index - the zero-based index of this motor on its parent peripheral.
   */
  constructor(parent, index) {
    /**
     * The Boost peripheral which owns this motor.
     * @type {Boost}
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
    this._power = 50;

    /**
     * This motor's current relative position
     * @type {number}
     * @private
     */
    this._position = 0;

    /**
     * Is this motor currently moving?
     * @type {boolean}
     * @private
     */
    this._status = BoostMotorState.OFF;

    /**
     * If the motor has been turned on or is actively braking for a specific duration, this is the timeout ID for
     * the end-of-action handler. Cancel this when changing plans.
     * @type {Object}
     * @private
     */
    this._pendingDurationTimeoutId = null;

    /**
     * The starting time for the pending duration timeout.
     * @type {number}
     * @private
     */
    this._pendingDurationTimeoutStartTime = null;

    /**
     * The delay/duration of the pending duration timeout.
     * @type {number}
     * @private
     */
    this._pendingDurationTimeoutDelay = null;

    /**
     * The target position of a turn-based command.
     * @type {number}
     * @private
     */
    this._pendingRotationDestination = null;

    /**
     * If the motor has been turned on run for a specific rotation, this is the function
     * that will be called once Scratch VM gets a notification from the Move Hub.
     * @type {Object}
     * @private
     */
    this._pendingRotationPromise = null;
    this.turnOff = this.turnOff.bind(this);
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
   * @param {int} value - this motor's new power level, in the range [10,100].
   */
  set power(value) {
    /**
     * Scale the motor power to a range between 10 and 100,
     * to make sure the motors will run with something built onto them.
     */
    if (value === 0) {
      this._power = 0;
    } else {
      this._power = MathUtil.scale(value, 1, 100, 10, 100);
    }
  }

  /**
   * @return {int} - this motor's current position, in the range of [-MIN_INT32,MAX_INT32]
   */
  get position() {
    return this._position;
  }

  /**
   * @param {int} value - set this motor's current position.
   */
  set position(value) {
    this._position = value;
  }

  /**
   * @return {BoostMotorState} - the motor's current state.
   */
  get status() {
    return this._status;
  }

  /**
   * @param {BoostMotorState} value - set this motor's state.
   */
  set status(value) {
    this._clearRotationState();
    this._clearDurationTimeout();
    this._status = value;
  }

  /**
   * @return {number} - time, in milliseconds, of when the pending duration timeout began.
   */
  get pendingDurationTimeoutStartTime() {
    return this._pendingDurationTimeoutStartTime;
  }

  /**
   * @return {number} - delay, in milliseconds, of the pending duration timeout.
   */
  get pendingDurationTimeoutDelay() {
    return this._pendingDurationTimeoutDelay;
  }

  /**
   * @return {number} - target position, in degrees, of the pending rotation.
   */
  get pendingRotationDestination() {
    return this._pendingRotationDestination;
  }

  /**
   * @return {Promise} - the Promise function for the pending rotation.
   */
  get pendingRotationPromise() {
    return this._pendingRotationPromise;
  }

  /**
   * @param {function} func - function to resolve pending rotation Promise
   */
  set pendingRotationPromise(func) {
    this._pendingRotationPromise = func;
  }

  /**
   * Turn this motor on indefinitely
   * @private
   */
  _turnOn() {
    const cmd = this._parent.generateOutputCommand(this._index, BoostOutputExecution.EXECUTE_IMMEDIATELY, BoostOutputSubCommand.START_SPEED, [this.power * this.direction, MathUtil.clamp(this.power + BoostMotorMaxPowerAdd, 0, 100), BoostMotorProfile.DO_NOT_USE]);
    this._parent.send(BoostBLE.characteristic, cmd);
  }

  /**
   * Turn this motor on indefinitely
   */
  turnOnForever() {
    this.status = BoostMotorState.ON_FOREVER;
    this._turnOn();
  }

  /**
   * Turn this motor on for a specific duration.
   * @param {number} milliseconds - run the motor for this long.
   */
  turnOnFor(milliseconds) {
    milliseconds = Math.max(0, milliseconds);
    this.status = BoostMotorState.ON_FOR_TIME;
    this._turnOn();
    this._setNewDurationTimeout(this.turnOff, milliseconds);
  }

  /**
   * Turn this motor on for a specific rotation in degrees.
   * @param {number} degrees - run the motor for this amount of degrees.
   * @param {number} direction - rotate in this direction
   */
  turnOnForDegrees(degrees, direction) {
    degrees = Math.max(0, degrees);
    const cmd = this._parent.generateOutputCommand(this._index, BoostOutputExecution.EXECUTE_IMMEDIATELY ^ BoostOutputExecution.COMMAND_FEEDBACK, BoostOutputSubCommand.START_SPEED_FOR_DEGREES, [...numberToInt32Array(degrees), this.power * this.direction * direction, MathUtil.clamp(this.power + BoostMotorMaxPowerAdd, 0, 100), BoostMotorEndState.BRAKE, BoostMotorProfile.DO_NOT_USE]);
    this.status = BoostMotorState.ON_FOR_ROTATION;
    this._pendingRotationDestination = this.position + degrees * this.direction * direction;
    this._parent.send(BoostBLE.characteristic, cmd);
  }

  /**
   * Turn this motor off.
   * @param {boolean} [useLimiter=true] - if true, use the rate limiter
   */
  turnOff() {
    let useLimiter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    const cmd = this._parent.generateOutputCommand(this._index, BoostOutputExecution.EXECUTE_IMMEDIATELY, BoostOutputSubCommand.START_POWER, [BoostMotorEndState.FLOAT]);
    this.status = BoostMotorState.OFF;
    this._parent.send(BoostBLE.characteristic, cmd, useLimiter);
  }

  /**
   * Clear the motor action timeout, if any. Safe to call even when there is no pending timeout.
   * @private
   */
  _clearDurationTimeout() {
    if (this._pendingDurationTimeoutId !== null) {
      clearTimeout(this._pendingDurationTimeoutId);
      this._pendingDurationTimeoutId = null;
      this._pendingDurationTimeoutStartTime = null;
      this._pendingDurationTimeoutDelay = null;
    }
  }

  /**
   * Set a new motor action timeout, after clearing an existing one if necessary.
   * @param {Function} callback - to be called at the end of the timeout.
   * @param {int} delay - wait this many milliseconds before calling the callback.
   * @private
   */
  _setNewDurationTimeout(callback, delay) {
    this._clearDurationTimeout();
    const timeoutID = setTimeout(() => {
      if (this._pendingDurationTimeoutId === timeoutID) {
        this._pendingDurationTimeoutId = null;
        this._pendingDurationTimeoutStartTime = null;
        this._pendingDurationTimeoutDelay = null;
      }
      callback();
    }, delay);
    this._pendingDurationTimeoutId = timeoutID;
    this._pendingDurationTimeoutStartTime = Date.now();
    this._pendingDurationTimeoutDelay = delay;
  }

  /**
   * Clear the motor states related to rotation-based commands, if any.
   * Safe to call even when there is no pending promise function.
   * @private
   */
  _clearRotationState() {
    if (this._pendingRotationPromise !== null) {
      this._pendingRotationPromise();
      this._pendingRotationPromise = null;
    }
    this._pendingRotationDestination = null;
  }
}

/**
 * Manage communication with a Boost peripheral over a Bluetooth Low Energy client socket.
 */
class Boost {
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
     * A list of the ids of the physical or virtual sensors.
     * @type {string[]}
     * @private
     */
    this._ports = [];

    /**
     * A list of motors registered by the Boost hardware.
     * @type {BoostMotor[]}
     * @private
     */
    this._motors = [];

    /**
     * The most recently received value for each sensor.
     * @type {Object.<string, number>}
     * @private
     */
    this._sensors = {
      tiltX: 0,
      tiltY: 0,
      color: BoostColor.NONE,
      previousColor: BoostColor.NONE
    };

    /**
     * An array of values from the Boost Vision Sensor.
     * @type {Array}
     * @private
     */
    this._colorSamples = [];

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
    this._rateLimiter = new RateLimiter(BoostBLE.sendRateMax);

    /**
     * An interval id for the battery check interval.
     * @type {number}
     * @private
     */
    this._pingDeviceId = null;
    this.reset = this.reset.bind(this);
    this._onConnect = this._onConnect.bind(this);
    this._onMessage = this._onMessage.bind(this);
    this._pingDevice = this._pingDevice.bind(this);
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
   * @return {number} - the latest color value received from the vision sensor.
   */
  get color() {
    return this._sensors.color;
  }

  /**
   * @return {number} - the previous color value received from the vision sensor.
   */
  get previousColor() {
    return this._sensors.previousColor;
  }

  /**
   * Look up the color id for an index received from the vision sensor.
   * @param {number} index - the color index to look up.
   * @return {BoostColor} the color id for this index.
   */
  boostColorForIndex(index) {
    const colorForIndex = Object.keys(BoostColorIndex).find(key => BoostColorIndex[key] === index);
    return colorForIndex || BoostColor.NONE;
  }

  /**
   * Access a particular motor on this peripheral.
   * @param {int} index - the index of the desired motor.
   * @return {BoostMotor} - the BoostMotor instance, if any, at that index.
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
   * Set the Boost peripheral's LED to a specific color.
   * @param {int} inputRGB - a 24-bit RGB color in 0xRRGGBB format.
   * @return {Promise} - a promise of the completion of the set led send operation.
   */
  setLED(inputRGB) {
    const rgb = [inputRGB >> 16 & 0x000000FF, inputRGB >> 8 & 0x000000FF, inputRGB & 0x000000FF];
    const cmd = this.generateOutputCommand(this._ports.indexOf(BoostIO.LED), BoostOutputExecution.EXECUTE_IMMEDIATELY ^ BoostOutputExecution.COMMAND_FEEDBACK, BoostOutputSubCommand.WRITE_DIRECT_MODE_DATA, [BoostMode.LED, ...rgb]);
    return this.send(BoostBLE.characteristic, cmd);
  }

  /**
   * Sets the input mode of the LED to RGB.
   * @return {Promise} - a promise returned by the send operation.
   */
  setLEDMode() {
    const cmd = this.generateInputCommand(this._ports.indexOf(BoostIO.LED), BoostMode.LED, 0, false);
    return this.send(BoostBLE.characteristic, cmd);
  }

  /**
   * Stop the motors on the Boost peripheral.
   */
  stopAll() {
    if (!this.isConnected()) return;
    this.stopAllMotors();
  }

  /**
   * Called by the runtime when user wants to scan for a Boost peripheral.
   */
  scan() {
    if (this._ble) {
      this._ble.disconnect();
    }
    this._ble = new BLE(this._runtime, this._extensionId, {
      filters: [{
        services: [BoostBLE.service],
        manufacturerData: {
          0x0397: {
            dataPrefix: [0x00, 0x40],
            mask: [0x00, 0xFF]
          }
        }
      }],
      optionalServices: []
    }, this._onConnect, this.reset);
  }

  /**
   * Called by the runtime when user wants to connect to a certain Boost peripheral.
   * @param {number} id - the id of the peripheral to connect to.
   */
  connect(id) {
    if (this._ble) {
      this._ble.connectPeripheral(id);
    }
  }

  /**
   * Disconnects from the current BLE socket and resets state.
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
    this._ports = [];
    this._motors = [];
    this._sensors = {
      tiltX: 0,
      tiltY: 0,
      color: BoostColor.NONE,
      previousColor: BoostColor.NONE
    };
    if (this._pingDeviceId) {
      window.clearInterval(this._pingDeviceId);
      this._pingDeviceId = null;
    }
  }

  /**
   * Called by the runtime to detect whether the Boost peripheral is connected.
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
   * Write a message to the Boost peripheral BLE socket.
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
    return this._ble.write(BoostBLE.service, uuid, Base64Util.uint8ArrayToBase64(message), 'base64');
  }

  /**
   * Generate a Boost 'Output Command' in the byte array format
   * (COMMON HEADER, PORT ID, EXECUTION BYTE, SUBCOMMAND ID, PAYLOAD).
   *
   * Payload is accepted as an array since these vary across different subcommands.
   *
   * @param  {number} portID - the port (Connect ID) to send a command to.
   * @param  {number} execution - Byte containing startup/completion information
   * @param  {number} subCommand - the id of the subcommand byte.
   * @param  {array}  payload    - the list of bytes to send as subcommand payload
   * @return {array}            - a generated output command.
   */
  generateOutputCommand(portID, execution, subCommand, payload) {
    const hubID = 0x00;
    const command = [hubID, BoostMessage.OUTPUT, portID, execution, subCommand, ...payload];
    command.unshift(command.length + 1); // Prepend payload with length byte;

    return command;
  }

  /**
   * Generate a Boost 'Input Command' in the byte array format
   * (COMMAND ID, COMMAND TYPE, CONNECT ID, TYPE ID, MODE, DELTA INTERVAL (4 BYTES),
   * UNIT, NOTIFICATIONS ENABLED).
   *
   * This sends a command to the Boost that sets that input format
   * of the specified inputs and sets value change notifications.
   *
   * @param  {number}  portID           - the port (Connect ID) to send a command to.
   * @param  {number}  mode                - the mode of the input sensor.
   * @param  {number}  delta               - the delta change needed to trigger notification.
   * @param  {boolean} enableNotifications - whether to enable notifications.
   * @return {array}                       - a generated input command.
   */
  generateInputCommand(portID, mode, delta, enableNotifications) {
    const command = [0x00,
    // Hub ID
    BoostMessage.PORT_INPUT_FORMAT_SETUP_SINGLE, portID, mode].concat(numberToInt32Array(delta)).concat([enableNotifications]);
    command.unshift(command.length + 1); // Prepend payload with length byte;

    return command;
  }

  /**
   * Starts reading data from peripheral after BLE has connected.
   * @private
   */
  _onConnect() {
    this._ble.startNotifications(BoostBLE.service, BoostBLE.characteristic, this._onMessage);
    this._pingDeviceId = window.setInterval(this._pingDevice, BoostPingInterval);

    // Send a request for firmware version.
    setTimeout(() => {
      const command = [0x00,
      // Hub ID
      BoostMessage.HUB_PROPERTIES, BoostHubProperty.FW_VERSION, BoostHubPropertyOperation.REQUEST_UPDATE];
      command.unshift(command.length + 1);
      this.send(BoostBLE.characteristic, command, false);
    }, 500);
  }

  /**
   * Process the sensor data from the incoming BLE characteristic.
   * @param {object} base64 - the incoming BLE data.
   * @private
   */
  _onMessage(base64) {
    const data = Base64Util.base64ToUint8Array(base64);

    /**
     * First three bytes are the common header:
     * 0: Length of message
     * 1: Hub ID (always 0x00 at the moment, unused)
     * 2: Message Type
     * 3: Port ID
     * We base our switch-case on Message Type
     */

    const messageType = data[2];
    const portID = data[3];
    switch (messageType) {
      case BoostMessage.HUB_PROPERTIES:
        {
          const property = data[3];
          switch (property) {
            case BoostHubProperty.FW_VERSION:
              {
                // Establish firmware version 1.0.00.0224 as a 32-bit signed integer (little endian)
                const fwVersion10000224 = int32ArrayToNumber([0x24, 0x02, 0x00, 0x10]);
                const fwHub = int32ArrayToNumber(data.slice(5, data.length));
                if (fwHub < fwVersion10000224) {
                  BoostPort = BoostPort10000223OrOlder;
                  log.info('Move Hub firmware older than version 1.0.00.0224 detected. Using old port mapping.');
                } else {
                  BoostPort = BoostPort10000224OrNewer;
                }
                break;
              }
          }
          break;
        }
      case BoostMessage.HUB_ATTACHED_IO:
        {
          // IO Attach/Detach events
          const event = data[4];
          const typeId = data[5];
          switch (event) {
            case BoostIOEvent.ATTACHED:
              this._registerSensorOrMotor(portID, typeId);
              break;
            case BoostIOEvent.DETACHED:
              this._clearPort(portID);
              break;
            case BoostIOEvent.ATTACHED_VIRTUAL:
            default:
          }
          break;
        }
      case BoostMessage.PORT_VALUE:
        {
          const type = this._ports[portID];
          switch (type) {
            case BoostIO.TILT:
              this._sensors.tiltX = data[4];
              this._sensors.tiltY = data[5];
              break;
            case BoostIO.COLOR:
              this._colorSamples.unshift(data[4]);
              if (this._colorSamples.length > BoostColorSampleSize) {
                this._colorSamples.pop();
                if (this._colorSamples.every((v, i, arr) => v === arr[0])) {
                  this._sensors.previousColor = this._sensors.color;
                  this._sensors.color = this.boostColorForIndex(this._colorSamples[0]);
                } else {
                  this._sensors.color = BoostColor.NONE;
                }
              } else {
                this._sensors.color = BoostColor.NONE;
              }
              break;
            case BoostIO.MOTOREXT:
            case BoostIO.MOTORINT:
              this.motor(portID).position = int32ArrayToNumber(data.slice(4, 8));
              break;
            case BoostIO.CURRENT:
            case BoostIO.VOLTAGE:
            case BoostIO.LED:
              break;
            default:
              log.warn("Unknown sensor value! Type: ".concat(type));
          }
          break;
        }
      case BoostMessage.PORT_FEEDBACK:
        {
          const feedback = data[4];
          const motor = this.motor(portID);
          if (motor) {
            // Makes sure that commands resolve both when they actually complete and when they fail
            const isBusy = feedback & BoostPortFeedback.IN_PROGRESS;
            const commandCompleted = feedback & (BoostPortFeedback.COMPLETED ^ BoostPortFeedback.DISCARDED);
            if (!isBusy && commandCompleted) {
              if (motor.status === BoostMotorState.ON_FOR_ROTATION) {
                motor.status = BoostMotorState.OFF;
              }
            }
          }
          break;
        }
      case BoostMessage.ERROR:
        log.warn("Error reported by hub: ".concat(data));
        break;
    }
  }

  /**
   * Ping the Boost hub. If the Boost hub has disconnected
   * for some reason, the BLE socket will get an error back and automatically
   * close the socket.
   * @private
   */
  _pingDevice() {
    this._ble.read(BoostBLE.service, BoostBLE.characteristic, false);
  }

  /**
   * Register a new sensor or motor connected at a port.  Store the type of
   * sensor or motor internally, and then register for notifications on input
   * values if it is a sensor.
   * @param {number} portID - the port to register a sensor or motor on.
   * @param {number} type - the type ID of the sensor or motor
   * @private
   */
  _registerSensorOrMotor(portID, type) {
    // Record which port is connected to what type of device
    this._ports[portID] = type;

    // Record motor port
    if (type === BoostIO.MOTORINT || type === BoostIO.MOTOREXT) {
      this._motors[portID] = new BoostMotor(this, portID);
    }

    // Set input format for tilt or distance sensor
    let mode = null;
    let delta = 1;
    switch (type) {
      case BoostIO.MOTORINT:
      case BoostIO.MOTOREXT:
        mode = BoostMode.MOTOR_SENSOR;
        break;
      case BoostIO.COLOR:
        mode = BoostMode.COLOR;
        delta = 0;
        break;
      case BoostIO.LED:
        mode = BoostMode.LED;
        /**
         * Sets the LED to blue to give an indication on the hub
         * that it has connected successfully.
         */
        this.setLEDMode();
        this.setLED(0x0000FF);
        break;
      case BoostIO.TILT:
        mode = BoostMode.TILT;
        break;
      default:
        mode = BoostMode.UNKNOWN;
    }
    const cmd = this.generateInputCommand(portID, mode, delta, true // Receive feedback
    );
    this.send(BoostBLE.characteristic, cmd);
  }

  /**
   * Clear the sensors or motors present on the ports.
   * @param {number} portID - the port to clear.
   * @private
   */
  _clearPort(portID) {
    const type = this._ports[portID];
    if (type === BoostIO.TILT) {
      this._sensors.tiltX = this._sensors.tiltY = 0;
    }
    if (type === BoostIO.COLOR) {
      this._sensors.color = BoostColor.NONE;
    }
    this._ports[portID] = 'none';
    this._motors[portID] = null;
  }
}

/**
 * Enum for motor specification.
 * @readonly
 * @enum {string}
 */
const BoostMotorLabel = {
  A: 'A',
  B: 'B',
  C: 'C',
  D: 'D',
  AB: 'AB',
  ALL: 'ABCD'
};

/**
 * Enum for motor direction specification.
 * @readonly
 * @enum {string}
 */
const BoostMotorDirection = {
  FORWARD: 'this way',
  BACKWARD: 'that way',
  REVERSE: 'reverse'
};

/**
 * Enum for tilt sensor direction.
 * @readonly
 * @enum {string}
 */
const BoostTiltDirection = {
  UP: 'up',
  DOWN: 'down',
  LEFT: 'left',
  RIGHT: 'right',
  ANY: 'any'
};

/**
 * Scratch 3.0 blocks to interact with a LEGO Boost peripheral.
 */
class Scratch3BoostBlocks {
  /**
   * @return {string} - the ID of this extension.
   */
  static get EXTENSION_ID() {
    return 'boost';
  }

  /**
   * @return {number} - the tilt sensor counts as "tilted" if its tilt angle meets or exceeds this threshold.
   */
  static get TILT_THRESHOLD() {
    return 15;
  }

  /**
   * Construct a set of Boost blocks.
   * @param {Runtime} runtime - the Scratch 3.0 runtime.
   */
  constructor(runtime) {
    /**
     * The Scratch 3.0 runtime.
     * @type {Runtime}
     */
    this.runtime = runtime;

    // Create a new Boost peripheral instance
    this._peripheral = new Boost(this.runtime, Scratch3BoostBlocks.EXTENSION_ID);
  }

  /**
   * @returns {object} metadata for this extension and its blocks.
   */
  getInfo() {
    return {
      id: Scratch3BoostBlocks.EXTENSION_ID,
      name: 'BOOST',
      blockIconURI: iconURI,
      showStatusButton: true,
      blocks: [{
        opcode: 'motorOnFor',
        text: formatMessage({
          id: 'boost.motorOnFor',
          default: 'turn motor [MOTOR_ID] for [DURATION] seconds',
          description: 'turn a motor on for some time'
        }),
        blockType: BlockType.COMMAND,
        arguments: {
          MOTOR_ID: {
            type: ArgumentType.STRING,
            menu: 'MOTOR_ID',
            defaultValue: BoostMotorLabel.A
          },
          DURATION: {
            type: ArgumentType.NUMBER,
            defaultValue: 1
          }
        }
      }, {
        opcode: 'motorOnForRotation',
        text: formatMessage({
          id: 'boost.motorOnForRotation',
          default: 'turn motor [MOTOR_ID] for [ROTATION] rotations',
          description: 'turn a motor on for rotation'
        }),
        blockType: BlockType.COMMAND,
        arguments: {
          MOTOR_ID: {
            type: ArgumentType.STRING,
            menu: 'MOTOR_ID',
            defaultValue: BoostMotorLabel.A
          },
          ROTATION: {
            type: ArgumentType.NUMBER,
            defaultValue: 1
          }
        }
      }, {
        opcode: 'motorOn',
        text: formatMessage({
          id: 'boost.motorOn',
          default: 'turn motor [MOTOR_ID] on',
          description: 'turn a motor on indefinitely'
        }),
        blockType: BlockType.COMMAND,
        arguments: {
          MOTOR_ID: {
            type: ArgumentType.STRING,
            menu: 'MOTOR_ID',
            defaultValue: BoostMotorLabel.A
          }
        }
      }, {
        opcode: 'motorOff',
        text: formatMessage({
          id: 'boost.motorOff',
          default: 'turn motor [MOTOR_ID] off',
          description: 'turn a motor off'
        }),
        blockType: BlockType.COMMAND,
        arguments: {
          MOTOR_ID: {
            type: ArgumentType.STRING,
            menu: 'MOTOR_ID',
            defaultValue: BoostMotorLabel.A
          }
        }
      }, {
        opcode: 'setMotorPower',
        text: formatMessage({
          id: 'boost.setMotorPower',
          default: 'set motor [MOTOR_ID] speed to [POWER] %',
          description: 'set the motor\'s speed without turning it on'
        }),
        blockType: BlockType.COMMAND,
        arguments: {
          MOTOR_ID: {
            type: ArgumentType.STRING,
            menu: 'MOTOR_ID',
            defaultValue: BoostMotorLabel.ALL
          },
          POWER: {
            type: ArgumentType.NUMBER,
            defaultValue: 100
          }
        }
      }, {
        opcode: 'setMotorDirection',
        text: formatMessage({
          id: 'boost.setMotorDirection',
          default: 'set motor [MOTOR_ID] direction [MOTOR_DIRECTION]',
          description: 'set the motor\'s turn direction without turning it on'
        }),
        blockType: BlockType.COMMAND,
        arguments: {
          MOTOR_ID: {
            type: ArgumentType.STRING,
            menu: 'MOTOR_ID',
            defaultValue: BoostMotorLabel.A
          },
          MOTOR_DIRECTION: {
            type: ArgumentType.STRING,
            menu: 'MOTOR_DIRECTION',
            defaultValue: BoostMotorDirection.FORWARD
          }
        }
      }, {
        opcode: 'getMotorPosition',
        text: formatMessage({
          id: 'boost.getMotorPosition',
          default: 'motor [MOTOR_REPORTER_ID] position',
          description: 'the position returned by the motor'
        }),
        blockType: BlockType.REPORTER,
        arguments: {
          MOTOR_REPORTER_ID: {
            type: ArgumentType.STRING,
            menu: 'MOTOR_REPORTER_ID',
            defaultValue: BoostMotorLabel.A
          }
        }
      }, {
        opcode: 'whenColor',
        text: formatMessage({
          id: 'boost.whenColor',
          default: 'when [COLOR] brick seen',
          description: 'check for when color'
        }),
        blockType: BlockType.HAT,
        arguments: {
          COLOR: {
            type: ArgumentType.STRING,
            menu: 'COLOR',
            defaultValue: BoostColor.ANY
          }
        }
      }, {
        opcode: 'seeingColor',
        text: formatMessage({
          id: 'boost.seeingColor',
          default: 'seeing [COLOR] brick?',
          description: 'is the color sensor seeing a certain color?'
        }),
        blockType: BlockType.BOOLEAN,
        arguments: {
          COLOR: {
            type: ArgumentType.STRING,
            menu: 'COLOR',
            defaultValue: BoostColor.ANY
          }
        }
      }, {
        opcode: 'whenTilted',
        text: formatMessage({
          id: 'boost.whenTilted',
          default: 'when tilted [TILT_DIRECTION_ANY]',
          description: 'check when tilted in a certain direction'
        }),
        func: 'isTilted',
        blockType: BlockType.HAT,
        arguments: {
          TILT_DIRECTION_ANY: {
            type: ArgumentType.STRING,
            menu: 'TILT_DIRECTION_ANY',
            defaultValue: BoostTiltDirection.ANY
          }
        }
      }, {
        opcode: 'getTiltAngle',
        text: formatMessage({
          id: 'boost.getTiltAngle',
          default: 'tilt angle [TILT_DIRECTION]',
          description: 'the angle returned by the tilt sensor'
        }),
        blockType: BlockType.REPORTER,
        arguments: {
          TILT_DIRECTION: {
            type: ArgumentType.STRING,
            menu: 'TILT_DIRECTION',
            defaultValue: BoostTiltDirection.UP
          }
        }
      }, {
        opcode: 'setLightHue',
        text: formatMessage({
          id: 'boost.setLightHue',
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
      }],
      menus: {
        MOTOR_ID: {
          acceptReporters: true,
          items: [{
            text: 'A',
            value: BoostMotorLabel.A
          }, {
            text: 'B',
            value: BoostMotorLabel.B
          }, {
            text: 'C',
            value: BoostMotorLabel.C
          }, {
            text: 'D',
            value: BoostMotorLabel.D
          }, {
            text: 'AB',
            value: BoostMotorLabel.AB
          }, {
            text: 'ABCD',
            value: BoostMotorLabel.ALL
          }]
        },
        MOTOR_REPORTER_ID: {
          acceptReporters: true,
          items: [{
            text: 'A',
            value: BoostMotorLabel.A
          }, {
            text: 'B',
            value: BoostMotorLabel.B
          }, {
            text: 'C',
            value: BoostMotorLabel.C
          }, {
            text: 'D',
            value: BoostMotorLabel.D
          }]
        },
        MOTOR_DIRECTION: {
          acceptReporters: true,
          items: [{
            text: formatMessage({
              id: 'boost.motorDirection.forward',
              default: 'this way',
              description: 'label for forward element in motor direction menu for LEGO Boost extension'
            }),
            value: BoostMotorDirection.FORWARD
          }, {
            text: formatMessage({
              id: 'boost.motorDirection.backward',
              default: 'that way',
              description: 'label for backward element in motor direction menu for LEGO Boost extension'
            }),
            value: BoostMotorDirection.BACKWARD
          }, {
            text: formatMessage({
              id: 'boost.motorDirection.reverse',
              default: 'reverse',
              description: 'label for reverse element in motor direction menu for LEGO Boost extension'
            }),
            value: BoostMotorDirection.REVERSE
          }]
        },
        TILT_DIRECTION: {
          acceptReporters: true,
          items: [{
            text: formatMessage({
              id: 'boost.tiltDirection.up',
              default: 'up',
              description: 'label for up element in tilt direction menu for LEGO Boost extension'
            }),
            value: BoostTiltDirection.UP
          }, {
            text: formatMessage({
              id: 'boost.tiltDirection.down',
              default: 'down',
              description: 'label for down element in tilt direction menu for LEGO Boost extension'
            }),
            value: BoostTiltDirection.DOWN
          }, {
            text: formatMessage({
              id: 'boost.tiltDirection.left',
              default: 'left',
              description: 'label for left element in tilt direction menu for LEGO Boost extension'
            }),
            value: BoostTiltDirection.LEFT
          }, {
            text: formatMessage({
              id: 'boost.tiltDirection.right',
              default: 'right',
              description: 'label for right element in tilt direction menu for LEGO Boost extension'
            }),
            value: BoostTiltDirection.RIGHT
          }]
        },
        TILT_DIRECTION_ANY: {
          acceptReporters: true,
          items: [{
            text: formatMessage({
              id: 'boost.tiltDirection.up',
              default: 'up'
            }),
            value: BoostTiltDirection.UP
          }, {
            text: formatMessage({
              id: 'boost.tiltDirection.down',
              default: 'down'
            }),
            value: BoostTiltDirection.DOWN
          }, {
            text: formatMessage({
              id: 'boost.tiltDirection.left',
              default: 'left'
            }),
            value: BoostTiltDirection.LEFT
          }, {
            text: formatMessage({
              id: 'boost.tiltDirection.right',
              default: 'right'
            }),
            value: BoostTiltDirection.RIGHT
          }, {
            text: formatMessage({
              id: 'boost.tiltDirection.any',
              default: 'any',
              description: 'label for any element in tilt direction menu for LEGO Boost extension'
            }),
            value: BoostTiltDirection.ANY
          }]
        },
        COLOR: {
          acceptReporters: true,
          items: [{
            text: formatMessage({
              id: 'boost.color.red',
              default: 'red',
              description: 'the color red'
            }),
            value: BoostColor.RED
          }, {
            text: formatMessage({
              id: 'boost.color.blue',
              default: 'blue',
              description: 'the color blue'
            }),
            value: BoostColor.BLUE
          }, {
            text: formatMessage({
              id: 'boost.color.green',
              default: 'green',
              description: 'the color green'
            }),
            value: BoostColor.GREEN
          }, {
            text: formatMessage({
              id: 'boost.color.yellow',
              default: 'yellow',
              description: 'the color yellow'
            }),
            value: BoostColor.YELLOW
          }, {
            text: formatMessage({
              id: 'boost.color.white',
              default: 'white',
              desription: 'the color white'
            }),
            value: BoostColor.WHITE
          }, {
            text: formatMessage({
              id: 'boost.color.black',
              default: 'black',
              description: 'the color black'
            }),
            value: BoostColor.BLACK
          }, {
            text: formatMessage({
              id: 'boost.color.any',
              default: 'any color',
              description: 'any color'
            }),
            value: BoostColor.ANY
          }]
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
        if (motor) motor.turnOnFor(durationMS);
      });

      // Run for some time even when no motor is connected
      setTimeout(resolve, durationMS);
    });
  }

  /**
   * Turn specified motor(s) on for a specified rotation in full rotations.
   * @param {object} args - the block's arguments.
   * @property {MotorID} MOTOR_ID - the motor(s) to activate.
   * @property {int} ROTATION - the amount of full rotations to turn the motors.
   * @return {Promise} - a promise which will resolve at the end of the duration.
   */
  motorOnForRotation(args) {
    // TODO: cast args.MOTOR_ID?
    let degrees = Cast.toNumber(args.ROTATION) * 360;
    // TODO: Clamps to 100 rotations. Consider changing.
    const sign = Math.sign(degrees);
    degrees = Math.abs(MathUtil.clamp(degrees, -360000, 360000));
    const motors = [];
    this._forEachMotor(args.MOTOR_ID, motorIndex => {
      motors.push(motorIndex);
    });

    /**
     * Checks that the motors given in args.MOTOR_ID exist,
     * and maps a promise for each of the motor-commands to an array.
     */
    const promises = motors.map(portID => {
      const motor = this._peripheral.motor(portID);
      if (motor) {
        // to avoid a hanging block if power is 0, return an immediately resolving promise.
        if (motor.power === 0) return Promise.resolve();
        return new Promise(resolve => {
          motor.turnOnForDegrees(degrees, sign);
          motor.pendingRotationPromise = resolve;
        });
      }
      return null;
    });
    /**
     * Make sure all promises are resolved, i.e. all motor-commands have completed.
     * To prevent the block from returning a value, an empty function is added to the .then
     */
    return Promise.all(promises).then(() => {});
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
      if (motor) motor.turnOnForever();
    });
    return new Promise(resolve => {
      window.setTimeout(() => {
        resolve();
      }, BoostBLE.sendInterval);
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
      if (motor) motor.turnOff();
    });
    return new Promise(resolve => {
      window.setTimeout(() => {
        resolve();
      }, BoostBLE.sendInterval);
    });
  }

  /**
   * Set the power level of the specified motor(s).
   * @param {object} args - the block's arguments.
   * @property {MotorID} MOTOR_ID - the motor(s) to be affected.
   * @property {int} POWER - the new power level for the motor(s).
   * @return {Promise} - returns a promise to make sure the block yields.
   */
  setMotorPower(args) {
    // TODO: cast args.MOTOR_ID?
    this._forEachMotor(args.MOTOR_ID, motorIndex => {
      const motor = this._peripheral.motor(motorIndex);
      if (motor) {
        motor.power = MathUtil.clamp(Cast.toNumber(args.POWER), 0, 100);
        switch (motor.status) {
          case BoostMotorState.ON_FOREVER:
            motor.turnOnForever();
            break;
          case BoostMotorState.ON_FOR_TIME:
            motor.turnOnFor(motor.pendingDurationTimeoutStartTime + motor.pendingDurationTimeoutDelay - Date.now());
            break;
        }
      }
    });
    return new Promise(resolve => {
      window.setTimeout(() => {
        resolve();
      }, BoostBLE.sendInterval);
    });
  }

  /**
   * Set the direction of rotation for specified motor(s).
   * If the direction is 'reverse' the motor(s) will be reversed individually.
   * @param {object} args - the block's arguments.
   * @property {MotorID} MOTOR_ID - the motor(s) to be affected.
   * @property {MotorDirection} MOTOR_DIRECTION - the new direction for the motor(s).
   * @return {Promise} - returns a promise to make sure the block yields.
   */
  setMotorDirection(args) {
    // TODO: cast args.MOTOR_ID?
    this._forEachMotor(args.MOTOR_ID, motorIndex => {
      const motor = this._peripheral.motor(motorIndex);
      if (motor) {
        switch (args.MOTOR_DIRECTION) {
          case BoostMotorDirection.FORWARD:
            motor.direction = 1;
            break;
          case BoostMotorDirection.BACKWARD:
            motor.direction = -1;
            break;
          case BoostMotorDirection.REVERSE:
            motor.direction = -motor.direction;
            break;
          default:
            log.warn("Unknown motor direction in setMotorDirection: ".concat(args.DIRECTION));
            break;
        }
        // keep the motor on if it's running, and update the pending timeout if needed
        if (motor) {
          switch (motor.status) {
            case BoostMotorState.ON_FOREVER:
              motor.turnOnForever();
              break;
            case BoostMotorState.ON_FOR_TIME:
              motor.turnOnFor(motor.pendingDurationTimeoutStartTime + motor.pendingDurationTimeoutDelay - Date.now());
              break;
          }
        }
      }
    });
    return new Promise(resolve => {
      window.setTimeout(() => {
        resolve();
      }, BoostBLE.sendInterval);
    });
  }

  /**
   * @param {object} args - the block's arguments.
   * @return {number} - returns the motor's position.
   */
  getMotorPosition(args) {
    let portID = null;
    switch (args.MOTOR_REPORTER_ID) {
      case BoostMotorLabel.A:
        portID = BoostPort.A;
        break;
      case BoostMotorLabel.B:
        portID = BoostPort.B;
        break;
      case BoostMotorLabel.C:
        portID = BoostPort.C;
        break;
      case BoostMotorLabel.D:
        portID = BoostPort.D;
        break;
      default:
        log.warn('Asked for a motor position that doesnt exist!');
        return false;
    }
    if (portID !== null && this._peripheral.motor(portID)) {
      let val = this._peripheral.motor(portID).position;
      // Boost motor A position direction is reversed by design
      // so we have to reverse the position here
      if (portID === BoostPort.A) {
        val *= -1;
      }
      return MathUtil.wrapClamp(val, 0, 360);
    }
    return 0;
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
      case BoostMotorLabel.A:
        motors = [BoostPort.A];
        break;
      case BoostMotorLabel.B:
        motors = [BoostPort.B];
        break;
      case BoostMotorLabel.C:
        motors = [BoostPort.C];
        break;
      case BoostMotorLabel.D:
        motors = [BoostPort.D];
        break;
      case BoostMotorLabel.AB:
        motors = [BoostPort.A, BoostPort.B];
        break;
      case BoostMotorLabel.ALL:
        motors = [BoostPort.A, BoostPort.B, BoostPort.C, BoostPort.D];
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
   * Test whether the tilt sensor is currently tilted.
   * @param {object} args - the block's arguments.
   * @property {TiltDirection} TILT_DIRECTION_ANY - the tilt direction to test (up, down, left, right, or any).
   * @return {boolean} - true if the tilt sensor is tilted past a threshold in the specified direction.
   */
  whenTilted(args) {
    return this._isTilted(args.TILT_DIRECTION_ANY);
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
      case BoostTiltDirection.ANY:
        return Math.abs(this._peripheral.tiltX) >= Scratch3BoostBlocks.TILT_THRESHOLD || Math.abs(this._peripheral.tiltY) >= Scratch3BoostBlocks.TILT_THRESHOLD;
      default:
        return this._getTiltAngle(direction) >= Scratch3BoostBlocks.TILT_THRESHOLD;
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
      case BoostTiltDirection.UP:
        return this._peripheral.tiltY > 90 ? 256 - this._peripheral.tiltY : -this._peripheral.tiltY;
      case BoostTiltDirection.DOWN:
        return this._peripheral.tiltY > 90 ? this._peripheral.tiltY - 256 : this._peripheral.tiltY;
      case BoostTiltDirection.LEFT:
        return this._peripheral.tiltX > 90 ? this._peripheral.tiltX - 256 : this._peripheral.tiltX;
      case BoostTiltDirection.RIGHT:
        return this._peripheral.tiltX > 90 ? 256 - this._peripheral.tiltX : -this._peripheral.tiltX;
      default:
        log.warn("Unknown tilt direction in _getTiltAngle: ".concat(direction));
    }
  }

  /**
   * Edge-triggering hat function, for when the vision sensor is detecting
   * a certain color.
   * @param {object} args - the block's arguments.
   * @return {boolean} - true when the color sensor senses the specified color.
   */
  whenColor(args) {
    if (args.COLOR === BoostColor.ANY) {
      // For "any" color, return true if the color is not "none", and
      // the color is different from the previous color detected. This
      // allows the hat to trigger when the color changes from one color
      // to another.
      return this._peripheral.color !== BoostColor.NONE && this._peripheral.color !== this._peripheral.previousColor;
    }
    return args.COLOR === this._peripheral.color;
  }

  /**
   * A boolean reporter function, for whether the vision sensor is detecting
   * a certain color.
   * @param {object} args - the block's arguments.
   * @return {boolean} - true when the color sensor senses the specified color.
   */
  seeingColor(args) {
    if (args.COLOR === BoostColor.ANY) {
      return this._peripheral.color !== BoostColor.NONE;
    }
    return args.COLOR === this._peripheral.color;
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
    this._peripheral._led = inputHue;
    this._peripheral.setLED(rgbDecimal);
    return new Promise(resolve => {
      window.setTimeout(() => {
        resolve();
      }, BoostBLE.sendInterval);
    });
  }
}
module.exports = Scratch3BoostBlocks;

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
//# sourceMappingURL=4.js.map