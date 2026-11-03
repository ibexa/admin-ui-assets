"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _Icon = require("./Icon");
Object.keys(_Icon).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Icon[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Icon[key];
    }
  });
});
var _Icon2 = require("./Icon.types");
Object.keys(_Icon2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Icon2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Icon2[key];
    }
  });
});