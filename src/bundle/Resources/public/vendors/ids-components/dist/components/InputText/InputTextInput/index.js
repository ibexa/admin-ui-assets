"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _InputTextInput = require("./InputTextInput");
Object.keys(_InputTextInput).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _InputTextInput[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _InputTextInput[key];
    }
  });
});
var _InputTextInput2 = require("./InputTextInput.types");
Object.keys(_InputTextInput2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _InputTextInput2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _InputTextInput2[key];
    }
  });
});