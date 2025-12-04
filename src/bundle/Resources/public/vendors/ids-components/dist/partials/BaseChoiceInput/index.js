"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _BaseChoiceInput = require("./BaseChoiceInput");
Object.keys(_BaseChoiceInput).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _BaseChoiceInput[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _BaseChoiceInput[key];
    }
  });
});
var _BaseChoiceInput2 = require("./BaseChoiceInput.types");
Object.keys(_BaseChoiceInput2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _BaseChoiceInput2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _BaseChoiceInput2[key];
    }
  });
});