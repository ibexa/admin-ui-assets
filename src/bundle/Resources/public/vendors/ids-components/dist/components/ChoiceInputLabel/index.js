"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _ChoiceInputLabel = require("./ChoiceInputLabel");
Object.keys(_ChoiceInputLabel).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ChoiceInputLabel[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ChoiceInputLabel[key];
    }
  });
});
var _ChoiceInputLabel2 = require("./ChoiceInputLabel.types");
Object.keys(_ChoiceInputLabel2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ChoiceInputLabel2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ChoiceInputLabel2[key];
    }
  });
});