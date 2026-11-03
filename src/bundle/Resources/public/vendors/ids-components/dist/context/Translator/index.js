"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _Translator = require("./Translator");
Object.keys(_Translator).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Translator[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Translator[key];
    }
  });
});
var _Translator2 = require("./Translator.types");
Object.keys(_Translator2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Translator2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Translator2[key];
    }
  });
});