(window["webpackJsonpGUI"] = window["webpackJsonpGUI"] || []).push([[3],{

/***/ "./node_modules/@vernier/godirect/dist/godirect.min.umd.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@vernier/godirect/dist/godirect.min.umd.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2019 Vernier Software. All rights reserved.
 * This code may only be used under the BSD 3-Clause license found at
 * https://raw.githubusercontent.com/VernierST/godirect-js/master/LICENSE
 */

!function (e, t) {
   true ? module.exports = t() : undefined;
}(this, function () {
  "use strict";

  function e(e, t, n, r, i, a, o) {
    try {
      var s = e[a](o),
        u = s.value;
    } catch (e) {
      return void n(e);
    }
    s.done ? t(u) : Promise.resolve(u).then(r, i);
  }
  function t(t) {
    return function () {
      var n = this,
        r = arguments;
      return new Promise(function (i, a) {
        var o = t.apply(n, r);
        function s(t) {
          e(o, i, a, s, u, "next", t);
        }
        function u(t) {
          e(o, i, a, s, u, "throw", t);
        }
        s(void 0);
      });
    };
  }
  function n(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
  }
  function r(e, t) {
    for (var n = 0; n < t.length; n++) {
      var r = t[n];
      r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
    }
  }
  function i(e, t, n) {
    return t && r(e.prototype, t), n && r(e, n), e;
  }
  function a(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
    e.prototype = Object.create(t && t.prototype, {
      constructor: {
        value: e,
        writable: !0,
        configurable: !0
      }
    }), t && s(e, t);
  }
  function o(e) {
    return (o = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
      return e.__proto__ || Object.getPrototypeOf(e);
    })(e);
  }
  function s(e, t) {
    return (s = Object.setPrototypeOf || function (e, t) {
      return e.__proto__ = t, e;
    })(e, t);
  }
  function u(e, t) {
    return !t || "object" != typeof t && "function" != typeof t ? function (e) {
      if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return e;
    }(e) : t;
  }
  !function (e) {
    var t,
      n = Object.prototype,
      r = n.hasOwnProperty,
      i = "function" == typeof Symbol ? Symbol : {},
      a = i.iterator || "@@iterator",
      o = i.asyncIterator || "@@asyncIterator",
      s = i.toStringTag || "@@toStringTag",
      u = "object" == typeof module,
      c = e.regeneratorRuntime;
    if (c) u && (module.exports = c);else {
      (c = e.regeneratorRuntime = u ? module.exports : {}).wrap = b;
      var f = "suspendedStart",
        h = "suspendedYield",
        l = "executing",
        p = "completed",
        d = {},
        m = {};
      m[a] = function () {
        return this;
      };
      var v = Object.getPrototypeOf,
        g = v && v(v(C([])));
      g && g !== n && r.call(g, a) && (m = g);
      var y = x.prototype = _.prototype = Object.create(m);
      k.prototype = y.constructor = x, x.constructor = k, x[s] = k.displayName = "GeneratorFunction", c.isGeneratorFunction = function (e) {
        var t = "function" == typeof e && e.constructor;
        return !!t && (t === k || "GeneratorFunction" === (t.displayName || t.name));
      }, c.mark = function (e) {
        return Object.setPrototypeOf ? Object.setPrototypeOf(e, x) : (e.__proto__ = x, s in e || (e[s] = "GeneratorFunction")), e.prototype = Object.create(y), e;
      }, c.awrap = function (e) {
        return {
          __await: e
        };
      }, E(S.prototype), S.prototype[o] = function () {
        return this;
      }, c.AsyncIterator = S, c.async = function (e, t, n, r) {
        var i = new S(b(e, t, n, r));
        return c.isGeneratorFunction(t) ? i : i.next().then(function (e) {
          return e.done ? e.value : i.next();
        });
      }, E(y), y[s] = "Generator", y[a] = function () {
        return this;
      }, y.toString = function () {
        return "[object Generator]";
      }, c.keys = function (e) {
        var t = [];
        for (var n in e) t.push(n);
        return t.reverse(), function n() {
          for (; t.length;) {
            var r = t.pop();
            if (r in e) return n.value = r, n.done = !1, n;
          }
          return n.done = !0, n;
        };
      }, c.values = C, A.prototype = {
        constructor: A,
        reset: function reset(e) {
          if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(M), !e) for (var n in this) "t" === n.charAt(0) && r.call(this, n) && !isNaN(+n.slice(1)) && (this[n] = t);
        },
        stop: function stop() {
          this.done = !0;
          var e = this.tryEntries[0].completion;
          if ("throw" === e.type) throw e.arg;
          return this.rval;
        },
        dispatchException: function dispatchException(e) {
          if (this.done) throw e;
          var n = this;
          function i(r, i) {
            return s.type = "throw", s.arg = e, n.next = r, i && (n.method = "next", n.arg = t), !!i;
          }
          for (var a = this.tryEntries.length - 1; a >= 0; --a) {
            var o = this.tryEntries[a],
              s = o.completion;
            if ("root" === o.tryLoc) return i("end");
            if (o.tryLoc <= this.prev) {
              var u = r.call(o, "catchLoc"),
                c = r.call(o, "finallyLoc");
              if (u && c) {
                if (this.prev < o.catchLoc) return i(o.catchLoc, !0);
                if (this.prev < o.finallyLoc) return i(o.finallyLoc);
              } else if (u) {
                if (this.prev < o.catchLoc) return i(o.catchLoc, !0);
              } else {
                if (!c) throw new Error("try statement without catch or finally");
                if (this.prev < o.finallyLoc) return i(o.finallyLoc);
              }
            }
          }
        },
        abrupt: function abrupt(e, t) {
          for (var n = this.tryEntries.length - 1; n >= 0; --n) {
            var i = this.tryEntries[n];
            if (i.tryLoc <= this.prev && r.call(i, "finallyLoc") && this.prev < i.finallyLoc) {
              var a = i;
              break;
            }
          }
          a && ("break" === e || "continue" === e) && a.tryLoc <= t && t <= a.finallyLoc && (a = null);
          var o = a ? a.completion : {};
          return o.type = e, o.arg = t, a ? (this.method = "next", this.next = a.finallyLoc, d) : this.complete(o);
        },
        complete: function complete(e, t) {
          if ("throw" === e.type) throw e.arg;
          return "break" === e.type || "continue" === e.type ? this.next = e.arg : "return" === e.type ? (this.rval = this.arg = e.arg, this.method = "return", this.next = "end") : "normal" === e.type && t && (this.next = t), d;
        },
        finish: function finish(e) {
          for (var t = this.tryEntries.length - 1; t >= 0; --t) {
            var n = this.tryEntries[t];
            if (n.finallyLoc === e) return this.complete(n.completion, n.afterLoc), M(n), d;
          }
        },
        catch: function _catch(e) {
          for (var t = this.tryEntries.length - 1; t >= 0; --t) {
            var n = this.tryEntries[t];
            if (n.tryLoc === e) {
              var r = n.completion;
              if ("throw" === r.type) {
                var i = r.arg;
                M(n);
              }
              return i;
            }
          }
          throw new Error("illegal catch attempt");
        },
        delegateYield: function delegateYield(e, n, r) {
          return this.delegate = {
            iterator: C(e),
            resultName: n,
            nextLoc: r
          }, "next" === this.method && (this.arg = t), d;
        }
      };
    }
    function b(e, t, n, r) {
      var i = t && t.prototype instanceof _ ? t : _,
        a = Object.create(i.prototype),
        o = new A(r || []);
      return a._invoke = function (e, t, n) {
        var r = f;
        return function (i, a) {
          if (r === l) throw new Error("Generator is already running");
          if (r === p) {
            if ("throw" === i) throw a;
            return L();
          }
          for (n.method = i, n.arg = a;;) {
            var o = n.delegate;
            if (o) {
              var s = R(o, n);
              if (s) {
                if (s === d) continue;
                return s;
              }
            }
            if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
              if (r === f) throw r = p, n.arg;
              n.dispatchException(n.arg);
            } else "return" === n.method && n.abrupt("return", n.arg);
            r = l;
            var u = w(e, t, n);
            if ("normal" === u.type) {
              if (r = n.done ? p : h, u.arg === d) continue;
              return {
                value: u.arg,
                done: n.done
              };
            }
            "throw" === u.type && (r = p, n.method = "throw", n.arg = u.arg);
          }
        };
      }(e, n, o), a;
    }
    function w(e, t, n) {
      try {
        return {
          type: "normal",
          arg: e.call(t, n)
        };
      } catch (e) {
        return {
          type: "throw",
          arg: e
        };
      }
    }
    function _() {}
    function k() {}
    function x() {}
    function E(e) {
      ["next", "throw", "return"].forEach(function (t) {
        e[t] = function (e) {
          return this._invoke(t, e);
        };
      });
    }
    function S(e) {
      var t;
      this._invoke = function (n, i) {
        function a() {
          return new Promise(function (t, a) {
            !function t(n, i, a, o) {
              var s = w(e[n], e, i);
              if ("throw" !== s.type) {
                var u = s.arg,
                  c = u.value;
                return c && "object" == typeof c && r.call(c, "__await") ? Promise.resolve(c.__await).then(function (e) {
                  t("next", e, a, o);
                }, function (e) {
                  t("throw", e, a, o);
                }) : Promise.resolve(c).then(function (e) {
                  u.value = e, a(u);
                }, function (e) {
                  return t("throw", e, a, o);
                });
              }
              o(s.arg);
            }(n, i, t, a);
          });
        }
        return t = t ? t.then(a, a) : a();
      };
    }
    function R(e, n) {
      var r = e.iterator[n.method];
      if (r === t) {
        if (n.delegate = null, "throw" === n.method) {
          if (e.iterator.return && (n.method = "return", n.arg = t, R(e, n), "throw" === n.method)) return d;
          n.method = "throw", n.arg = new TypeError("The iterator does not provide a 'throw' method");
        }
        return d;
      }
      var i = w(r, e.iterator, n.arg);
      if ("throw" === i.type) return n.method = "throw", n.arg = i.arg, n.delegate = null, d;
      var a = i.arg;
      return a ? a.done ? (n[e.resultName] = a.value, n.next = e.nextLoc, "return" !== n.method && (n.method = "next", n.arg = t), n.delegate = null, d) : a : (n.method = "throw", n.arg = new TypeError("iterator result is not an object"), n.delegate = null, d);
    }
    function U(e) {
      var t = {
        tryLoc: e[0]
      };
      1 in e && (t.catchLoc = e[1]), 2 in e && (t.finallyLoc = e[2], t.afterLoc = e[3]), this.tryEntries.push(t);
    }
    function M(e) {
      var t = e.completion || {};
      t.type = "normal", delete t.arg, e.completion = t;
    }
    function A(e) {
      this.tryEntries = [{
        tryLoc: "root"
      }], e.forEach(U, this), this.reset(!0);
    }
    function C(e) {
      if (e) {
        var n = e[a];
        if (n) return n.call(e);
        if ("function" == typeof e.next) return e;
        if (!isNaN(e.length)) {
          var i = -1,
            o = function n() {
              for (; ++i < e.length;) if (r.call(e, i)) return n.value = e[i], n.done = !1, n;
              return n.value = t, n.done = !0, n;
            };
          return o.next = o;
        }
      }
      return {
        next: L
      };
    }
    function L() {
      return {
        value: t,
        done: !0
      };
    }
  }(function () {
    return this || "object" == typeof self && self;
  }() || Function("return this")());
  var c = new Uint8Array([88, 0, 0, 0]),
    f = new Uint8Array([26, 165, 74, 6, 73, 7, 72, 8, 71, 9, 70, 10, 69, 11, 68, 12, 67, 13, 66, 14, 65]),
    h = new Uint8Array([24, 255, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
    l = new Uint8Array([25, 255, 0, 255, 255, 255, 255]),
    p = new Uint8Array([27, 255, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
    d = {
      HEADER: c,
      INIT: f,
      DISCONNECT: new Uint8Array([84]),
      START_MEASUREMENTS: h,
      STOP_MEASUREMENTS: l,
      SET_MEASUREMENT_PERIOD: p,
      GET_INFO: new Uint8Array([85]),
      GET_STATUS: new Uint8Array([16]),
      GET_SENSOR_IDS: new Uint8Array([81]),
      GET_SENSOR_INFO: new Uint8Array([80, 0]),
      GET_DEFAULT_SENSORS_MASK: new Uint8Array([86])
    },
    m = 6,
    v = 7,
    g = 10,
    y = 8,
    b = 9,
    w = 11,
    _ = 12,
    k = 13,
    x = 14,
    E = 32,
    S = function S(e) {
      return 0 !== e;
    },
    R = function () {
      function e() {
        n(this, e), this._listenerMap = new Map();
      }
      return i(e, [{
        key: "on",
        value: function value(e, t) {
          this._listenerMap.has(e) || this._listenerMap.set(e, []), this._listenerMap.get(e).push(t);
        }
      }, {
        key: "off",
        value: function value(e, t) {
          var n = this._listenerMap.get(e);
          if (n && n.length) {
            var r = n.reduce(function (e, n, r) {
              return "function" == typeof n && n === t ? e = r : e;
            }, -1);
            if (r > -1) return n.splice(r, 1), this._listenerMap.set(e, n), !0;
          }
          return !1;
        }
      }, {
        key: "unbind",
        value: function value() {
          this._listenerMap.clear();
        }
      }, {
        key: "emit",
        value: function value(e) {
          for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
          var i = this._listenerMap.get(e);
          return !(!i || !i.length) && (i.forEach(function (e) {
            e.apply(void 0, n);
          }), !0);
        }
      }]), e;
    }(),
    U = function U() {},
    M = function M() {};
  function A(e) {
    return Array.from(new Uint8Array(e)).map(function (e) {
      return e.toString(16).padStart(2, "0");
    }).join(" ");
  }
  var C,
    L = function e() {
      var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
      n(this, e), this.type = t.type, this.mode = t.mode, this.minValue = t.minValue, this.maxValue = t.maxValue, this.uncertainty = t.uncertainty, this.minPeriod = t.minPeriod, this.maxPeriod = t.maxPeriod, this.typicalPeriod = t.typicalPeriod, this.granularity = t.granularity;
    },
    P = function e() {
      var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
      n(this, e), this.number = t.number, this.name = t.name, this.unit = t.unit, this.id = t.id, this.mutalExclusionMask = t.mutalExclusionMask, this.measurementInfo = t.measurementInfo;
    },
    T = function (e) {
      function t(e) {
        var r;
        return n(this, t), (r = u(this, o(t).call(this))).number = e.number, r.name = e.name, r.unit = e.unit, r.specs = e, r.enabled = !1, r.values = [], r.value = null, r;
      }
      return a(t, R), i(t, [{
        key: "clear",
        value: function value() {
          this.value = null, this.values = [];
        }
      }, {
        key: "setValue",
        value: function value(e, t) {
          this.value = e, t && this.values.push(this.value), this.emit("value-changed", this);
        }
      }, {
        key: "setEnabled",
        value: function value(e) {
          this.enabled !== e && (this.enabled = e, this.emit("state-changed", this));
        }
      }]), t;
    }(),
    N = function (e) {
      function r(e) {
        var t;
        if (n(this, r), t = u(this, o(r).call(this)), "undefined" == typeof TextDecoder) {
          var i = __webpack_require__(/*! text-encoding */ "./src/lib/tw-text-encoder.js");
          C = i.TextDecoder;
        } else C = TextDecoder;
        return t.device = e, t.sensors = [], t.opened = !1, t.rollingCounter = 0, t.collecting = !1, t.measurementPeriod = 10, t.response = null, t.remainingResponseLength = 0, t.defaultSensorsMask = 0, t.keepValues = !0, t.minMeasurementPeriod = 10, t.serialNumber = "", t.orderCode = "", t.name = "", t;
      }
      return a(r, R), i(r, [{
        key: "getBatteryLevel",
        value: function () {
          var e = t(regeneratorRuntime.mark(function e() {
            var t;
            return regeneratorRuntime.wrap(function (e) {
              for (;;) switch (e.prev = e.next) {
                case 0:
                  return e.next = 2, this._getStatus();
                case 2:
                  return t = e.sent, e.abrupt("return", t.battery);
                case 4:
                case "end":
                  return e.stop();
              }
            }, e, this);
          }));
          return function () {
            return e.apply(this, arguments);
          };
        }()
      }, {
        key: "getChargingState",
        value: function () {
          var e = t(regeneratorRuntime.mark(function e() {
            var t;
            return regeneratorRuntime.wrap(function (e) {
              for (;;) switch (e.prev = e.next) {
                case 0:
                  return e.next = 2, this._getStatus();
                case 2:
                  return t = e.sent, e.abrupt("return", t.chargingStatus);
                case 4:
                case "end":
                  return e.stop();
              }
            }, e, this);
          }));
          return function () {
            return e.apply(this, arguments);
          };
        }()
      }, {
        key: "open",
        value: function () {
          var e = t(regeneratorRuntime.mark(function e() {
            var t,
              n = arguments;
            return regeneratorRuntime.wrap(function (e) {
              for (;;) switch (e.prev = e.next) {
                case 0:
                  return t = n.length > 0 && void 0 !== n[0] && n[0], e.prev = 1, e.next = 4, this._connect();
                case 4:
                  return e.next = 6, this._init();
                case 6:
                  return e.next = 8, this._getStatus();
                case 8:
                  return e.next = 10, this._getDeviceInfo();
                case 10:
                  return e.next = 12, this._getDefaultSensorsMask();
                case 12:
                  return e.next = 14, this._getAvailableSensors();
                case 14:
                  this._onOpened(), t && this.start(), e.next = 21;
                  break;
                case 18:
                  e.prev = 18, e.t0 = e.catch(1), console.error(e.t0);
                case 21:
                case "end":
                  return e.stop();
              }
            }, e, this, [[1, 18]]);
          }));
          return function () {
            return e.apply(this, arguments);
          };
        }()
      }, {
        key: "close",
        value: function () {
          var e = t(regeneratorRuntime.mark(function e() {
            return regeneratorRuntime.wrap(function (e) {
              for (;;) switch (e.prev = e.next) {
                case 0:
                  return e.next = 2, this._stopMeasurements();
                case 2:
                  return e.next = 4, this._sendCommand(d.DISCONNECT);
                case 4:
                  return e.abrupt("return", this._disconnect());
                case 5:
                case "end":
                  return e.stop();
              }
            }, e, this);
          }));
          return function () {
            return e.apply(this, arguments);
          };
        }()
      }, {
        key: "enableDefaultSensors",
        value: function value() {
          for (var e = 1, t = 0; t < 32; ++t) {
            if ((this.defaultSensorsMask & e) === e) {
              var n = this.getSensor(t);
              n && n.setEnabled(!0);
            }
            e <<= 1;
          }
        }
      }, {
        key: "start",
        value: function value() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
            t = this.sensors.filter(function (e) {
              return e.enabled;
            });
          0 === t.length && (this.enableDefaultSensors(), t = this.sensors.filter(function (e) {
            return e.enabled;
          })), t.forEach(function (e) {
            return e.clear();
          }), e && (this.measurementPeriod = e), this._startMeasurements();
        }
      }, {
        key: "stop",
        value: function value() {
          this._stopMeasurements();
        }
      }, {
        key: "getSensor",
        value: function value(e) {
          return this.sensors.find(function (t) {
            return t.number === e;
          });
        }
      }, {
        key: "_connect",
        value: function () {
          var e = t(regeneratorRuntime.mark(function e() {
            var t = this;
            return regeneratorRuntime.wrap(function (e) {
              for (;;) switch (e.prev = e.next) {
                case 0:
                  return e.abrupt("return", this.device.setup({
                    onClosed: function onClosed() {
                      return t._onClosed();
                    },
                    onResponse: function onResponse(e) {
                      return t._handleResponse(e);
                    }
                  }));
                case 1:
                case "end":
                  return e.stop();
              }
            }, e, this);
          }));
          return function () {
            return e.apply(this, arguments);
          };
        }()
      }, {
        key: "_disconnect",
        value: function () {
          var e = t(regeneratorRuntime.mark(function e() {
            return regeneratorRuntime.wrap(function (e) {
              for (;;) switch (e.prev = e.next) {
                case 0:
                  return e.abrupt("return", this.device.close());
                case 1:
                case "end":
                  return e.stop();
              }
            }, e, this);
          }));
          return function () {
            return e.apply(this, arguments);
          };
        }()
      }, {
        key: "_init",
        value: function value() {
          return this.collecting = !1, this.rollingCounter = 255, this.writeQueue = [], this._sendCommand(d.INIT);
        }
      }, {
        key: "_handleResponse",
        value: function value(e) {
          if (U("command notified: ".concat(A(e.buffer))), this.remainingResponseLegnth > 0) {
            if (this.remainingResponseLegnth -= e.buffer.byteLength, this.response = new DataView((t = this.response.buffer, n = e.buffer.slice(0), (r = new Uint8Array(t.byteLength + n.byteLength)).set(new Uint8Array(t), 0), r.set(new Uint8Array(n), t.byteLength), r.buffer)), this.remainingResponseLegnth > 0) return;
          } else this.response = e;
          var t,
            n,
            r,
            i = this.response.getUint8(1);
          if (i > this.response.buffer.byteLength) this.remainingResponseLegnth = i - this.response.buffer.byteLength;else switch (U("handle command: ".concat(A(this.response.buffer))), this.response.getUint8(0)) {
            case E:
              this._processMeasurements(this.response);
              break;
            default:
              var a = this.response.getUint8(4),
                o = this.response.getUint8(5),
                s = new DataView(this.response.buffer, 6);
              this._resolveWriteCommand(a, o, s), this.remainingResponseLegnth = 0, this.response = null;
          }
        }
      }, {
        key: "_getSensorsWithMask",
        value: function value(e) {
          for (var t = [], n = 1, r = 0; r < 32; ++r) {
            if ((e & n) === n) {
              var i = this.getSensor(r);
              i && (t.push(i), U("available: [".concat(e, "] ").concat(t[t.length - 1].number)));
            }
            n <<= 1;
          }
          return t;
        }
      }, {
        key: "_processMeasurements",
        value: function value(e) {
          var t = [],
            n = !0,
            r = 0,
            i = 0,
            a = e.getUint8(4);
          switch (a) {
            case m:
              t = this._getSensorsWithMask(e.getUint16(5, !0)), r = e.getUint8(7, !0), i = 9;
              break;
            case v:
              t = this._getSensorsWithMask(e.getUint32(5, !0)), r = e.getUint8(9, !0), i = 11;
              break;
            case g:
            case y:
              t[0] = this.getSensor(e.getUint8(6)), r = e.getUint8(7, !0), i = 8;
              break;
            case w:
            case b:
              t[0] = this.getSensor(e.getUint8(6)), r = e.getUint8(7, !0), i = 8, n = !1;
              break;
            case _:
            case k:
            case x:
              U("Purposely Ignoring packet type: ".concat(a));
              break;
            default:
              U("Unknown packet type: ".concat(a));
          }
          for (var o = 0; o < r; ++o) for (var s = 0; s < t.length; ++s) n ? t[s].setValue(e.getFloat32(i, !0), this.keepValues) : t[s].setValue(e.getInt32(i, !0), this.keepValues), i += 4;
        }
      }, {
        key: "_resolveWriteCommand",
        value: function value(e, t, n) {
          var r = this.writeQueue.find(function (n) {
            return n.command === e && n.rollingCounter === t;
          });
          r && (r.resolve(n), this.writeQueue = this.writeQueue.filter(function (e) {
            return e !== r;
          }));
        }
      }, {
        key: "_onOpened",
        value: function value() {
          U("opened"), this.opened = !0, this.emit("device-opened");
        }
      }, {
        key: "_onClosed",
        value: function value() {
          U("closed"), this.opened = !1, this.emit("device-closed");
        }
      }, {
        key: "_decRollingCounter",
        value: function value() {
          return this.rollingCounter -= 1, this.rollingCounter;
        }
      }, {
        key: "_calculateChecksum",
        value: function value(e) {
          for (var t = e[1], n = -1 * e[3], r = 0; r < t; ++r) n += e[r], n &= 255;
          return n < 0 || n > 255 ? (U("Checksum failed!"), 0) : n;
        }
      }, {
        key: "_sendCommand",
        value: function value(e) {
          var t = new Uint8Array(d.HEADER.byteLength + e.byteLength);
          return t.set(new Uint8Array(d.HEADER), 0), t.set(new Uint8Array(e), d.HEADER.byteLength), t[1] = t.length, t[2] = this._decRollingCounter(), t[3] = this._calculateChecksum(t), this._queueWriteCommand(t, 0, t.length);
        }
      }, {
        key: "_writeCommand",
        value: function () {
          var e = t(regeneratorRuntime.mark(function e(t, n, r) {
            var i;
            return regeneratorRuntime.wrap(function (e) {
              for (;;) switch (e.prev = e.next) {
                case 0:
                  if (!(r > 0)) {
                    e.next = 12;
                    break;
                  }
                  return e.prev = 1, r > 20 ? (i = t.subarray(n, n + 20), r -= 20, n += 20) : (i = t.subarray(n, n + r), r = 0), e.next = 5, this.device.writeCommand(i);
                case 5:
                  e.next = 10;
                  break;
                case 7:
                  e.prev = 7, e.t0 = e.catch(1), U("Write Failure: ".concat(e.t0));
                case 10:
                  e.next = 0;
                  break;
                case 12:
                case "end":
                  return e.stop();
              }
            }, e, this, [[1, 7]]);
          }));
          return function (t, n, r) {
            return e.apply(this, arguments);
          };
        }()
      }, {
        key: "_queueWriteCommand",
        value: function value(e, t, n) {
          var r = this;
          U("command queued: ".concat(A(e)));
          var i = new Promise(function (t, n) {
            r.writeQueue.push({
              command: e[4],
              rollingCounter: e[2],
              resolve: t,
              reject: n
            }), setTimeout(function () {
              r.writeQueue = r.writeQueue.filter(function (t) {
                return t.command === e[4] && t.rollingCounter !== e[2];
              }), n(new Error("write command timed out after 5s. Command: ".concat(e[4].toString(16), " Rolling Counter: ").concat(e[2].toString(16))));
            }, 1e4);
          });
          return this._writeCommand(e, t, n), i;
        }
      }, {
        key: "_getStatus",
        value: function () {
          var e = t(regeneratorRuntime.mark(function e() {
            var t, n;
            return regeneratorRuntime.wrap(function (e) {
              for (;;) switch (e.prev = e.next) {
                case 0:
                  return e.next = 2, this._sendCommand(d.GET_STATUS);
                case 2:
                  return t = e.sent, n = {
                    masterFirmwareVersion: "".concat(t.getUint8(2), ".").concat(t.getUint8(3)),
                    bleFirmwareVersion: "".concat(t.getUint8(6), ".").concat(t.getUint8(9)),
                    battery: t.getUint8(10),
                    chargingStatus: "".concat(t.getUint8(11))
                  }, e.abrupt("return", n);
                case 5:
                case "end":
                  return e.stop();
              }
            }, e, this);
          }));
          return function () {
            return e.apply(this, arguments);
          };
        }()
      }, {
        key: "_getAvailableSensors",
        value: function () {
          var e = t(regeneratorRuntime.mark(function e() {
            var t,
              n,
              r = this;
            return regeneratorRuntime.wrap(function (e) {
              for (;;) switch (e.prev = e.next) {
                case 0:
                  return e.next = 2, this._sendCommand(d.GET_SENSOR_IDS).then(function (e) {
                    r.availableSensors = e.getUint32(0, !0), U("Get Available Sensors Returned ".concat(r.availableSensors));
                  });
                case 2:
                  t = 1, n = 0;
                case 4:
                  if (!(n < 31)) {
                    e.next = 12;
                    break;
                  }
                  if ((this.availableSensors & t) !== t) {
                    e.next = 8;
                    break;
                  }
                  return e.next = 8, this._getSensorInfo(n);
                case 8:
                  t <<= 1;
                case 9:
                  ++n, e.next = 4;
                  break;
                case 12:
                case "end":
                  return e.stop();
              }
            }, e, this);
          }));
          return function () {
            return e.apply(this, arguments);
          };
        }()
      }, {
        key: "_getDefaultSensorsMask",
        value: function value() {
          var e = this;
          return this._sendCommand(d.GET_DEFAULT_SENSORS_MASK).then(function (t) {
            e.defaultSensorsMask = t.getUint32(0, !0), U("Default Sensors:"), M(e);
          });
        }
      }, {
        key: "_getDeviceInfo",
        value: function value() {
          var e = this;
          return this._sendCommand(d.GET_INFO).then(function (t) {
            var n = new C("utf-8");
            e.orderCode = n.decode(new Uint8Array(t.buffer, 6, 16).filter(S)), e.serialNumber = n.decode(new Uint8Array(t.buffer, 22, 16).filter(S)), e.name = n.decode(new Uint8Array(t.buffer, 38, 32).filter(S)), U("Device Info:"), M(e);
          });
        }
      }, {
        key: "_getSensorInfo",
        value: function () {
          var e = t(regeneratorRuntime.mark(function e(t) {
            var n,
              r = this;
            return regeneratorRuntime.wrap(function (e) {
              for (;;) switch (e.prev = e.next) {
                case 0:
                  return (n = new Uint8Array(d.GET_SENSOR_INFO))[1] = t, e.abrupt("return", this._sendCommand(n).then(function (e) {
                    var t = e.getUint32(2, !0);
                    if (t > 0) {
                      var n = new C("utf-8"),
                        i = new L({
                          type: e.getUint8(6),
                          mode: e.getUint8(7),
                          minValue: e.getFloat64(108, !0),
                          maxValue: e.getFloat64(116, !0),
                          uncertainty: e.getFloat64(100, !0),
                          minPeriod: e.getUint32(124, !0) / 1e3,
                          maxPeriod: ((e.getUint32(132, !0) << 32) + e.getUint32(128, !0)) / 1e3,
                          typicalPeriod: e.getUint32(136, !0) / 1e3,
                          granularity: e.getUint32(140, !0) / 1e3
                        }),
                        a = new P({
                          number: e.getUint8(0),
                          name: n.decode(new Uint8Array(e.buffer, 14, 60).filter(S)),
                          unit: n.decode(new Uint8Array(e.buffer, 74, 32).filter(S)),
                          mutalExclusiveMask: e.getUint32(144, !0),
                          measurementInfo: i,
                          sensorId: t
                        }),
                        o = new T(a);
                      U("Get Sensor Info Returned"), M(o), r.sensors.push(o), o.on("state-changed", function () {
                        U("Sensor Restart: ".concat(o.number)), o.enabled && (r.measurementPeriod = o.specs.measurementInfo.typicalPeriod, r.sensors.forEach(function (e) {
                          if (o.number !== e.number && e.enabled) {
                            var t = 1 << e.number;
                            (t & o.specs.mutalExclusiveMask) === t ? e.enabled = !1 : e.specs.measurementInfo.typicalPeriod > r.measurementPeriod && (r.measurementPeriod = e.specs.measurementInfo.typicalPeriod);
                          }
                        })), r._restartMeasurements();
                      });
                    }
                  }));
                case 3:
                case "end":
                  return e.stop();
              }
            }, e, this);
          }));
          return function (t) {
            return e.apply(this, arguments);
          };
        }()
      }, {
        key: "_restartMeasurements",
        value: function () {
          var e = t(regeneratorRuntime.mark(function e() {
            var t;
            return regeneratorRuntime.wrap(function (e) {
              for (;;) switch (e.prev = e.next) {
                case 0:
                  if (t = this.collecting, !this.collecting) {
                    e.next = 10;
                    break;
                  }
                  return e.prev = 2, e.next = 5, this._stopMeasurements();
                case 5:
                  e.next = 10;
                  break;
                case 7:
                  e.prev = 7, e.t0 = e.catch(2), console.error(e.t0);
                case 10:
                  if (this.collecting || !t) {
                    e.next = 19;
                    break;
                  }
                  return e.prev = 11, e.next = 14, this._startMeasurements();
                case 14:
                  e.next = 19;
                  break;
                case 16:
                  e.prev = 16, e.t1 = e.catch(11), console.error(e.t1);
                case 19:
                case "end":
                  return e.stop();
              }
            }, e, this, [[2, 7], [11, 16]]);
          }));
          return function () {
            return e.apply(this, arguments);
          };
        }()
      }, {
        key: "_setMeasurementPeriod",
        value: function value(e) {
          var t = new Uint8Array(d.SET_MEASUREMENT_PERIOD),
            n = 1e3 * this.minMeasurementPeriod;
          return e < n && (e = n), U("MeasurementPeriod: ".concat(e)), t[3] = e >> 0 & 255, t[4] = e >> 8 & 255, t[5] = e >> 16 & 255, t[6] = e >> 24 & 255, this._sendCommand(t);
        }
      }, {
        key: "_getEnabledChannelMask",
        value: function value() {
          var e = 0;
          return this.sensors.filter(function (e) {
            return e.enabled;
          }).forEach(function (t) {
            e += 1 << t.number;
          }), e;
        }
      }, {
        key: "_startMeasurements",
        value: function value() {
          var e = this;
          return this._setMeasurementPeriod(1e3 * this.measurementPeriod).then(function () {
            var t = e._getEnabledChannelMask();
            U("ChannelMask: ".concat(t));
            var n = new Uint8Array(d.START_MEASUREMENTS);
            return n[3] = t >> 0 & 255, n[4] = t >> 8 & 255, n[5] = t >> 16 & 255, n[6] = t >> 24 & 255, e._sendCommand(n).then(function (t) {
              0 === t.getUint8(0) && (e.collecting = !0, e.emit("measurements-started"));
            });
          });
        }
      }, {
        key: "_stopMeasurements",
        value: function value() {
          var e = this;
          return this._sendCommand(d.STOP_MEASUREMENTS).then(function (t) {
            0 === t.getUint8(0) && (e.collecting = !1, e.emit("measurements-stopped"));
          });
        }
      }]), r;
    }(),
    O = function () {
      function e(t) {
        n(this, e), this.webBluetoothNativeDevice = t, this.deviceCommand = null, this.deviceResponse = null;
      }
      return i(e, [{
        key: "writeCommand",
        value: function () {
          var e = t(regeneratorRuntime.mark(function e(t) {
            return regeneratorRuntime.wrap(function (e) {
              for (;;) switch (e.prev = e.next) {
                case 0:
                  return e.abrupt("return", this.deviceCommand.writeValue(t));
                case 1:
                case "end":
                  return e.stop();
              }
            }, e, this);
          }));
          return function (t) {
            return e.apply(this, arguments);
          };
        }()
      }, {
        key: "setup",
        value: function () {
          var e = t(regeneratorRuntime.mark(function e(t) {
            var n,
              r,
              i,
              a,
              o = this;
            return regeneratorRuntime.wrap(function (e) {
              for (;;) switch (e.prev = e.next) {
                case 0:
                  return n = t.onClosed, r = t.onResponse, this.webBluetoothNativeDevice.addEventListener("gattserverdisconnected", n), e.prev = 2, e.next = 5, this.webBluetoothNativeDevice.gatt.connect();
                case 5:
                  return i = e.sent, e.next = 8, i.getPrimaryService("d91714ef-28b9-4f91-ba16-f0d9a604f112");
                case 8:
                  return a = e.sent, e.next = 11, a.getCharacteristics();
                case 11:
                  e.sent.forEach(function (e) {
                    switch (e.uuid) {
                      case "f4bf14a6-c7d5-4b6d-8aa8-df1a7c83adcb":
                        o.deviceCommand = e;
                        break;
                      case "b41e6675-a329-40e0-aa01-44d2f444babe":
                        o.deviceResponse = e, o.deviceResponse.addEventListener("characteristicvaluechanged", function (e) {
                          var t = e.target.value;
                          r(t);
                        }), o.deviceResponse.startNotifications();
                        break;
                      default:
                        U("No case found for ".concat(e.uuid));
                    }
                  }), e.next = 18;
                  break;
                case 15:
                  e.prev = 15, e.t0 = e.catch(2), console.error(e.t0);
                case 18:
                  if (this.deviceCommand && this.deviceResponse) {
                    e.next = 20;
                    break;
                  }
                  throw new Error("Expected command and response characteristics not found.");
                case 20:
                case "end":
                  return e.stop();
              }
            }, e, this, [[2, 15]]);
          }));
          return function (t) {
            return e.apply(this, arguments);
          };
        }()
      }, {
        key: "close",
        value: function () {
          var e = t(regeneratorRuntime.mark(function e() {
            return regeneratorRuntime.wrap(function (e) {
              for (;;) switch (e.prev = e.next) {
                case 0:
                  return e.abrupt("return", this.webBluetoothNativeDevice.gatt.disconnect());
                case 1:
                case "end":
                  return e.stop();
              }
            }, e, this);
          }));
          return function () {
            return e.apply(this, arguments);
          };
        }()
      }, {
        key: "godirectAdapter",
        get: function get() {
          return !0;
        }
      }]), e;
    }(),
    D = {
      createDevice: function () {
        var e = t(regeneratorRuntime.mark(function e(t) {
          var n,
            r,
            i,
            a,
            o,
            s,
            u,
            c = arguments;
          return regeneratorRuntime.wrap(function (e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (n = c.length > 1 && void 0 !== c[1] ? c[1] : {}, r = n.open, i = void 0 === r || r, a = n.startMeasurements, o = void 0 === a || a, (s = t).godirectAdapter || (s = new O(t)), u = new N(s), !i) {
                  e.next = 14;
                  break;
                }
                return e.prev = 5, e.next = 8, u.open(o);
              case 8:
                e.next = 14;
                break;
              case 10:
                throw e.prev = 10, e.t0 = e.catch(5), console.error(e.t0), e.t0;
              case 14:
                return e.abrupt("return", u);
              case 15:
              case "end":
                return e.stop();
            }
          }, e, this, [[5, 10]]);
        }));
        return function (t) {
          return e.apply(this, arguments);
        };
      }(),
      selectDevice: function () {
        var e = t(regeneratorRuntime.mark(function e() {
          var t;
          return regeneratorRuntime.wrap(function (e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (navigator.bluetooth) {
                  e.next = 2;
                  break;
                }
                return e.abrupt("return", Promise.reject(new Error("No Web Bluetooth support.")));
              case 2:
                return e.next = 4, navigator.bluetooth.requestDevice({
                  filters: [{
                    namePrefix: "GDX"
                  }],
                  optionalServices: ["d91714ef-28b9-4f91-ba16-f0d9a604f112"]
                });
              case 4:
                return t = e.sent, e.abrupt("return", D.createDevice(t));
              case 6:
              case "end":
                return e.stop();
            }
          }, e, this);
        }));
        return function () {
          return e.apply(this, arguments);
        };
      }()
    };
  return D;
});

/***/ }),

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

/***/ "./node_modules/scratch-vm/src/extensions/scratch3_gdx_for/index.js":
/*!**************************************************************************!*\
  !*** ./node_modules/scratch-vm/src/extensions/scratch3_gdx_for/index.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const ArgumentType = __webpack_require__(/*! ../../extension-support/argument-type */ "./node_modules/scratch-vm/src/extension-support/argument-type.js");
const BlockType = __webpack_require__(/*! ../../extension-support/block-type */ "./node_modules/scratch-vm/src/extension-support/block-type.js");
const log = __webpack_require__(/*! ../../util/log */ "./node_modules/scratch-vm/src/util/log.js");
const formatMessage = __webpack_require__(/*! format-message */ "./node_modules/scratch-vm/node_modules/format-message/index.js");
const MathUtil = __webpack_require__(/*! ../../util/math-util */ "./node_modules/scratch-vm/src/util/math-util.js");
const BLE = __webpack_require__(/*! ../../io/ble */ "./node_modules/scratch-vm/src/io/ble.js");
const godirect = __webpack_require__(/*! @vernier/godirect/dist/godirect.min.umd.js */ "./node_modules/@vernier/godirect/dist/godirect.min.umd.js");
const ScratchLinkDeviceAdapter = __webpack_require__(/*! ./scratch-link-device-adapter */ "./node_modules/scratch-vm/src/extensions/scratch3_gdx_for/scratch-link-device-adapter.js");

/**
 * Icon png to be displayed at the left edge of each extension block, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len
const blockIconURI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAABGdBTUEAALGPC/xhBQAACCNJREFUeAHtnGtsFFUUgM+dfXbbbbcWaKHSFgrlkWgkJCb6A4kmJfiHIBYBpcFfRg1GEkmEVAvhFYw/TExMxGoICAECiZEIIUQCiiT4gh+KILRQCi2ENIV2t/ue6zl3u2Upu4XuzO4csCe587iPmXO/OWfunTszV4ABWfflQU+0p+9bTcLzEmS5gUPlvagAcVMXcMpnK1u+evW8QLYKaNkWpHKxnt6dQsqFjxo80p10Jt1vx7t30n62Ys+2IJUTUpDlqUNomgYutwsjhZFD5r6slBAOhUHX9YTe6D1GTmrIAhFeBZ2c4JFCpBiggmwlBR7pTGLUewxZYBIUWV7yqgb7g8lotuukt5ihqyELHCSEbusk931ExMxbjSkWSNxEyr3vysxZLFHWnDuT0CtFV6OKmmOBRrV4hMubZoGmMZA6lHTfgsLeHnBEIiCxUY86XRDw+sBfOgZ0m820U5lxIFYAncF+GNvVDo5QaLBu1ClyYTyF4tvd8lZltQgXFA6mW73BxoVt0ShUXG2VCp4QQdDEFqez4Bm7p7gaO0of422r3x4Ji/KrbdIexu4SE2FjgWO6OkCLx6gt6gxOiNV92tiY+ni1Ye1nu7dpQfk35ikru9EBN6unsEDIwgLJPQv8dwCfT3WPt+iFIfAUqM3vL7vpjmuz0KX1gkAfOMN33dxKkjwA9vsTDIS8uubdBZcyAWlqWtohQbRSuru/L1O2vMazAGiLxRKVFqDgDEdAaHCN0kU8Ply2vKWxABhzJZ5ipC6qHlRzfJxVz99S49GdYQEw7PYkuAmokZJ6fumlQUqiNpVSQ56i9JnyHMsCYMRdADGHk0ZyHM1b976XicH0rXtWYR57FPNSGQ7CAiCBCJQ8oXhI0FdmBiPfVnl9ZZmz5DmFDcA+HwIUOEYMcjL2+e57PbBp04HxONI4ifIEKC8TYQMwhs+7IU+hwBFOYQvB5qF8grbwJnRfQXnIhbkIG4AExF+ScE00w0X3AZLwisrDyH1JH1YAA8UlIG029FRZsu6TPfVJiIltWYIjMTLgLUlGs1izeRYmGtS383t9wnu7G2J6fH/Tln2LNUdExGLxvZSOQ1qCS/+P9CFhBZAUuj12PHgCvRJHZ7w4EnhYjya6hXGHQ2Jaxj4ilbVC2AFEUNBVXSdKb3WC29+rmISKiqFn7ARBadyEHUACFHM64VZlDTdWafVh1Yik1ZB5JEsLJGaVtosw37ld4TscWQHX4+oRWO1zWrAEWCR6oMnTCEXijmI1234MVvsPgV+WcmKndGHpwlNtZwbhkZYEkuI4CkuAXfpk0HGAPym0TXEchaUL39Br4JvQeljk+lwxOxBeCRQ3UrFHI+AMBsEV6gcnhlwIS4BU0RORV1V42EqnwnLgSyo3AsM3eA9bPOt8bAEOV6NUWGRZ9FYvHSx6R0pfYgkMmk2DCH1+Z7KwB5gKazjLGgpLgUOAuRZWALnDSncxLAOYCmskbqjhe02h5d6y0sFKF5cXgI8LrLwB9PTeGew6POwNnptlpYOVLi4nFjjuWts957rnBk8tomoZ+bjhPcqOcCcnAG34EaTqOjxmsNKxzQnAkX5wronsOry6zIn66ThljLNcg+W1a2Gi55+MCg6XcKl3NuxrbxouS87TLAcY1V0QV5+8jLyuEekeeSGTS1gOcM/lZpOrlN/DsRzOyi8CY2fLuwUum/wR1BT+ZUzrDKUv9D4LB9rXZEjNTfRjZYFS5r86ebfA3W0bcmMKFh01/5fMoorm6rSjAA2SNc2F8dvmQVWCgdy8fxg8gcEN0pWez80QUyyQFAqn/N9mhmK5PAYN7adecCPnMsUCCZ7U8ari4IGb87wJeKFDA/MlmHXBDVkgTR1CV4/gaThKzBoeKYpuSzqSrqSzEiFuJDayWxqyQJp3RUhYSKfWUSEz5iDIrhrZl8I5b37JvrTBT3wdpd43cOqT/WiJhq6ikQpkW5a8BxuS/X219uXZHoPKmdMUGdEgpWzTll3Kr95Z8VJK7N3NL7b/qHY2rnmdjd6G7oF3q/b/3RoFaPDajwIcBWiQgMHioxZoEKChfqDBc2csnmxtM2ZglMDKArFvduhBbLDv9sOD8oymA0xBCHVtl6+c7ey6Ibdt+3ox7WOoxMCmD4i68PrZkBQaEDUe1tnVqSyyfl79+vr6evz1C2jKogkYWEEc0JnViiZRqKuoqJiZtEJcn0GIsykewzhW2jJVZjzBamxsfK79ase/5MoXL106TnEDwfq36qgIF6HGjKyqFsNkDGMwUNxEDEmIHQTxyNGjH1AchvumBcC4vAuXVpiA+TDYMFDXiiZFoN+SrmMI7tixo/v3337diNtQUzNpPq1RChIra5ccAFKDUEwYLra2fnXu3PmtA0gojqbaVUNl23ft+pPiPW73U7RGYdGH5QCQYCg93C73075S34I5c+ZQa0s/B1Njou51tVVVatJAXcrED3Q4EI5plgsHgAQiSiRCoRD9ECeam9fPo32UJzFQYwJLlix9mdZ9fb1naY2iyiQ2rVtyAEi199Pi5M8/tdB62vRpzceOH3+toaHBh61w2clTp96sqq5ehUnxw0eO7KA8KKpMYtO6JZcOKTUeNRhsp0+ffmtilYI1VLf4+Qvn1784d+5ezEfW144hMR05blglpDgHSbqxt6Wl5Y8ZM6afKq8oL7LZHd54PH7H7w+cOPj9dx8uXbLk+ICynbhm4cJDr7LVMKmhoP5dphaWoFGrHMTAQrgBJCjkFdQHpPntqCUmiWCge14PBsvdFnUYlP8AMAKfKIKmYukAAAAASUVORK5CYII=';

/**
 * Icon png to be displayed in the blocks category menu, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len
const menuIconURI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABGdBTUEAALGPC/xhBQAAA9dJREFUWAnNmE2IFEcUgF/9dE/v7LoaM9kkK4JBRA0EFBIPRm85hBAvEXHXwyo5eFE87GFcReMkObgJiQnkkJzEg9n8HIJixKNe1IMKihgiCbviwV11V3d0d3pmuqsqr5ppcEnb3TNVggVFVVe9eu+r97qqq4tASqp8/fsboQgmU0TMugi571K29bPy9ovPU8Sf16HbpQj3EkYFBcJcr5Am2nZfs94AIWVfqMQeHNwhICUBZ4ypUIA/X2sbIm2AW8AJK0lkEP6TJpfqwXgg4QxmF/fB7Gtvxk1G5ZKHU1CqTgPJoSUXYJYeohSUJu+qrqdVUGh2/pVX4VFffx77WaqBZkrkEFj271+qWH0sXcU3FBzyQe/Mg7B//LbKMTRTxNiDbsMHHjTJlyM7HEJIBHXs2KXFj+oTNSdoQOCYLS5jD9IwBMm5H8NplwwPb/QV4yEIcycaAza9IuA76B38fuz1OF5RXUkmHCdu6rg0BpSMgV/sAe7DdzGFrvvdi0D3mSZjQA0wt7REQsY+iWF0XbfFzyal8SLRxuteD+Du4h4Z/flbqaBHibAQtZmQtcZaAZSMwtTylaR/4vaw1ju5YhWG10pwwAqghmp2FeHO2+t11WqyM80W0m7vAOhsM1kD7CGz8L57Jsq6bitZC/GcWgLf1H6KuHT92cTDAFy/BgXMXm0OCpgV50Bo9kK3BqiBboabQMMU/WoL5im4jToeq/AIgXsiRx5KKCjcwPEsiAv/BQMu9EwyDHXd/3kqCOSzDk6t5/YglQKKeJwq+PNRmJI8kwSTaj1HZy5AhSHqnXkIvU9mMUwEw4Q5wTM57LUtkg8QPw/cdcBJ+PhvKJ0Gj80nGq6JXrg6/XFiX97GXIBpyqTieKpKViOl+WEhWXMaUavvvdIZ8Giy5+Lh3bwKm/t+Be3JazMfxc1tldY26rastiHcsQevTG9pw0znovkAcRWHzSDKnZtaOJLSfMFLB5RqtRBS4LbCurqLCy0YPkU3C0IIPEimMqR2ei7ZX2+KQdRi/WahNT/GmfOD4Vyzhx/66pcjp85dUvcmp6J8+txldXh07PPskdkS+V6EbD0vTOKlB0x9B/O6BS8ULly9PgE6x4kDPR/XX5pyYKj8xcCucsUmkNUQE0JvKKm2VioVK5HRE7UKOHbi6B94RzP+93jtpC0vWgXUF0hr3ipuw8uadwd3jXxoA9IK4Pah8t6BneV9GgjD28Svw1mlxFobgFbeFTz13cKbth93fDryp2CEq0a4hTA+aAPQ/ESJFDdvXLzzzrqNjlTqOP6uDeFf0uhvJ0ZP2QD8D6ZzU6u8YIbBAAAAAElFTkSuQmCC';

/**
 * Enum for Vernier godirect protocol.
 * @readonly
 * @enum {string}
 */
const BLEUUID = {
  service: 'd91714ef-28b9-4f91-ba16-f0d9a604f112',
  commandChar: 'f4bf14a6-c7d5-4b6d-8aa8-df1a7c83adcb',
  responseChar: 'b41e6675-a329-40e0-aa01-44d2f444babe'
};

/**
 * A time interval to wait (in milliseconds) before reporting to the BLE socket
 * that data has stopped coming from the peripheral.
 */
const BLETimeout = 4500;

/**
 * A string to report to the BLE socket when the GdxFor has stopped receiving data.
 * @type {string}
 */
const BLEDataStoppedError = 'Force and Acceleration extension stopped receiving data';

/**
 * Sensor ID numbers for the GDX-FOR.
 */
const GDXFOR_SENSOR = {
  FORCE: 1,
  ACCELERATION_X: 2,
  ACCELERATION_Y: 3,
  ACCELERATION_Z: 4,
  SPIN_SPEED_X: 5,
  SPIN_SPEED_Y: 6,
  SPIN_SPEED_Z: 7
};

/**
 * The update rate, in milliseconds, for sensor data input from the peripheral.
 */
const GDXFOR_UPDATE_RATE = 80;

/**
 * Threshold for pushing and pulling force, for the whenForcePushedOrPulled hat block.
 * @type {number}
 */
const FORCE_THRESHOLD = 5;

/**
 * Threshold for acceleration magnitude, for the "shaken" gesture.
 * @type {number}
 */
const SHAKEN_THRESHOLD = 30;

/**
 * Threshold for acceleration magnitude, to check if we are facing up.
 * @type {number}
 */
const FACING_THRESHOLD = 9;

/**
 * An offset for the facing threshold, used to check that we are no longer facing up.
 * @type {number}
 */
const FACING_THRESHOLD_OFFSET = 5;

/**
 * Threshold for acceleration magnitude, below which we are in freefall.
 * @type {number}
 */
const FREEFALL_THRESHOLD = 0.5;

/**
 * Factor used to account for influence of rotation during freefall.
 * @type {number}
 */
const FREEFALL_ROTATION_FACTOR = 0.3;

/**
 * Threshold in degrees for reporting that the sensor is tilted.
 * @type {number}
 */
const TILT_THRESHOLD = 15;

/**
 * Acceleration due to gravity, in m/s^2.
 * @type {number}
 */
const GRAVITY = 9.8;

/**
 * Manage communication with a GDX-FOR peripheral over a Scratch Link client socket.
 */
class GdxFor {
  /**
   * Construct a GDX-FOR communication object.
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

    /**
     * An @vernier/godirect Device
     * @type {Device}
     * @private
     */
    this._device = null;
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
      force: 0,
      accelerationX: 0,
      accelerationY: 0,
      accelerationZ: 0,
      spinSpeedX: 0,
      spinSpeedY: 0,
      spinSpeedZ: 0
    };

    /**
     * Interval ID for data reading timeout.
     * @type {number}
     * @private
     */
    this._timeoutID = null;
    this.reset = this.reset.bind(this);
    this._onConnect = this._onConnect.bind(this);
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
        namePrefix: 'GDX-FOR'
      }],
      optionalServices: [BLEUUID.service]
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
   * Called by the runtime when a user exits the connection popup.
   * Disconnect from the GDX FOR.
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
    this._sensors = {
      force: 0,
      accelerationX: 0,
      accelerationY: 0,
      accelerationZ: 0,
      spinSpeedX: 0,
      spinSpeedY: 0,
      spinSpeedZ: 0
    };
    if (this._timeoutID) {
      window.clearInterval(this._timeoutID);
      this._timeoutID = null;
    }
  }

  /**
   * Return true if connected to the goforce device.
   * @return {boolean} - whether the goforce is connected.
   */
  isConnected() {
    let connected = false;
    if (this._ble) {
      connected = this._ble.isConnected();
    }
    return connected;
  }

  /**
   * Starts reading data from peripheral after BLE has connected to it.
   * @private
   */
  _onConnect() {
    const adapter = new ScratchLinkDeviceAdapter(this._ble, BLEUUID);
    godirect.createDevice(adapter, {
      open: true,
      startMeasurements: false
    }).then(device => {
      // Setup device
      this._device = device;
      this._device.keepValues = false; // todo: possibly remove after updating Vernier godirect module

      // Enable sensors
      this._device.sensors.forEach(sensor => {
        sensor.setEnabled(true);
      });

      // Set sensor value-update behavior
      this._device.on('measurements-started', () => {
        const enabledSensors = this._device.sensors.filter(s => s.enabled);
        enabledSensors.forEach(sensor => {
          sensor.on('value-changed', s => {
            this._onSensorValueChanged(s);
          });
        });
        this._timeoutID = window.setInterval(() => this._ble.handleDisconnectError(BLEDataStoppedError), BLETimeout);
      });

      // Start device
      this._device.start(GDXFOR_UPDATE_RATE);
    });
  }

  /**
   * Handler for sensor value changes from the goforce device.
   * @param {object} sensor - goforce device sensor whose value has changed
   * @private
   */
  _onSensorValueChanged(sensor) {
    switch (sensor.number) {
      case GDXFOR_SENSOR.FORCE:
        // Normalize the force, which can be measured between -50 and 50 N,
        // to be a value between -100 and 100.
        this._sensors.force = MathUtil.clamp(sensor.value * 2, -100, 100);
        break;
      case GDXFOR_SENSOR.ACCELERATION_X:
        this._sensors.accelerationX = sensor.value;
        break;
      case GDXFOR_SENSOR.ACCELERATION_Y:
        this._sensors.accelerationY = sensor.value;
        break;
      case GDXFOR_SENSOR.ACCELERATION_Z:
        this._sensors.accelerationZ = sensor.value;
        break;
      case GDXFOR_SENSOR.SPIN_SPEED_X:
        this._sensors.spinSpeedX = this._spinSpeedFromGyro(sensor.value);
        break;
      case GDXFOR_SENSOR.SPIN_SPEED_Y:
        this._sensors.spinSpeedY = this._spinSpeedFromGyro(sensor.value);
        break;
      case GDXFOR_SENSOR.SPIN_SPEED_Z:
        this._sensors.spinSpeedZ = this._spinSpeedFromGyro(sensor.value);
        break;
    }
    // cancel disconnect timeout and start a new one
    window.clearInterval(this._timeoutID);
    this._timeoutID = window.setInterval(() => this._ble.handleDisconnectError(BLEDataStoppedError), BLETimeout);
  }
  _spinSpeedFromGyro(val) {
    const framesPerSec = 1000 / this._runtime.currentStepTime;
    val = MathUtil.radToDeg(val);
    val = val / framesPerSec; // convert to from degrees per sec to degrees per frame
    val = val * -1;
    return val;
  }
  getForce() {
    return this._sensors.force;
  }
  getTiltFrontBack() {
    let back = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    const x = this.getAccelerationX();
    const y = this.getAccelerationY();
    const z = this.getAccelerationZ();

    // Compute the yz unit vector
    const y2 = y * y;
    const z2 = z * z;
    let value = y2 + z2;
    value = Math.sqrt(value);

    // For sufficiently small zy vector values we are essentially at 90 degrees.
    // The following snaps to 90 and avoids divide-by-zero errors.
    // The snap factor was derived through observation -- just enough to
    // still allow single degree steps up to 90 (..., 87, 88, 89, 90).
    if (value < 0.35) {
      value = x < 0 ? 90 : -90;
    } else {
      value = x / value;
      value = Math.atan(value);
      value = MathUtil.radToDeg(value) * -1;
    }

    // Back is the inverse of front
    if (back) value *= -1;
    return value;
  }
  getTiltLeftRight() {
    let right = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    const x = this.getAccelerationX();
    const y = this.getAccelerationY();
    const z = this.getAccelerationZ();

    // Compute the yz unit vector
    const x2 = x * x;
    const z2 = z * z;
    let value = x2 + z2;
    value = Math.sqrt(value);

    // For sufficiently small zy vector values we are essentially at 90 degrees.
    // The following snaps to 90 and avoids divide-by-zero errors.
    // The snap factor was derived through observation -- just enough to
    // still allow single degree steps up to 90 (..., 87, 88, 89, 90).
    if (value < 0.35) {
      value = y < 0 ? 90 : -90;
    } else {
      value = y / value;
      value = Math.atan(value);
      value = MathUtil.radToDeg(value) * -1;
    }

    // Right is the inverse of left
    if (right) value *= -1;
    return value;
  }
  getAccelerationX() {
    return this._sensors.accelerationX;
  }
  getAccelerationY() {
    return this._sensors.accelerationY;
  }
  getAccelerationZ() {
    return this._sensors.accelerationZ;
  }
  getSpinSpeedX() {
    return this._sensors.spinSpeedX;
  }
  getSpinSpeedY() {
    return this._sensors.spinSpeedY;
  }
  getSpinSpeedZ() {
    return this._sensors.spinSpeedZ;
  }
}

/**
 * Enum for pushed and pulled menu options.
 * @readonly
 * @enum {string}
 */
const PushPullValues = {
  PUSHED: 'pushed',
  PULLED: 'pulled'
};

/**
 * Enum for motion gesture menu options.
 * @readonly
 * @enum {string}
 */
const GestureValues = {
  SHAKEN: 'shaken',
  STARTED_FALLING: 'started falling',
  TURNED_FACE_UP: 'turned face up',
  TURNED_FACE_DOWN: 'turned face down'
};

/**
 * Enum for tilt axis menu options.
 * @readonly
 * @enum {string}
 */
const TiltAxisValues = {
  FRONT: 'front',
  BACK: 'back',
  LEFT: 'left',
  RIGHT: 'right',
  ANY: 'any'
};

/**
 * Enum for axis menu options.
 * @readonly
 * @enum {string}
 */
const AxisValues = {
  X: 'x',
  Y: 'y',
  Z: 'z'
};

/**
 * Scratch 3.0 blocks to interact with a GDX-FOR peripheral.
 */
class Scratch3GdxForBlocks {
  /**
   * @return {string} - the name of this extension.
   */
  static get EXTENSION_NAME() {
    return 'Force and Acceleration';
  }

  /**
   * @return {string} - the ID of this extension.
   */
  static get EXTENSION_ID() {
    return 'gdxfor';
  }
  get AXIS_MENU() {
    return [{
      text: 'x',
      value: AxisValues.X
    }, {
      text: 'y',
      value: AxisValues.Y
    }, {
      text: 'z',
      value: AxisValues.Z
    }];
  }
  get TILT_MENU() {
    return [{
      text: formatMessage({
        id: 'gdxfor.tiltDirectionMenu.front',
        default: 'front',
        description: 'label for front element in tilt direction picker for gdxfor extension'
      }),
      value: TiltAxisValues.FRONT
    }, {
      text: formatMessage({
        id: 'gdxfor.tiltDirectionMenu.back',
        default: 'back',
        description: 'label for back element in tilt direction picker for gdxfor extension'
      }),
      value: TiltAxisValues.BACK
    }, {
      text: formatMessage({
        id: 'gdxfor.tiltDirectionMenu.left',
        default: 'left',
        description: 'label for left element in tilt direction picker for gdxfor extension'
      }),
      value: TiltAxisValues.LEFT
    }, {
      text: formatMessage({
        id: 'gdxfor.tiltDirectionMenu.right',
        default: 'right',
        description: 'label for right element in tilt direction picker for gdxfor extension'
      }),
      value: TiltAxisValues.RIGHT
    }];
  }
  get TILT_MENU_ANY() {
    return [...this.TILT_MENU, {
      text: formatMessage({
        id: 'gdxfor.tiltDirectionMenu.any',
        default: 'any',
        description: 'label for any direction element in tilt direction picker for gdxfor extension'
      }),
      value: TiltAxisValues.ANY
    }];
  }
  get PUSH_PULL_MENU() {
    return [{
      text: formatMessage({
        id: 'gdxfor.pushed',
        default: 'pushed',
        description: 'the force sensor was pushed inward'
      }),
      value: PushPullValues.PUSHED
    }, {
      text: formatMessage({
        id: 'gdxfor.pulled',
        default: 'pulled',
        description: 'the force sensor was pulled outward'
      }),
      value: PushPullValues.PULLED
    }];
  }
  get GESTURE_MENU() {
    return [{
      text: formatMessage({
        id: 'gdxfor.shaken',
        default: 'shaken',
        description: 'the sensor was shaken'
      }),
      value: GestureValues.SHAKEN
    }, {
      text: formatMessage({
        id: 'gdxfor.startedFalling',
        default: 'started falling',
        description: 'the sensor started free falling'
      }),
      value: GestureValues.STARTED_FALLING
    }, {
      text: formatMessage({
        id: 'gdxfor.turnedFaceUp',
        default: 'turned face up',
        description: 'the sensor was turned to face up'
      }),
      value: GestureValues.TURNED_FACE_UP
    }, {
      text: formatMessage({
        id: 'gdxfor.turnedFaceDown',
        default: 'turned face down',
        description: 'the sensor was turned to face down'
      }),
      value: GestureValues.TURNED_FACE_DOWN
    }];
  }

  /**
   * Construct a set of GDX-FOR blocks.
   * @param {Runtime} runtime - the Scratch 3.0 runtime.
   */
  constructor(runtime) {
    /**
     * The Scratch 3.0 runtime.
     * @type {Runtime}
     */
    this.runtime = runtime;

    // Create a new GdxFor peripheral instance
    this._peripheral = new GdxFor(this.runtime, Scratch3GdxForBlocks.EXTENSION_ID);
  }

  /**
   * @returns {object} metadata for this extension and its blocks.
   */
  getInfo() {
    return {
      id: Scratch3GdxForBlocks.EXTENSION_ID,
      name: Scratch3GdxForBlocks.EXTENSION_NAME,
      blockIconURI: blockIconURI,
      menuIconURI: menuIconURI,
      showStatusButton: true,
      blocks: [{
        opcode: 'whenGesture',
        text: formatMessage({
          id: 'gdxfor.whenGesture',
          default: 'when [GESTURE]',
          description: 'when the sensor detects a gesture'
        }),
        blockType: BlockType.HAT,
        arguments: {
          GESTURE: {
            type: ArgumentType.STRING,
            menu: 'gestureOptions',
            defaultValue: GestureValues.SHAKEN
          }
        }
      }, {
        opcode: 'whenForcePushedOrPulled',
        text: formatMessage({
          id: 'gdxfor.whenForcePushedOrPulled',
          default: 'when force sensor [PUSH_PULL]',
          description: 'when the force sensor is pushed or pulled'
        }),
        blockType: BlockType.HAT,
        arguments: {
          PUSH_PULL: {
            type: ArgumentType.STRING,
            menu: 'pushPullOptions',
            defaultValue: PushPullValues.PUSHED
          }
        }
      }, {
        opcode: 'getForce',
        text: formatMessage({
          id: 'gdxfor.getForce',
          default: 'force',
          description: 'gets force'
        }),
        blockType: BlockType.REPORTER
      }, '---', {
        opcode: 'whenTilted',
        text: formatMessage({
          id: 'gdxfor.whenTilted',
          default: 'when tilted [TILT]',
          description: 'when the sensor detects tilt'
        }),
        blockType: BlockType.HAT,
        arguments: {
          TILT: {
            type: ArgumentType.STRING,
            menu: 'tiltAnyOptions',
            defaultValue: TiltAxisValues.ANY
          }
        }
      }, {
        opcode: 'isTilted',
        text: formatMessage({
          id: 'gdxfor.isTilted',
          default: 'tilted [TILT]?',
          description: 'is the device tilted?'
        }),
        blockType: BlockType.BOOLEAN,
        arguments: {
          TILT: {
            type: ArgumentType.STRING,
            menu: 'tiltAnyOptions',
            defaultValue: TiltAxisValues.ANY
          }
        }
      }, {
        opcode: 'getTilt',
        text: formatMessage({
          id: 'gdxfor.getTilt',
          default: 'tilt angle [TILT]',
          description: 'gets tilt'
        }),
        blockType: BlockType.REPORTER,
        arguments: {
          TILT: {
            type: ArgumentType.STRING,
            menu: 'tiltOptions',
            defaultValue: TiltAxisValues.FRONT
          }
        }
      }, '---', {
        opcode: 'isFreeFalling',
        text: formatMessage({
          id: 'gdxfor.isFreeFalling',
          default: 'falling?',
          description: 'is the device in free fall?'
        }),
        blockType: BlockType.BOOLEAN
      }, {
        opcode: 'getSpinSpeed',
        text: formatMessage({
          id: 'gdxfor.getSpin',
          default: 'spin speed [DIRECTION]',
          description: 'gets spin speed'
        }),
        blockType: BlockType.REPORTER,
        arguments: {
          DIRECTION: {
            type: ArgumentType.STRING,
            menu: 'axisOptions',
            defaultValue: AxisValues.Z
          }
        }
      }, {
        opcode: 'getAcceleration',
        text: formatMessage({
          id: 'gdxfor.getAcceleration',
          default: 'acceleration [DIRECTION]',
          description: 'gets acceleration'
        }),
        blockType: BlockType.REPORTER,
        arguments: {
          DIRECTION: {
            type: ArgumentType.STRING,
            menu: 'axisOptions',
            defaultValue: AxisValues.X
          }
        }
      }],
      menus: {
        pushPullOptions: {
          acceptReporters: true,
          items: this.PUSH_PULL_MENU
        },
        gestureOptions: {
          acceptReporters: true,
          items: this.GESTURE_MENU
        },
        axisOptions: {
          acceptReporters: true,
          items: this.AXIS_MENU
        },
        tiltOptions: {
          acceptReporters: true,
          items: this.TILT_MENU
        },
        tiltAnyOptions: {
          acceptReporters: true,
          items: this.TILT_MENU_ANY
        }
      }
    };
  }
  whenForcePushedOrPulled(args) {
    switch (args.PUSH_PULL) {
      case PushPullValues.PUSHED:
        return this._peripheral.getForce() < FORCE_THRESHOLD * -1;
      case PushPullValues.PULLED:
        return this._peripheral.getForce() > FORCE_THRESHOLD;
      default:
        log.warn("unknown push/pull value in whenForcePushedOrPulled: ".concat(args.PUSH_PULL));
        return false;
    }
  }
  getForce() {
    return Math.round(this._peripheral.getForce());
  }
  whenGesture(args) {
    switch (args.GESTURE) {
      case GestureValues.SHAKEN:
        return this.gestureMagnitude() > SHAKEN_THRESHOLD;
      case GestureValues.STARTED_FALLING:
        return this.isFreeFalling();
      case GestureValues.TURNED_FACE_UP:
        return this._isFacing(GestureValues.TURNED_FACE_UP);
      case GestureValues.TURNED_FACE_DOWN:
        return this._isFacing(GestureValues.TURNED_FACE_DOWN);
      default:
        log.warn("unknown gesture value in whenGesture: ".concat(args.GESTURE));
        return false;
    }
  }
  _isFacing(direction) {
    if (typeof this._facingUp === 'undefined') {
      this._facingUp = false;
    }
    if (typeof this._facingDown === 'undefined') {
      this._facingDown = false;
    }

    // If the sensor is already facing up or down, reduce the threshold.
    // This prevents small fluctations in acceleration while it is being
    // turned from causing the hat block to trigger multiple times.
    let threshold = FACING_THRESHOLD;
    if (this._facingUp || this._facingDown) {
      threshold -= FACING_THRESHOLD_OFFSET;
    }
    this._facingUp = this._peripheral.getAccelerationZ() > threshold;
    this._facingDown = this._peripheral.getAccelerationZ() < threshold * -1;
    switch (direction) {
      case GestureValues.TURNED_FACE_UP:
        return this._facingUp;
      case GestureValues.TURNED_FACE_DOWN:
        return this._facingDown;
      default:
        return false;
    }
  }
  whenTilted(args) {
    return this._isTilted(args.TILT);
  }
  isTilted(args) {
    return this._isTilted(args.TILT);
  }
  getTilt(args) {
    return this._getTiltAngle(args.TILT);
  }
  _isTilted(direction) {
    switch (direction) {
      case TiltAxisValues.ANY:
        return this._getTiltAngle(TiltAxisValues.FRONT) > TILT_THRESHOLD || this._getTiltAngle(TiltAxisValues.BACK) > TILT_THRESHOLD || this._getTiltAngle(TiltAxisValues.LEFT) > TILT_THRESHOLD || this._getTiltAngle(TiltAxisValues.RIGHT) > TILT_THRESHOLD;
      default:
        return this._getTiltAngle(direction) > TILT_THRESHOLD;
    }
  }
  _getTiltAngle(direction) {
    // Tilt values are calculated using acceleration due to gravity,
    // so we need to return 0 when the peripheral is not connected.
    if (!this._peripheral.isConnected()) {
      return 0;
    }
    switch (direction) {
      case TiltAxisValues.FRONT:
        return Math.round(this._peripheral.getTiltFrontBack(true));
      case TiltAxisValues.BACK:
        return Math.round(this._peripheral.getTiltFrontBack(false));
      case TiltAxisValues.LEFT:
        return Math.round(this._peripheral.getTiltLeftRight(true));
      case TiltAxisValues.RIGHT:
        return Math.round(this._peripheral.getTiltLeftRight(false));
      default:
        log.warn("Unknown direction in getTilt: ".concat(direction));
    }
  }
  getSpinSpeed(args) {
    switch (args.DIRECTION) {
      case AxisValues.X:
        return Math.round(this._peripheral.getSpinSpeedX());
      case AxisValues.Y:
        return Math.round(this._peripheral.getSpinSpeedY());
      case AxisValues.Z:
        return Math.round(this._peripheral.getSpinSpeedZ());
      default:
        log.warn("Unknown direction in getSpinSpeed: ".concat(args.DIRECTION));
    }
  }
  getAcceleration(args) {
    switch (args.DIRECTION) {
      case AxisValues.X:
        return Math.round(this._peripheral.getAccelerationX());
      case AxisValues.Y:
        return Math.round(this._peripheral.getAccelerationY());
      case AxisValues.Z:
        return Math.round(this._peripheral.getAccelerationZ());
      default:
        log.warn("Unknown direction in getAcceleration: ".concat(args.DIRECTION));
    }
  }

  /**
   * @param {number} x - x axis vector
   * @param {number} y - y axis vector
   * @param {number} z - z axis vector
   * @return {number} - the magnitude of a three dimension vector.
   */
  magnitude(x, y, z) {
    return Math.sqrt(x * x + y * y + z * z);
  }
  accelMagnitude() {
    return this.magnitude(this._peripheral.getAccelerationX(), this._peripheral.getAccelerationY(), this._peripheral.getAccelerationZ());
  }
  gestureMagnitude() {
    return this.accelMagnitude() - GRAVITY;
  }
  spinMagnitude() {
    return this.magnitude(this._peripheral.getSpinSpeedX(), this._peripheral.getSpinSpeedY(), this._peripheral.getSpinSpeedZ());
  }
  isFreeFalling() {
    // When the peripheral is not connected, the acceleration magnitude
    // is 0 instead of ~9.8, which ends up calculating as a positive
    // free fall; so we need to return 'false' here to prevent returning 'true'.
    if (!this._peripheral.isConnected()) {
      return false;
    }
    const accelMag = this.accelMagnitude();
    const spinMag = this.spinMagnitude();

    // We want to account for rotation during freefall,
    // so we tack on a an estimated "rotational effect"
    // The FREEFALL_ROTATION_FACTOR const is used to both scale the
    // gyro measurements and convert them to radians/second.
    // So, we compare our accel magnitude against:
    // FREEFALL_THRESHOLD + (some_scaled_magnitude_of_rotation).
    const ffThresh = FREEFALL_THRESHOLD + FREEFALL_ROTATION_FACTOR * spinMag;
    return accelMag < ffThresh;
  }
}
module.exports = Scratch3GdxForBlocks;

/***/ }),

/***/ "./node_modules/scratch-vm/src/extensions/scratch3_gdx_for/scratch-link-device-adapter.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/scratch-vm/src/extensions/scratch3_gdx_for/scratch-link-device-adapter.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Base64Util = __webpack_require__(/*! ../../util/base64-util */ "./node_modules/scratch-vm/src/util/base64-util.js");

/**
 * Adapter class
 */
class ScratchLinkDeviceAdapter {
  constructor(socket, _ref) {
    let service = _ref.service,
      commandChar = _ref.commandChar,
      responseChar = _ref.responseChar;
    this.socket = socket;
    this._service = service;
    this._commandChar = commandChar;
    this._responseChar = responseChar;
    this._onResponse = this._onResponse.bind(this);
    this._deviceOnResponse = null;
  }
  get godirectAdapter() {
    return true;
  }
  writeCommand(commandBuffer) {
    const data = Base64Util.uint8ArrayToBase64(commandBuffer);
    return this.socket.write(this._service, this._commandChar, data, 'base64');
  }
  setup(_ref2) {
    let onResponse = _ref2.onResponse;
    this._deviceOnResponse = onResponse;
    return this.socket.startNotifications(this._service, this._responseChar, this._onResponse);

    // TODO:
    // How do we find out from scratch link if communication closes?
  }
  _onResponse(base64) {
    const array = Base64Util.base64ToUint8Array(base64);
    const response = new DataView(array.buffer);
    return this._deviceOnResponse(response);
  }
}
module.exports = ScratchLinkDeviceAdapter;

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
//# sourceMappingURL=3.js.map