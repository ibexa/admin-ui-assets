"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _Button = require("./Button");
Object.keys(_Button).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Button[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Button[key];
    }
  });
});
var _Button2 = require("./Button.types");
Object.keys(_Button2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Button2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Button2[key];
    }
  });
});