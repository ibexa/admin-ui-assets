"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _TabsPanel = require("./TabsPanel");
Object.keys(_TabsPanel).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _TabsPanel[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _TabsPanel[key];
    }
  });
});