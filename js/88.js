(window["webpackJsonpGUI"] = window["webpackJsonpGUI"] || []).push([[88],{

/***/ "./node_modules/scratch-vm/src/extensions/gm2_gamepad/index.js":
/*!*********************************************************************!*\
  !*** ./node_modules/scratch-vm/src/extensions/gm2_gamepad/index.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
Gamepad Extension By: Gvbvdxx
(C) Gvbvdxx 2022
*/

const ArgumentType = __webpack_require__(/*! ../../extension-support/argument-type */ "./node_modules/scratch-vm/src/extension-support/argument-type.js");
const BlockType = __webpack_require__(/*! ../../extension-support/block-type */ "./node_modules/scratch-vm/src/extension-support/block-type.js");
const Cast = __webpack_require__(/*! ../../util/cast */ "./node_modules/scratch-vm/src/util/cast.js");
const Runtime = __webpack_require__(/*! ../../../src/engine/runtime */ "./node_modules/scratch-vm/src/engine/runtime.js");
const Sprite = __webpack_require__(/*! ../../../src/sprites/sprite.js */ "./node_modules/scratch-vm/src/sprites/sprite.js");
var ConnectedGamepads = [];
var MAX_GAMEPADS = 4;
var i = 0;
while (i < MAX_GAMEPADS) {
  ConnectedGamepads.push(null);
  i += 1;
}
window.addEventListener("gamepadconnected", function (event) {
  var gamepad = event.gamepad;
  var i = 0;
  var foundIndex = -1;
  for (var g of ConnectedGamepads) {
    if (foundIndex == -1 && !g) {
      foundIndex = i;
    }
    i += 1;
  }
  if (foundIndex == -1) {
    return;
  }
  ConnectedGamepads[foundIndex] = gamepad;
});
window.addEventListener("gamepaddisconnected", function (event) {
  var gamepad = event.gamepad;
  var i = 0;
  for (var g of ConnectedGamepads) {
    if (g == gamepad) {
      ConnectedGamepads[i] = null;
      return;
    }
    i += 1;
  }
  return;
});
class GamepadExtension {
  constructor(runtime) {
    this.runtime = runtime;
    this._connected = ConnectedGamepads.length;
    this.hatStates = {
      connect: false,
      disconnect: false
    };
    this.runtime.on("BEFORE_EXECUTE", this._checkHatStates);
    this.runtime.on("AFTER_EXECUTE", this._resetHatStates);
  }
  _checkHatStates() {
    var states = this.hatStates;
    var connectedCount = ConnectedGamepads.length;
    if (this._connected !== connectedCount) {
      var last = this._connected;
      this._connected = connectedCount;
      if (last < connectedCount) {
        states.connect = true;
      } else if (last > connectedCount) {
        states.disconnect = false;
      }
    }
  }
  _resetHatStates() {
    var states = this.hatStates;
    states.connect = false;
    states.disconnect = false;
  }
  _getGamepadFromNum(NUM) {
    var gamepadIndex = (+NUM || 0) - 1;
    if (gamepadIndex < 0) {
      gamepadIndex = 0;
    }
    if (gamepadIndex > MAX_GAMEPADS) {
      return null;
    }
    if (!ConnectedGamepads.length < 1) {
      return null;
    }
    var gamepad = ConnectedGamepads[gamepadIndex];
    return gamepad || null;
  }
  _supportsVibration(gamepad) {
    if (!gamepad) {
      return false;
    }
    if (gamepad.vibrationActuator) {
      if (gamepad.vibrationActuator.playEffect) {
        return true;
      }
    }
    return false;
  }
  getInfo() {
    return {
      id: 'gamepad',
      name: 'Gamepads',
      blockIconURI: null,
      color1: "#00c83f",
      color2: "#00a90e",
      color3: "#003a0b",
      blocks: [{
        opcode: 'getgamepadX',
        name: 'Gamepad LS X',
        blockType: BlockType.REPORTER,
        text: 'Gamepad [player] left stick x axis',
        arguments: {
          player: {
            acceptReporters: false,
            menu: 'gamepadnum'
          }
        }
      }, {
        opcode: 'getgamepadY',
        name: 'Gamepad LS Y',
        blockType: BlockType.REPORTER,
        text: 'Gamepad [player] left stick y axis',
        arguments: {
          player: {
            acceptReporters: false,
            menu: 'gamepadnum'
          }
        }
      }, {
        opcode: 'getgamepad2ndX',
        name: 'Gamepad RS X',
        blockType: BlockType.REPORTER,
        text: 'Gamepad [player] right stick x axis',
        arguments: {
          player: {
            acceptReporters: false,
            menu: 'gamepadnum'
          }
        }
      }, {
        opcode: 'getgamepad2ndY',
        name: 'Gamepad RS Y',
        blockType: BlockType.REPORTER,
        text: 'Gamepad [player] right stick y axis',
        arguments: {
          player: {
            acceptReporters: false,
            menu: 'gamepadnum'
          }
        }
      }, {
        opcode: 'getgamepadButton',
        name: 'Gamepad Button',
        blockType: BlockType.BOOLEAN,
        text: 'Gamepad [player] button [btn] pressed?',
        arguments: {
          player: {
            acceptReporters: false,
            menu: 'gamepadnum'
          },
          btn: {
            acceptReporters: false,
            menu: 'gamepadbtn'
          }
        }
      }, {
        opcode: 'getgamepadConnected',
        name: 'Gamepad connected?',
        blockType: BlockType.BOOLEAN,
        text: 'Gamepad [player] connected?',
        arguments: {
          player: {
            acceptReporters: false,
            menu: 'gamepadnum'
          }
        }
      }, {
        opcode: 'vibratecontroler',
        name: 'Vibrate Gamepad for seconds',
        blockType: BlockType.COMMAND,
        text: 'Vibrate gamepad [player] for [seconds] seconds',
        arguments: {
          player: {
            acceptReporters: false,
            menu: 'gamepadnum'
          },
          seconds: {
            type: ArgumentType.NUMBER,
            defaultValue: 0.2
          }
        }
      }, {
        opcode: 'vibratecontrolerpower',
        name: 'Vibrate Gamepad for seconds (power values)',
        blockType: BlockType.COMMAND,
        text: 'Vibrate gamepad [player] for [seconds] at left strength:[power]% right strength:[weakness]%',
        arguments: {
          player: {
            acceptReporters: false,
            menu: 'gamepadnum'
          },
          seconds: {
            type: ArgumentType.NUMBER,
            defaultValue: 0.2
          },
          power: {
            type: ArgumentType.NUMBER,
            defaultValue: 100
          },
          weakness: {
            type: ArgumentType.NUMBER,
            defaultValue: 100
          }
        }
      }, {
        opcode: 'getlastest',
        name: 'Get first gamepad connected',
        blockType: BlockType.REPORTER,
        text: 'Get first gamepad connected',
        arguments: {}
      }, {
        opcode: 'gm2WhenGamepadConnected',
        name: 'When a gamepad connects',
        blockType: BlockType.HAT,
        text: 'When a gamepad connects',
        arguments: {}
      }, {
        opcode: 'gm2WhenGamepadDisconnected',
        name: 'When a gamepad disconnects',
        blockType: BlockType.HAT,
        text: 'When a gamepad disconnects',
        arguments: {}
      }],
      menus: {
        gamepadnum: {
          acceptReporters: true,
          items: [{
            text: "Player 1",
            value: "1"
          }, {
            text: "Player 2",
            value: "2"
          }, {
            text: "Player 3",
            value: "3"
          }, {
            text: "Player 4",
            value: "4"
          }]
        },
        gamepadbtn: {
          acceptReporters: true,
          items: [{
            text: "Button B (Nintendo Map)",
            value: "1"
          }, {
            text: "Button A (Nintendo Map)",
            value: "2"
          }, {
            text: "Button Y (Nintendo Map)",
            value: "3"
          }, {
            text: "Button X (Nintendo Map)",
            value: "4"
          }, {
            text: "Trigger R (Nintendo Map)",
            value: "6"
          }, {
            text: "Trigger ZR (Nintendo Map)",
            value: "8"
          }, {
            text: "Trigger ZL (Nintendo Map)",
            value: "7"
          }, {
            text: "Trigger L (Nintendo Map)",
            value: "5"
          }, {
            text: "Button Start/+ (Nintendo Map)",
            value: "10"
          }, {
            text: "Button Select/- (Nintendo Map)",
            value: "9"
          }]
        }
      }
    };
  }
  getgamepadX(args) {
    var num = 0;
    try {
      num = navigator.getGamepads()[Number(args.player) - 1].axes[0] * 10;
    } catch (e) {}
    return num;
  }
  getgamepadY(args) {
    var num = 0;
    try {
      num = navigator.getGamepads()[Number(args.player) - 1].axes[1] * -10;
    } catch (e) {}
    return num;
  }
  getgamepad2ndX(args) {
    var num = 0;
    try {
      num = navigator.getGamepads()[Number(args.player) - 1].axes[2] * 10;
    } catch (e) {}
    return num;
  }
  getgamepad2ndY(args) {
    var num = 0;
    try {
      num = navigator.getGamepads()[Number(args.player) - 1].axes[3] * -10;
    } catch (e) {}
    return num;
  }
  getgamepadButton(args) {
    var num = false;
    try {
      num = navigator.getGamepads()[Number(args.player) - 1].buttons[Number(args.btn) - 1].pressed;
    } catch (e) {}
    return num;
  }
  getgamepadConnected(args) {
    var num = false;
    try {
      num = navigator.getGamepads()[Number(args.player) - 1].connected;
    } catch (e) {}
    return num;
  }
  vibratecontroler(args) {
    var gamepad = this._getGamepadFromNum(args.player);
    var duration = +args.seconds || 0;
    if (duration < 0) {
      duration = 0;
    }
    if (!gamepad) {
      return;
    }
    if (!this._supportsVibration(gamepad)) {
      return;
    }
    if (duration <= 0) {
      try {
        gamepad.vibrationActuator.reset();
      } catch (e) {
        console.error("Unable to reset vibration effect for gamepad: ", gamepad, " Error:", e);
      }
      return;
    }
    try {
      gamepad.vibrationActuator.playEffect("dual-rumble", {
        startDelay: 0,
        duration: 1000 * duration,
        weakMagnitude: 0.8,
        strongMagnitude: 0.8
      });
    } catch (e) {
      console.error("Unable to play vibration effect for gamepad: ", gamepad, " Error:", e);
    }
  }
  vibratecontrolerpower(args) {
    var gamepad = this._getGamepadFromNum(args.player);
    if (!gamepad) {
      return;
    }
    var duration = +args.seconds || 0;
    if (duration < 0) {
      duration = 0;
    }
    var power = +args.power || 0;
    if (power < 0) {
      power = 0;
    } else if (power > 100) {
      power = 100;
    }
    var weak = +args.weakness || 0;
    if (weak < 0) {
      weak = 0;
    } else if (weak > 100) {
      weak = 100;
    }
    if (!this._supportsVibration(gamepad)) {
      return;
    }
    try {
      gamepad.vibrationActuator.playEffect("dual-rumble", {
        startDelay: 0,
        duration: 1000 * duration,
        weakMagnitude: weak / 100,
        strongMagnitude: power / 100
      });
    } catch (e) {
      console.error("Unable to play vibration effect for gamepad: ", gamepad, " Error:", e);
    }
  }
  getlastest() {
    var i = 0;
    for (var gamepad of ConnectedGamepads) {
      if (gamepad) {
        return i + 1;
      }
      i += 1;
    }
    return 0;
  }
  gm2GetConnectedGamepads() {
    return ConnectedGamepads.length;
  }
  gm2WhenGamepadConnected() {
    return !!this.hatStates.connect;
  }
  gm2WhenGamepadDisconnected() {
    return !!this.hatStates.disconnect;
  }
}
module.exports = GamepadExtension;

/***/ })

}]);
//# sourceMappingURL=88.js.map