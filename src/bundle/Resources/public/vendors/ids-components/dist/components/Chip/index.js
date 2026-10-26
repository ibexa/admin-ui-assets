"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _Chip = require("./Chip");
Object.keys(_Chip).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Chip[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Chip[key];
    }
  });
});
var _Chip2 = require("./Chip.types");
Object.keys(_Chip2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Chip2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Chip2[key];
    }
  });
});