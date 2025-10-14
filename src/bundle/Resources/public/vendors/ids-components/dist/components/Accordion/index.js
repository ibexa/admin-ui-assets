"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _Accordion = require("./Accordion");
Object.keys(_Accordion).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Accordion[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Accordion[key];
    }
  });
});
var _Accordion2 = require("./Accordion.types");
Object.keys(_Accordion2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Accordion2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Accordion2[key];
    }
  });
});