"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _Assets = require("./Assets");
Object.keys(_Assets).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Assets[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Assets[key];
    }
  });
});
var _Assets2 = require("./Assets.types");
Object.keys(_Assets2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Assets2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Assets2[key];
    }
  });
});