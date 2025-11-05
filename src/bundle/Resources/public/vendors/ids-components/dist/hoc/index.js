"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _withStateChecked = require("./withStateChecked");
Object.keys(_withStateChecked).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _withStateChecked[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _withStateChecked[key];
    }
  });
});
var _withStateValue = require("./withStateValue");
Object.keys(_withStateValue).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _withStateValue[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _withStateValue[key];
    }
  });
});