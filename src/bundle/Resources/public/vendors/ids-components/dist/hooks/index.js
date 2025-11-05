"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _generators = require("./generators");
Object.keys(_generators).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _generators[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _generators[key];
    }
  });
});
var _useKeyEvent = require("./useKeyEvent");
Object.keys(_useKeyEvent).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _useKeyEvent[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _useKeyEvent[key];
    }
  });
});