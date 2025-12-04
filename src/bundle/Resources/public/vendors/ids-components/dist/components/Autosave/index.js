"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _Autosave = require("./Autosave");
Object.keys(_Autosave).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Autosave[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Autosave[key];
    }
  });
});
var _Autosave2 = require("./Autosave.types");
Object.keys(_Autosave2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Autosave2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Autosave2[key];
    }
  });
});