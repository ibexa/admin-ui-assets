"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _TabsTab = require("./TabsTab");
Object.keys(_TabsTab).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _TabsTab[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _TabsTab[key];
    }
  });
});