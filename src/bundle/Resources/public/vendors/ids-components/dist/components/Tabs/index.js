"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _Tabs = require("./Tabs");
Object.keys(_Tabs).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Tabs[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Tabs[key];
    }
  });
});
var _Tabs2 = require("./Tabs.types");
Object.keys(_Tabs2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Tabs2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Tabs2[key];
    }
  });
});