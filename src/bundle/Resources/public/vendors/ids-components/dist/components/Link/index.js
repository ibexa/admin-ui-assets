"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _Link = require("./Link");
Object.keys(_Link).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Link[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Link[key];
    }
  });
});
var _Link2 = require("./Link.types");
Object.keys(_Link2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Link2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Link2[key];
    }
  });
});