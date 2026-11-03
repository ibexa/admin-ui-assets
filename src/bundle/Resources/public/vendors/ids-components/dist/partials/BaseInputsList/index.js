"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _BaseInputsList = require("./BaseInputsList");
Object.keys(_BaseInputsList).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _BaseInputsList[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _BaseInputsList[key];
    }
  });
});
var _BaseInputsList2 = require("./BaseInputsList.types");
Object.keys(_BaseInputsList2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _BaseInputsList2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _BaseInputsList2[key];
    }
  });
});