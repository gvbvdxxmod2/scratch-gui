(window["webpackJsonpGUI"] = window["webpackJsonpGUI"] || []).push([[5],{

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

/***/ "./node_modules/scratch-vm/src/extensions/scratch3_ev3/index.js":
/*!**********************************************************************!*\
  !*** ./node_modules/scratch-vm/src/extensions/scratch3_ev3/index.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const ArgumentType = __webpack_require__(/*! ../../extension-support/argument-type */ "./node_modules/scratch-vm/src/extension-support/argument-type.js");
const BlockType = __webpack_require__(/*! ../../extension-support/block-type */ "./node_modules/scratch-vm/src/extension-support/block-type.js");
const Cast = __webpack_require__(/*! ../../util/cast */ "./node_modules/scratch-vm/src/util/cast.js");
const formatMessage = __webpack_require__(/*! format-message */ "./node_modules/scratch-vm/node_modules/format-message/index.js");
const uid = __webpack_require__(/*! ../../util/uid */ "./node_modules/scratch-vm/src/util/uid.js");
const BT = __webpack_require__(/*! ../../io/bt */ "./node_modules/scratch-vm/src/io/bt.js");
const Base64Util = __webpack_require__(/*! ../../util/base64-util */ "./node_modules/scratch-vm/src/util/base64-util.js");
const MathUtil = __webpack_require__(/*! ../../util/math-util */ "./node_modules/scratch-vm/src/util/math-util.js");
const RateLimiter = __webpack_require__(/*! ../../util/rateLimiter.js */ "./node_modules/scratch-vm/src/util/rateLimiter.js");
const log = __webpack_require__(/*! ../../util/log */ "./node_modules/scratch-vm/src/util/log.js");

/**
 * Icon svg to be displayed at the left edge of each extension block, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len
const blockIconURI = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNDBweCIgaGVpZ2h0PSI0MHB4IiB2aWV3Qm94PSIwIDAgNDAgNDAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUwLjIgKDU1MDQ3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5ldjMtYmxvY2staWNvbjwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJldjMtYmxvY2staWNvbiIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9ImV2MyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNS41MDAwMDAsIDMuNTAwMDAwKSIgZmlsbC1ydWxlPSJub256ZXJvIj4KICAgICAgICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZS1wYXRoIiBzdHJva2U9IiM3Qzg3QTUiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgeD0iMC41IiB5PSIzLjU5IiB3aWR0aD0iMjgiIGhlaWdodD0iMjUuODEiIHJ4PSIxIj48L3JlY3Q+CiAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUtcGF0aCIgc3Ryb2tlPSIjN0M4N0E1IiBmaWxsPSIjRTZFN0U4IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHg9IjIuNSIgeT0iMC41IiB3aWR0aD0iMjQiIGhlaWdodD0iMzIiIHJ4PSIxIj48L3JlY3Q+CiAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUtcGF0aCIgc3Ryb2tlPSIjN0M4N0E1IiBmaWxsPSIjRkZGRkZGIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHg9IjIuNSIgeT0iMTQuNSIgd2lkdGg9IjI0IiBoZWlnaHQ9IjEzIj48L3JlY3Q+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0xNC41LDEwLjUgTDE0LjUsMTQuNSIgaWQ9IlNoYXBlIiBzdHJva2U9IiM3Qzg3QTUiIGZpbGw9IiNFNkU3RTgiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PC9wYXRoPgogICAgICAgICAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlLXBhdGgiIGZpbGw9IiM0MTQ3NTciIHg9IjQuNSIgeT0iMi41IiB3aWR0aD0iMjAiIGhlaWdodD0iMTAiIHJ4PSIxIj48L3JlY3Q+CiAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUtcGF0aCIgZmlsbD0iIzdDODdBNSIgb3BhY2l0eT0iMC41IiB4PSIxMy41IiB5PSIyMC4xMyIgd2lkdGg9IjIiIGhlaWdodD0iMiIgcng9IjAuNSI+PC9yZWN0PgogICAgICAgICAgICA8cGF0aCBkPSJNOS4wNiwyMC4xMyBMMTAuNTYsMjAuMTMgQzEwLjgzNjE0MjQsMjAuMTMgMTEuMDYsMjAuMzUzODU3NiAxMS4wNiwyMC42MyBMMTEuMDYsMjEuNjMgQzExLjA2LDIxLjkwNjE0MjQgMTAuODM2MTQyNCwyMi4xMyAxMC41NiwyMi4xMyBMOS4wNiwyMi4xMyBDOC41MDc3MTUyNSwyMi4xMyA4LjA2LDIxLjY4MjI4NDcgOC4wNiwyMS4xMyBDOC4wNiwyMC41Nzc3MTUzIDguNTA3NzE1MjUsMjAuMTMgOS4wNiwyMC4xMyBaIiBpZD0iU2hhcGUiIGZpbGw9IiM3Qzg3QTUiIG9wYWNpdHk9IjAuNSI+PC9wYXRoPgogICAgICAgICAgICA8cGF0aCBkPSJNMTguOTEsMjAuMTMgTDIwLjQyLDIwLjEzIEMyMC42OTYxNDI0LDIwLjEzIDIwLjkyLDIwLjM1Mzg1NzYgMjAuOTIsMjAuNjMgTDIwLjkyLDIxLjYzIEMyMC45MiwyMS45MDYxNDI0IDIwLjY5NjE0MjQsMjIuMTMgMjAuNDIsMjIuMTMgTDE4LjkyLDIyLjEzIEMxOC4zNjc3MTUzLDIyLjEzIDE3LjkyLDIxLjY4MjI4NDcgMTcuOTIsMjEuMTMgQzE3LjkxOTk3MjYsMjAuNTgxNTk3IDE4LjM2MTYyNDUsMjAuMTM1NDg0IDE4LjkxLDIwLjEzIFoiIGlkPSJTaGFwZSIgZmlsbD0iIzdDODdBNSIgb3BhY2l0eT0iMC41IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxOS40MjAwMDAsIDIxLjEzMDAwMCkgcm90YXRlKC0xODAuMDAwMDAwKSB0cmFuc2xhdGUoLTE5LjQyMDAwMCwgLTIxLjEzMDAwMCkgIj48L3BhdGg+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik04LjIzLDE3LjUgTDUsMTcuNSBDNC43MjM4NTc2MywxNy41IDQuNSwxNy4yNzYxNDI0IDQuNSwxNyBMNC41LDE0LjUgTDEwLjUsMTQuNSBMOC42NSwxNy4yOCBDOC41NTQ2Njk2MSwxNy40MTc5MDgyIDguMzk3NjUwMDYsMTcuNTAwMTU2NiA4LjIzLDE3LjUgWiIgaWQ9IlNoYXBlIiBmaWxsPSIjN0M4N0E1IiBvcGFjaXR5PSIwLjUiPjwvcGF0aD4KICAgICAgICAgICAgPHBhdGggZD0iTTE4LjE1LDE4Ljg1IEwxNy42NSwxOS4zNSBDMTcuNTUyMzQxNiwxOS40NDQwNzU2IDE3LjQ5ODAzMzksMTkuNTc0NDE0MiAxNy41LDE5LjcxIEwxNy41LDIwIEMxNy41LDIwLjI3NjE0MjQgMTcuMjc2MTQyNCwyMC41IDE3LDIwLjUgTDE2LjUsMjAuNSBDMTYuMjIzODU3NiwyMC41IDE2LDIwLjI3NjE0MjQgMTYsMjAgQzE2LDE5LjcyMzg1NzYgMTUuNzc2MTQyNCwxOS41IDE1LjUsMTkuNSBMMTMuNSwxOS41IEMxMy4yMjM4NTc2LDE5LjUgMTMsMTkuNzIzODU3NiAxMywyMCBDMTMsMjAuMjc2MTQyNCAxMi43NzYxNDI0LDIwLjUgMTIuNSwyMC41IEwxMiwyMC41IEMxMS43MjM4NTc2LDIwLjUgMTEuNSwyMC4yNzYxNDI0IDExLjUsMjAgTDExLjUsMTkuNzEgQzExLjUwMTk2NjEsMTkuNTc0NDE0MiAxMS40NDc2NTg0LDE5LjQ0NDA3NTYgMTEuMzUsMTkuMzUgTDEwLjg1LDE4Ljg1IEMxMC42NTgyMTY3LDE4LjY1MjE4NjMgMTAuNjU4MjE2NywxOC4zMzc4MTM3IDEwLjg1LDE4LjE0IEwxMi4zNiwxNi42NSBDMTIuNDUwMjgwMywxNi41NTI4NjE3IDEyLjU3NzM5NjEsMTYuNDk4MzgzNSAxMi43MSwxNi41IEwxNi4yOSwxNi41IEMxNi40MjI2MDM5LDE2LjQ5ODM4MzUgMTYuNTQ5NzE5NywxNi41NTI4NjE3IDE2LjY0LDE2LjY1IEwxOC4xNSwxOC4xNCBDMTguMzQxNzgzMywxOC4zMzc4MTM3IDE4LjM0MTc4MzMsMTguNjUyMTg2MyAxOC4xNSwxOC44NSBaIiBpZD0iU2hhcGUiIGZpbGw9IiM3Qzg3QTUiIG9wYWNpdHk9IjAuNSI+PC9wYXRoPgogICAgICAgICAgICA8cGF0aCBkPSJNMTAuODUsMjMuNDUgTDExLjM1LDIyLjk1IEMxMS40NDc2NTg0LDIyLjg1NTkyNDQgMTEuNTAxOTY2MSwyMi43MjU1ODU4IDExLjUsMjIuNTkgTDExLjUsMjIuMyBDMTEuNSwyMi4wMjM4NTc2IDExLjcyMzg1NzYsMjEuOCAxMiwyMS44IEwxMi41LDIxLjggQzEyLjc3NjE0MjQsMjEuOCAxMywyMi4wMjM4NTc2IDEzLDIyLjMgQzEzLDIyLjU3NjE0MjQgMTMuMjIzODU3NiwyMi44IDEzLjUsMjIuOCBMMTUuNSwyMi44IEMxNS43NzYxNDI0LDIyLjggMTYsMjIuNTc2MTQyNCAxNiwyMi4zIEMxNiwyMi4wMjM4NTc2IDE2LjIyMzg1NzYsMjEuOCAxNi41LDIxLjggTDE3LDIxLjggQzE3LjI3NjE0MjQsMjEuOCAxNy41LDIyLjAyMzg1NzYgMTcuNSwyMi4zIEwxNy41LDIyLjU5IEMxNy40OTgwMzM5LDIyLjcyNTU4NTggMTcuNTUyMzQxNiwyMi44NTU5MjQ0IDE3LjY1LDIyLjk1IEwxOC4xNSwyMy40NSBDMTguMzQwNTcxNCwyMy42NDQ0MjE4IDE4LjM0MDU3MTQsMjMuOTU1NTc4MiAxOC4xNSwyNC4xNSBMMTYuNjQsMjUuNjUgQzE2LjU0OTcxOTcsMjUuNzQ3MTM4MyAxNi40MjI2MDM5LDI1LjgwMTYxNjUgMTYuMjksMjUuOCBMMTIuNzEsMjUuOCBDMTIuNTc3Mzk2MSwyNS44MDE2MTY1IDEyLjQ1MDI4MDMsMjUuNzQ3MTM4MyAxMi4zNiwyNS42NSBMMTAuODUsMjQuMTUgQzEwLjY1OTQyODYsMjMuOTU1NTc4MiAxMC42NTk0Mjg2LDIzLjY0NDQyMTggMTAuODUsMjMuNDUgWiIgaWQ9IlNoYXBlIiBmaWxsPSIjN0M4N0E1IiBvcGFjaXR5PSIwLjUiPjwvcGF0aD4KICAgICAgICAgICAgPHBhdGggZD0iTTIxLjUsMjcuNSBMMjYuNSwyNy41IEwyNi41LDMxLjUgQzI2LjUsMzIuMDUyMjg0NyAyNi4wNTIyODQ3LDMyLjUgMjUuNSwzMi41IEwyMS41LDMyLjUgTDIxLjUsMjcuNSBaIiBpZD0iU2hhcGUiIHN0cm9rZT0iI0NDNEMyMyIgZmlsbD0iI0YxNUEyOSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48L3BhdGg+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=';

/**
 * String with Ev3 expected pairing pin.
 * @readonly
 */
const Ev3PairingPin = '1234';

/**
 * A maximum number of BT message sends per second, to be enforced by the rate limiter.
 * @type {number}
 */
const BTSendRateMax = 40;

/**
 * Enum for Ev3 parameter encodings of various argument and return values.
 * Found in the 'EV3 Firmware Developer Kit', section4, page 9, at
 * https://education.lego.com/en-us/support/mindstorms-ev3/developer-kits.
 *
 * The format for these values is:
 * 0xxxxxxx for Short Format
 * 1ttt-bbb for Long Format
 *
 * @readonly
 * @enum {number}
 */
const Ev3Encoding = {
  ONE_BYTE: 0x81,
  // = 0b1000-001, "1 byte to follow"
  TWO_BYTES: 0x82,
  // = 0b1000-010, "2 bytes to follow"
  FOUR_BYTES: 0x83,
  // = 0b1000-011, "4 bytes to follow"
  GLOBAL_VARIABLE_ONE_BYTE: 0xE1,
  // = 0b1110-001, "1 byte to follow"
  GLOBAL_CONSTANT_INDEX_0: 0x20,
  // = 0b00100000
  GLOBAL_VARIABLE_INDEX_0: 0x60 // = 0b01100000
};

/**
 * Enum for Ev3 direct command types.
 * Found in the 'EV3 Communication Developer Kit', section 4, page 24, at
 * https://education.lego.com/en-us/support/mindstorms-ev3/developer-kits.
 * @readonly
 * @enum {number}
 */
const Ev3Command = {
  DIRECT_COMMAND_REPLY: 0x00,
  DIRECT_COMMAND_NO_REPLY: 0x80,
  DIRECT_REPLY: 0x02
};

/**
 * Enum for Ev3 commands opcodes.
 * Found in the 'EV3 Firmware Developer Kit', section 4, page 10, at
 * https://education.lego.com/en-us/support/mindstorms-ev3/developer-kits.
 * @readonly
 * @enum {number}
 */
const Ev3Opcode = {
  OPOUTPUT_STEP_SPEED: 0xAE,
  OPOUTPUT_TIME_SPEED: 0xAF,
  OPOUTPUT_STOP: 0xA3,
  OPOUTPUT_RESET: 0xA2,
  OPOUTPUT_STEP_SYNC: 0xB0,
  OPOUTPUT_TIME_SYNC: 0xB1,
  OPOUTPUT_GET_COUNT: 0xB3,
  OPSOUND: 0x94,
  OPSOUND_CMD_TONE: 1,
  OPSOUND_CMD_STOP: 0,
  OPINPUT_DEVICE_LIST: 0x98,
  OPINPUT_READSI: 0x9D
};

/**
 * Enum for Ev3 values used as arguments to various opcodes.
 * Found in the 'EV3 Firmware Developer Kit', section4, page 10-onwards, at
 * https://education.lego.com/en-us/support/mindstorms-ev3/developer-kits.
 * @readonly
 * @enum {number}
 */
const Ev3Args = {
  LAYER: 0,
  // always 0, chained EV3s not supported
  COAST: 0,
  BRAKE: 1,
  RAMP: 50,
  // time in milliseconds
  DO_NOT_CHANGE_TYPE: 0,
  MAX_DEVICES: 32 // 'Normally 32' from pg. 46
};

/**
 * Enum for Ev3 device type numbers.
 * Found in the 'EV3 Firmware Developer Kit', section 5, page 100, at
 * https://education.lego.com/en-us/support/mindstorms-ev3/developer-kits.
 * @readonly
 * @enum {string}
 */
const Ev3Device = {
  29: 'color',
  30: 'ultrasonic',
  32: 'gyro',
  16: 'touch',
  8: 'mediumMotor',
  7: 'largeMotor',
  126: 'none',
  125: 'none'
};

/**
 * Enum for Ev3 device modes.
 * Found in the 'EV3 Firmware Developer Kit', section 5, page 100, at
 * https://education.lego.com/en-us/support/mindstorms-ev3/developer-kits.
 * @readonly
 * @enum {number}
 */
const Ev3Mode = {
  touch: 0,
  // touch
  color: 1,
  // ambient
  ultrasonic: 1,
  // inch
  none: 0
};

/**
 * Enum for Ev3 device labels used in the Scratch blocks/UI.
 * @readonly
 * @enum {string}
 */
const Ev3Label = {
  touch: 'button',
  color: 'brightness',
  ultrasonic: 'distance'
};

/**
 * Manage power, direction, and timers for one EV3 motor.
 */
class EV3Motor {
  /**
   * Construct a EV3 Motor instance, which could be of type 'largeMotor' or
   * 'mediumMotor'.
   *
   * @param {EV3} parent - the EV3 peripheral which owns this motor.
   * @param {int} index - the zero-based index of this motor on its parent peripheral.
   * @param {string} type - the type of motor (i.e. 'largeMotor' or 'mediumMotor').
   */
  constructor(parent, index, type) {
    /**
     * The EV3 peripheral which owns this motor.
     * @type {EV3}
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
     * The type of EV3 motor this could be: 'largeMotor' or 'mediumMotor'.
     * @type {string}
     * @private
     */
    this._type = type;

    /**
     * This motor's current direction: 1 for "clockwise" or -1 for "counterclockwise"
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
     * This motor's current position, in the range [0,360].
     * @type {number}
     * @private
     */
    this._position = 0;

    /**
     * An ID for the current coast command, to help override multiple coast
     * commands sent in succession.
     * @type {number}
     * @private
     */
    this._commandID = null;

    /**
     * A delay, in milliseconds, to add to coasting, to make sure that a brake
     * first takes effect if one was sent.
     * @type {number}
     * @private
     */
    this._coastDelay = 1000;
  }

  /**
   * @return {string} - this motor's type: 'largeMotor' or 'mediumMotor'
   */
  get type() {
    return this._type;
  }

  /**
   * @param {string} value - this motor's new type: 'largeMotor' or 'mediumMotor'
   */
  set type(value) {
    this._type = value;
  }

  /**
   * @return {int} - this motor's current direction: 1 for "clockwise" or -1 for "counterclockwise"
   */
  get direction() {
    return this._direction;
  }

  /**
   * @param {int} value - this motor's new direction: 1 for "clockwise" or -1 for "counterclockwise"
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
    this._power = value;
  }

  /**
   * @return {int} - this motor's current position, in the range [-inf,inf].
   */
  get position() {
    return this._position;
  }

  /**
   * @param {int} array - this motor's new position, in the range [0,360].
   */
  set position(array) {
    // tachoValue from Paula
    let value = array[0] + array[1] * 256 + array[2] * 256 * 256 + array[3] * 256 * 256 * 256;
    if (value > 0x7fffffff) {
      value = value - 0x100000000;
    }
    this._position = value;
  }

  /**
   * Turn this motor on for a specific duration.
   * Found in the 'EV3 Firmware Developer Kit', page 56, at
   * https://education.lego.com/en-us/support/mindstorms-ev3/developer-kits.
   *
   * Opcode arguments:
   * (Data8) LAYER – Specify chain layer number [0 - 3]
   * (Data8) NOS – Output bit field [0x00 – 0x0F]
   * (Data8) SPEED – Power level, [-100 – 100]
   * (Data32) STEP1 – Time in milliseconds for ramp up
   * (Data32) STEP2 – Time in milliseconds for continues run
   * (Data32) STEP3 – Time in milliseconds for ramp down
   * (Data8) BRAKE - Specify break level [0: Float, 1: Break]
   *
   * @param {number} milliseconds - run the motor for this long.
   */
  turnOnFor(milliseconds) {
    if (this._power === 0) return;
    const port = this._portMask(this._index);
    let n = milliseconds;
    let speed = this._power * this._direction;
    const ramp = Ev3Args.RAMP;
    let byteCommand = [];
    byteCommand[0] = Ev3Opcode.OPOUTPUT_TIME_SPEED;

    // If speed is less than zero, make it positive and multiply the input
    // value by -1
    if (speed < 0) {
      speed = -1 * speed;
      n = -1 * n;
    }
    // If the input value is less than 0
    const dir = n < 0 ? 0x100 - speed : speed; // step negative or positive
    n = Math.abs(n);
    // Setup motor run duration and ramping behavior
    let rampup = ramp;
    let rampdown = ramp;
    let run = n - ramp * 2;
    if (run < 0) {
      rampup = Math.floor(n / 2);
      run = 0;
      rampdown = n - rampup;
    }
    // Generate motor command values
    const runcmd = this._runValues(run);
    byteCommand = byteCommand.concat([Ev3Args.LAYER, port, Ev3Encoding.ONE_BYTE, dir & 0xff, Ev3Encoding.ONE_BYTE, rampup]).concat(runcmd.concat([Ev3Encoding.ONE_BYTE, rampdown, Ev3Args.BRAKE]));
    const cmd = this._parent.generateCommand(Ev3Command.DIRECT_COMMAND_NO_REPLY, byteCommand);
    this._parent.send(cmd);
    this.coastAfter(milliseconds);
  }

  /**
   * Set the motor to coast after a specified amount of time.
   * @param {number} time - the time in milliseconds.
   */
  coastAfter(time) {
    if (this._power === 0) return;

    // Set the motor command id to check before starting coast
    const commandId = uid();
    this._commandID = commandId;

    // Send coast message
    setTimeout(() => {
      // Do not send coast if another motor command changed the command id.
      if (this._commandID === commandId) {
        this.coast();
        this._commandID = null;
      }
    }, time + this._coastDelay); // add a delay so the brake takes effect
  }

  /**
   * Set the motor to coast.
   */
  coast() {
    if (this._power === 0) return;
    const cmd = this._parent.generateCommand(Ev3Command.DIRECT_COMMAND_NO_REPLY, [Ev3Opcode.OPOUTPUT_STOP, Ev3Args.LAYER, this._portMask(this._index),
    // port output bit field
    Ev3Args.COAST]);
    this._parent.send(cmd, false); // don't use rate limiter to ensure motor stops
  }

  /**
   * Generate motor run values for a given input.
   * @param  {number} run - run input.
   * @return {array} - run values as a byte array.
   */
  _runValues(run) {
    // If run duration is less than max 16-bit integer
    if (run < 0x7fff) {
      return [Ev3Encoding.TWO_BYTES, run & 0xff, run >> 8 & 0xff];
    }

    // Run forever
    return [Ev3Encoding.FOUR_BYTES, run & 0xff, run >> 8 & 0xff, run >> 16 & 0xff, run >> 24 & 0xff];
  }

  /**
   * Return a port value for the EV3 that is in the format for 'output bit field'
   * as 1/2/4/8, generally needed for motor ports, instead of the typical 0/1/2/3.
   * The documentation in the 'EV3 Firmware Developer Kit' for motor port arguments
   * is sometimes mistaken, but we believe motor ports are mostly addressed this way.
   * @param {number} port - the port number to convert to an 'output bit field'.
   * @return {number} - the converted port number.
   */
  _portMask(port) {
    return Math.pow(2, port);
  }
}
class EV3 {
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
     * A list of the names of the sensors connected in ports 1,2,3,4.
     * @type {string[]}
     * @private
     */
    this._sensorPorts = [];

    /**
     * A list of the names of the motors connected in ports A,B,C,D.
     * @type {string[]}
     * @private
     */
    this._motorPorts = [];

    /**
     * The state of all sensor values.
     * @type {string[]}
     * @private
     */
    this._sensors = {
      distance: 0,
      brightness: 0,
      buttons: [0, 0, 0, 0]
    };

    /**
     * The motors which this EV3 could possibly have connected.
     * @type {string[]}
     * @private
     */
    this._motors = [null, null, null, null];

    /**
     * The polling interval, in milliseconds.
     * @type {number}
     * @private
     */
    this._pollingInterval = 150;

    /**
     * The polling interval ID.
     * @type {number}
     * @private
     */
    this._pollingIntervalID = null;

    /**
     * The counter keeping track of polling cycles.
     * @type {string[]}
     * @private
     */
    this._pollingCounter = 0;

    /**
     * The Bluetooth socket connection for reading/writing peripheral data.
     * @type {BT}
     * @private
     */
    this._bt = null;
    this._runtime.registerPeripheralExtension(extensionId, this);

    /**
     * A rate limiter utility, to help limit the rate at which we send BT messages
     * over the socket to Scratch Link to a maximum number of sends per second.
     * @type {RateLimiter}
     * @private
     */
    this._rateLimiter = new RateLimiter(BTSendRateMax);
    this.reset = this.reset.bind(this);
    this._onConnect = this._onConnect.bind(this);
    this._onMessage = this._onMessage.bind(this);
    this._pollValues = this._pollValues.bind(this);
  }
  get distance() {
    let value = this._sensors.distance > 100 ? 100 : this._sensors.distance;
    value = value < 0 ? 0 : value;
    value = Math.round(100 * value) / 100;
    return value;
  }
  get brightness() {
    return this._sensors.brightness;
  }

  /**
   * Access a particular motor on this peripheral.
   * @param {int} index - the zero-based index of the desired motor.
   * @return {EV3Motor} - the EV3Motor instance, if any, at that index.
   */
  motor(index) {
    return this._motors[index];
  }
  isButtonPressed(port) {
    return this._sensors.buttons[port] === 1;
  }
  beep(freq, time) {
    const cmd = this.generateCommand(Ev3Command.DIRECT_COMMAND_NO_REPLY, [Ev3Opcode.OPSOUND, Ev3Opcode.OPSOUND_CMD_TONE, Ev3Encoding.ONE_BYTE, 2, Ev3Encoding.TWO_BYTES, freq, freq >> 8, Ev3Encoding.TWO_BYTES, time, time >> 8]);
    this.send(cmd);
  }
  stopAll() {
    this.stopAllMotors();
    this.stopSound();
  }
  stopSound() {
    const cmd = this.generateCommand(Ev3Command.DIRECT_COMMAND_NO_REPLY, [Ev3Opcode.OPSOUND, Ev3Opcode.OPSOUND_CMD_STOP]);
    this.send(cmd, false); // don't use rate limiter to ensure sound stops
  }
  stopAllMotors() {
    this._motors.forEach(motor => {
      if (motor) {
        motor.coast();
      }
    });
  }

  /**
   * Called by the runtime when user wants to scan for an EV3 peripheral.
   */
  scan() {
    if (this._bt) {
      this._bt.disconnect();
    }
    this._bt = new BT(this._runtime, this._extensionId, {
      majorDeviceClass: 8,
      minorDeviceClass: 1
    }, this._onConnect, this.reset, this._onMessage);
  }

  /**
   * Called by the runtime when user wants to connect to a certain EV3 peripheral.
   * @param {number} id - the id of the peripheral to connect to.
   */
  connect(id) {
    if (this._bt) {
      this._bt.connectPeripheral(id, Ev3PairingPin);
    }
  }

  /**
   * Called by the runtime when user wants to disconnect from the EV3 peripheral.
   */
  disconnect() {
    if (this._bt) {
      this._bt.disconnect();
    }
    this.reset();
  }

  /**
   * Reset all the state and timeout/interval ids.
   */
  reset() {
    this._sensorPorts = [];
    this._motorPorts = [];
    this._sensors = {
      distance: 0,
      brightness: 0,
      buttons: [0, 0, 0, 0]
    };
    this._motors = [null, null, null, null];
    if (this._pollingIntervalID) {
      window.clearInterval(this._pollingIntervalID);
      this._pollingIntervalID = null;
    }
  }

  /**
   * Called by the runtime to detect whether the EV3 peripheral is connected.
   * @return {boolean} - the connected state.
   */
  isConnected() {
    let connected = false;
    if (this._bt) {
      connected = this._bt.isConnected();
    }
    return connected;
  }

  /**
   * Send a message to the peripheral BT socket.
   * @param {Uint8Array} message - the message to send.
   * @param {boolean} [useLimiter=true] - if true, use the rate limiter
   * @return {Promise} - a promise result of the send operation.
   */
  send(message) {
    let useLimiter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    if (!this.isConnected()) return Promise.resolve();
    if (useLimiter) {
      if (!this._rateLimiter.okayToSend()) return Promise.resolve();
    }
    return this._bt.sendMessage({
      message: Base64Util.uint8ArrayToBase64(message),
      encoding: 'base64'
    });
  }

  /**
   * Genrates direct commands that are sent to the EV3 as a single or compounded byte arrays.
   * See 'EV3 Communication Developer Kit', section 4, page 24 at
   * https://education.lego.com/en-us/support/mindstorms-ev3/developer-kits.
   *
   * Direct commands are one of two types:
   * DIRECT_COMMAND_NO_REPLY = a direct command where no reply is expected
   * DIRECT_COMMAND_REPLY = a direct command where a reply is expected, and the
   * number and length of returned values needs to be specified.
   *
   * The direct command byte array sent takes the following format:
   * Byte 0 - 1: Command size, Little Endian. Command size not including these 2 bytes
   * Byte 2 - 3: Message counter, Little Endian. Forth running counter
   * Byte 4:     Command type. Either DIRECT_COMMAND_REPLY or DIRECT_COMMAND_NO_REPLY
   * Byte 5 - 6: Reservation (allocation) of global and local variables using a compressed format
   *             (globals reserved in byte 5 and the 2 lsb of byte 6, locals reserved in the upper
   *             6 bits of byte 6) – see documentation for more details.
   * Byte 7 - n: Byte codes as a single command or compound commands (I.e. more commands composed
   *             as a small program)
   *
   * @param {number} type - the direct command type.
   * @param {string} byteCommands - a compound array of EV3 Opcode + arguments.
   * @param {number} allocation - the allocation of global and local vars needed for replies.
   * @return {array} - generated complete command byte array, with header and compounded commands.
   */
  generateCommand(type, byteCommands) {
    let allocation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    // Header (Bytes 0 - 6)
    let command = [];
    command[2] = 0; // Message counter unused for now
    command[3] = 0; // Message counter unused for now
    command[4] = type;
    command[5] = allocation & 0xFF;
    command[6] = allocation >> 8 && 0xFF;

    // Bytecodes (Bytes 7 - n)
    command = command.concat(byteCommands);

    // Calculate command length minus first two header bytes
    const len = command.length - 2;
    command[0] = len & 0xFF;
    command[1] = len >> 8 && 0xFF;
    return command;
  }

  /**
   * When the EV3 peripheral connects, start polling for sensor and motor values.
   * @private
   */
  _onConnect() {
    this._pollingIntervalID = window.setInterval(this._pollValues, this._pollingInterval);
  }

  /**
   * Poll the EV3 for sensor and motor input values, based on the list of
   * known connected sensors and motors. This is sent as many compound commands
   * in a direct command, with a reply expected.
   *
   * See 'EV3 Firmware Developer Kit', section 4.8, page 46, at
   * https://education.lego.com/en-us/support/mindstorms-ev3/developer-kits
   * for a list of polling/input device commands and their arguments.
   *
   * @private
   */
  _pollValues() {
    if (!this.isConnected()) {
      window.clearInterval(this._pollingIntervalID);
      return;
    }
    const cmds = []; // compound command
    let allocation = 0;
    let sensorCount = 0;

    // Reset the list of devices every 20 counts
    if (this._pollingCounter % 20 === 0) {
      // GET DEVICE LIST
      cmds[0] = Ev3Opcode.OPINPUT_DEVICE_LIST;
      cmds[1] = Ev3Encoding.ONE_BYTE;
      cmds[2] = Ev3Args.MAX_DEVICES;
      cmds[3] = Ev3Encoding.GLOBAL_VARIABLE_INDEX_0;
      cmds[4] = Ev3Encoding.GLOBAL_VARIABLE_ONE_BYTE;
      cmds[5] = Ev3Encoding.GLOBAL_CONSTANT_INDEX_0;

      // Command and payload lengths
      allocation = 33;
      this._updateDevices = true;
    } else {
      // GET SENSOR VALUES FOR CONNECTED SENSORS
      let index = 0;
      for (let i = 0; i < 4; i++) {
        if (this._sensorPorts[i] !== 'none') {
          cmds[index + 0] = Ev3Opcode.OPINPUT_READSI;
          cmds[index + 1] = Ev3Args.LAYER;
          cmds[index + 2] = i; // PORT
          cmds[index + 3] = Ev3Args.DO_NOT_CHANGE_TYPE;
          cmds[index + 4] = Ev3Mode[this._sensorPorts[i]];
          cmds[index + 5] = Ev3Encoding.GLOBAL_VARIABLE_ONE_BYTE;
          cmds[index + 6] = sensorCount * 4; // GLOBAL INDEX
          index += 7;
        }
        sensorCount++;
      }

      // GET MOTOR POSITION VALUES, EVEN IF NO MOTOR PRESENT
      for (let i = 0; i < 4; i++) {
        cmds[index + 0] = Ev3Opcode.OPOUTPUT_GET_COUNT;
        cmds[index + 1] = Ev3Args.LAYER;
        cmds[index + 2] = i; // PORT (incorrectly specified as 'Output bit field' in LEGO docs)
        cmds[index + 3] = Ev3Encoding.GLOBAL_VARIABLE_ONE_BYTE;
        cmds[index + 4] = sensorCount * 4; // GLOBAL INDEX
        index += 5;
        sensorCount++;
      }

      // Command and payload lengths
      allocation = sensorCount * 4;
    }
    const cmd = this.generateCommand(Ev3Command.DIRECT_COMMAND_REPLY, cmds, allocation);
    this.send(cmd);
    this._pollingCounter++;
  }

  /**
   * Message handler for incoming EV3 reply messages, either a list of connected
   * devices (sensors and motors) or the values of the connected sensors and motors.
   *
   * See 'EV3 Communication Developer Kit', section 4.1, page 24 at
   * https://education.lego.com/en-us/support/mindstorms-ev3/developer-kits
   * for more details on direct reply formats.
   *
   * The direct reply byte array sent takes the following format:
   * Byte 0 – 1: Reply size, Little Endian. Reply size not including these 2 bytes
   * Byte 2 – 3: Message counter, Little Endian. Equals the Direct Command
   * Byte 4:     Reply type. Either DIRECT_REPLY or DIRECT_REPLY_ERROR
   * Byte 5 - n: Resonse buffer. I.e. the content of the by the Command reserved global variables.
   *             I.e. if the command reserved 64 bytes, these bytes will be placed in the reply
   *             packet as the bytes 5 to 68.
   *
   * See 'EV3 Firmware Developer Kit', section 4.8, page 56 at
   * https://education.lego.com/en-us/support/mindstorms-ev3/developer-kits
   * for direct response buffer formats for various commands.
   *
   * @param {object} params - incoming message parameters
   * @private
   */
  _onMessage(params) {
    const message = params.message;
    const data = Base64Util.base64ToUint8Array(message);
    if (data[4] !== Ev3Command.DIRECT_REPLY) {
      return;
    }
    if (this._updateDevices) {
      // PARSE DEVICE LIST
      for (let i = 0; i < 4; i++) {
        const deviceType = Ev3Device[data[i + 5]];
        // if returned device type is null, use 'none'
        this._sensorPorts[i] = deviceType ? deviceType : 'none';
      }
      for (let i = 0; i < 4; i++) {
        const deviceType = Ev3Device[data[i + 21]];
        // if returned device type is null, use 'none'
        this._motorPorts[i] = deviceType ? deviceType : 'none';
      }
      for (let m = 0; m < 4; m++) {
        const type = this._motorPorts[m];
        if (type !== 'none' && !this._motors[m]) {
          // add new motor if don't already have one
          this._motors[m] = new EV3Motor(this, m, type);
        }
        if (type === 'none' && this._motors[m]) {
          // clear old motor
          this._motors[m] = null;
        }
      }
      this._updateDevices = false;

      // eslint-disable-next-line no-undefined
    } else if (!this._sensorPorts.includes(undefined) && !this._motorPorts.includes(undefined)) {
      // PARSE SENSOR VALUES
      let offset = 5; // start reading sensor values at byte 5
      for (let i = 0; i < 4; i++) {
        // array 2 float
        const buffer = new Uint8Array([data[offset], data[offset + 1], data[offset + 2], data[offset + 3]]).buffer;
        const view = new DataView(buffer);
        const value = view.getFloat32(0, true);
        if (Ev3Label[this._sensorPorts[i]] === 'button') {
          // Read a button value per port
          this._sensors.buttons[i] = value ? value : 0;
        } else if (Ev3Label[this._sensorPorts[i]]) {
          // if valid
          // Read brightness / distance values and set to 0 if null
          this._sensors[Ev3Label[this._sensorPorts[i]]] = value ? value : 0;
        }
        offset += 4;
      }

      // PARSE MOTOR POSITION VALUES, EVEN IF NO MOTOR PRESENT
      for (let i = 0; i < 4; i++) {
        const positionArray = [data[offset], data[offset + 1], data[offset + 2], data[offset + 3]];
        if (this._motors[i]) {
          this._motors[i].position = positionArray;
        }
        offset += 4;
      }
    }
  }
}

/**
 * Enum for motor port names.
 * Note: if changed, will break compatibility with previously saved projects.
 * @readonly
 * @enum {string}
 */
const Ev3MotorMenu = ['A', 'B', 'C', 'D'];

/**
 * Enum for sensor port names.
 * Note: if changed, will break compatibility with previously saved projects.
 * @readonly
 * @enum {string}
 */
const Ev3SensorMenu = ['1', '2', '3', '4'];
class Scratch3Ev3Blocks {
  /**
   * The ID of the extension.
   * @return {string} the id
   */
  static get EXTENSION_ID() {
    return 'ev3';
  }

  /**
   * Creates a new instance of the EV3 extension.
   * @param  {object} runtime VM runtime
   * @constructor
   */
  constructor(runtime) {
    /**
     * The Scratch 3.0 runtime.
     * @type {Runtime}
     */
    this.runtime = runtime;

    // Create a new EV3 peripheral instance
    this._peripheral = new EV3(this.runtime, Scratch3Ev3Blocks.EXTENSION_ID);
    this._playNoteForPicker = this._playNoteForPicker.bind(this);
    this.runtime.on('PLAY_NOTE', this._playNoteForPicker);
  }

  /**
   * Define the EV3 extension.
   * @return {object} Extension description.
   */
  getInfo() {
    return {
      id: Scratch3Ev3Blocks.EXTENSION_ID,
      name: 'LEGO EV3',
      blockIconURI: blockIconURI,
      showStatusButton: true,
      blocks: [{
        opcode: 'motorTurnClockwise',
        text: formatMessage({
          id: 'ev3.motorTurnClockwise',
          default: 'motor [PORT] turn this way for [TIME] seconds',
          description: 'turn a motor clockwise for some time'
        }),
        blockType: BlockType.COMMAND,
        arguments: {
          PORT: {
            type: ArgumentType.STRING,
            menu: 'motorPorts',
            defaultValue: 0
          },
          TIME: {
            type: ArgumentType.NUMBER,
            defaultValue: 1
          }
        }
      }, {
        opcode: 'motorTurnCounterClockwise',
        text: formatMessage({
          id: 'ev3.motorTurnCounterClockwise',
          default: 'motor [PORT] turn that way for [TIME] seconds',
          description: 'turn a motor counter-clockwise for some time'
        }),
        blockType: BlockType.COMMAND,
        arguments: {
          PORT: {
            type: ArgumentType.STRING,
            menu: 'motorPorts',
            defaultValue: 0
          },
          TIME: {
            type: ArgumentType.NUMBER,
            defaultValue: 1
          }
        }
      }, {
        opcode: 'motorSetPower',
        text: formatMessage({
          id: 'ev3.motorSetPower',
          default: 'motor [PORT] set power [POWER] %',
          description: 'set a motor\'s power to some value'
        }),
        blockType: BlockType.COMMAND,
        arguments: {
          PORT: {
            type: ArgumentType.STRING,
            menu: 'motorPorts',
            defaultValue: 0
          },
          POWER: {
            type: ArgumentType.NUMBER,
            defaultValue: 100
          }
        }
      }, {
        opcode: 'getMotorPosition',
        text: formatMessage({
          id: 'ev3.getMotorPosition',
          default: 'motor [PORT] position',
          description: 'get the measured degrees a motor has turned'
        }),
        blockType: BlockType.REPORTER,
        arguments: {
          PORT: {
            type: ArgumentType.STRING,
            menu: 'motorPorts',
            defaultValue: 0
          }
        }
      }, {
        opcode: 'whenButtonPressed',
        text: formatMessage({
          id: 'ev3.whenButtonPressed',
          default: 'when button [PORT] pressed',
          description: 'when a button connected to a port is pressed'
        }),
        blockType: BlockType.HAT,
        arguments: {
          PORT: {
            type: ArgumentType.STRING,
            menu: 'sensorPorts',
            defaultValue: 0
          }
        }
      }, {
        opcode: 'whenDistanceLessThan',
        text: formatMessage({
          id: 'ev3.whenDistanceLessThan',
          default: 'when distance < [DISTANCE]',
          description: 'when the value measured by the distance sensor is less than some value'
        }),
        blockType: BlockType.HAT,
        arguments: {
          DISTANCE: {
            type: ArgumentType.NUMBER,
            defaultValue: 5
          }
        }
      }, {
        opcode: 'whenBrightnessLessThan',
        text: formatMessage({
          id: 'ev3.whenBrightnessLessThan',
          default: 'when brightness < [DISTANCE]',
          description: 'when value measured by brightness sensor is less than some value'
        }),
        blockType: BlockType.HAT,
        arguments: {
          DISTANCE: {
            type: ArgumentType.NUMBER,
            defaultValue: 50
          }
        }
      }, {
        opcode: 'buttonPressed',
        text: formatMessage({
          id: 'ev3.buttonPressed',
          default: 'button [PORT] pressed?',
          description: 'is a button on some port pressed?'
        }),
        blockType: BlockType.BOOLEAN,
        arguments: {
          PORT: {
            type: ArgumentType.STRING,
            menu: 'sensorPorts',
            defaultValue: 0
          }
        }
      }, {
        opcode: 'getDistance',
        text: formatMessage({
          id: 'ev3.getDistance',
          default: 'distance',
          description: 'gets measured distance'
        }),
        blockType: BlockType.REPORTER
      }, {
        opcode: 'getBrightness',
        text: formatMessage({
          id: 'ev3.getBrightness',
          default: 'brightness',
          description: 'gets measured brightness'
        }),
        blockType: BlockType.REPORTER
      }, {
        opcode: 'beep',
        text: formatMessage({
          id: 'ev3.beepNote',
          default: 'beep note [NOTE] for [TIME] secs',
          description: 'play some note on EV3 for some time'
        }),
        blockType: BlockType.COMMAND,
        arguments: {
          NOTE: {
            type: ArgumentType.NOTE,
            defaultValue: 60
          },
          TIME: {
            type: ArgumentType.NUMBER,
            defaultValue: 0.5
          }
        }
      }],
      menus: {
        motorPorts: {
          acceptReporters: true,
          items: this._formatMenu(Ev3MotorMenu)
        },
        sensorPorts: {
          acceptReporters: true,
          items: this._formatMenu(Ev3SensorMenu)
        }
      }
    };
  }
  motorTurnClockwise(args) {
    const port = Cast.toNumber(args.PORT);
    let time = Cast.toNumber(args.TIME) * 1000;
    time = MathUtil.clamp(time, 0, 15000);
    return new Promise(resolve => {
      this._forEachMotor(port, motorIndex => {
        const motor = this._peripheral.motor(motorIndex);
        if (motor) {
          motor.direction = 1;
          motor.turnOnFor(time);
        }
      });

      // Run for some time even when no motor is connected
      setTimeout(resolve, time);
    });
  }
  motorTurnCounterClockwise(args) {
    const port = Cast.toNumber(args.PORT);
    let time = Cast.toNumber(args.TIME) * 1000;
    time = MathUtil.clamp(time, 0, 15000);
    return new Promise(resolve => {
      this._forEachMotor(port, motorIndex => {
        const motor = this._peripheral.motor(motorIndex);
        if (motor) {
          motor.direction = -1;
          motor.turnOnFor(time);
        }
      });

      // Run for some time even when no motor is connected
      setTimeout(resolve, time);
    });
  }
  motorSetPower(args) {
    const port = Cast.toNumber(args.PORT);
    const power = MathUtil.clamp(Cast.toNumber(args.POWER), 0, 100);
    this._forEachMotor(port, motorIndex => {
      const motor = this._peripheral.motor(motorIndex);
      if (motor) {
        motor.power = power;
      }
    });
  }
  getMotorPosition(args) {
    const port = Cast.toNumber(args.PORT);
    if (![0, 1, 2, 3].includes(port)) {
      return;
    }
    const motor = this._peripheral.motor(port);
    let position = 0;
    if (motor) {
      position = MathUtil.wrapClamp(motor.position, 0, 360);
    }
    return position;
  }
  whenButtonPressed(args) {
    const port = Cast.toNumber(args.PORT);
    if (![0, 1, 2, 3].includes(port)) {
      return;
    }
    return this._peripheral.isButtonPressed(port);
  }
  whenDistanceLessThan(args) {
    const distance = MathUtil.clamp(Cast.toNumber(args.DISTANCE), 0, 100);
    return this._peripheral.distance < distance;
  }
  whenBrightnessLessThan(args) {
    const brightness = MathUtil.clamp(Cast.toNumber(args.DISTANCE), 0, 100);
    return this._peripheral.brightness < brightness;
  }
  buttonPressed(args) {
    const port = Cast.toNumber(args.PORT);
    if (![0, 1, 2, 3].includes(port)) {
      return;
    }
    return this._peripheral.isButtonPressed(port);
  }
  getDistance() {
    return this._peripheral.distance;
  }
  getBrightness() {
    return this._peripheral.brightness;
  }
  _playNoteForPicker(note, category) {
    if (category !== this.getInfo().name) return;
    this.beep({
      NOTE: note,
      TIME: 0.25
    });
  }
  beep(args) {
    const note = MathUtil.clamp(Cast.toNumber(args.NOTE), 47, 99); // valid EV3 sounds
    let time = Cast.toNumber(args.TIME) * 1000;
    time = MathUtil.clamp(time, 0, 3000);
    if (time === 0) {
      return; // don't send a beep time of 0
    }
    return new Promise(resolve => {
      // https://en.wikipedia.org/wiki/MIDI_tuning_standard#Frequency_values
      const freq = Math.pow(2, (note - 69 + 12) / 12) * 440;
      this._peripheral.beep(freq, time);

      // Run for some time even when no piezo is connected.
      setTimeout(resolve, time);
    });
  }

  /**
   * Call a callback for each motor indexed by the provided motor ID.
   *
   * Note: This way of looping through motors is currently unnecessary, but could be
   * useful if an 'all motors' option is added in the future (see WeDo2 extension).
   *
   * @param {MotorID} motorID - the ID specifier.
   * @param {Function} callback - the function to call with the numeric motor index for each motor.
   * @private
   */
  _forEachMotor(motorID, callback) {
    let motors;
    switch (motorID) {
      case 0:
        motors = [0];
        break;
      case 1:
        motors = [1];
        break;
      case 2:
        motors = [2];
        break;
      case 3:
        motors = [3];
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
   * Formats menus into a format suitable for block menus, and loading previously
   * saved projects:
   * [
   *   {
   *    text: label,
   *    value: index
   *   },
   *   {
   *    text: label,
   *    value: index
   *   },
   *   etc...
   * ]
   *
   * @param {array} menu - a menu to format.
   * @return {object} - a formatted menu as an object.
   * @private
   */
  _formatMenu(menu) {
    const m = [];
    for (let i = 0; i < menu.length; i++) {
      const obj = {};
      obj.text = menu[i];
      obj.value = i.toString();
      m.push(obj);
    }
    return m;
  }
}
module.exports = Scratch3Ev3Blocks;

/***/ }),

/***/ "./node_modules/scratch-vm/src/io/bt.js":
/*!**********************************************!*\
  !*** ./node_modules/scratch-vm/src/io/bt.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const JSONRPC = __webpack_require__(/*! ../util/jsonrpc */ "./node_modules/scratch-vm/src/util/jsonrpc.js");
class BT extends JSONRPC {
  /**
   * A BT peripheral socket object.  It handles connecting, over web sockets, to
   * BT peripherals, and reading and writing data to them.
   * @param {Runtime} runtime - the Runtime for sending/receiving GUI update events.
   * @param {string} extensionId - the id of the extension using this socket.
   * @param {object} peripheralOptions - the list of options for peripheral discovery.
   * @param {object} connectCallback - a callback for connection.
   * @param {object} resetCallback - a callback for resetting extension state.
   * @param {object} messageCallback - a callback for message sending.
   */
  constructor(runtime, extensionId, peripheralOptions, connectCallback) {
    let resetCallback = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    let messageCallback = arguments.length > 5 ? arguments[5] : undefined;
    super();
    this._socket = runtime.getScratchLinkSocket('BT');
    this._socket.setOnOpen(this.requestPeripheral.bind(this));
    this._socket.setOnError(this._handleRequestError.bind(this));
    this._socket.setOnClose(this.handleDisconnectError.bind(this));
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
    this._messageCallback = messageCallback;
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
    this.sendRemoteRequest('discover', this._peripheralOptions).catch(e => this._handleRequestError(e));
  }

  /**
   * Try connecting to the input peripheral id, and then call the connect
   * callback if connection is successful.
   * @param {number} id - the id of the peripheral to connect to
   * @param {string} pin - an optional pin for pairing
   */
  connectPeripheral(id) {
    let pin = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    const params = {
      peripheralId: id
    };
    if (pin) {
      params.pin = pin;
    }
    this.sendRemoteRequest('connect', params).then(() => {
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
  sendMessage(options) {
    return this.sendRemoteRequest('send', options).catch(e => {
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
    // TODO: Add peripheral 'undiscover' handling
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
      case 'didReceiveMessage':
        this._messageCallback(params); // TODO: refine?
        break;
      default:
        return 'nah';
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
    // log.error(`BT error: ${JSON.stringify(e)}`);

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
    // log.error(`BT error: ${JSON.stringify(e)}`);

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
module.exports = BT;

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
//# sourceMappingURL=5.js.map