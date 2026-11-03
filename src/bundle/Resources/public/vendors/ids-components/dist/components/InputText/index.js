"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _InputTextField = require("./InputTextField");
Object.keys(_InputTextField).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _InputTextField[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _InputTextField[key];
    }
  });
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