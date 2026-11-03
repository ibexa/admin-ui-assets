"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGetOrCreateId = void 0;
var _react = require("react");
var useGetOrCreateId = exports.useGetOrCreateId = function useGetOrCreateId(id) {
  var generatedId = (0, _react.useId)();
  return id !== null && id !== void 0 ? id : generatedId;
};