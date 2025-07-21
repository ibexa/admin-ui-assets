"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGenerateSimpleNumberId = void 0;
var _react = require("react");
var _generators = require("../../../packages/components/src/internal/shared/generators");
var useGenerateSimpleNumberId = exports.useGenerateSimpleNumberId = function useGenerateSimpleNumberId() {
  var isIdAlreadyGenerated = (0, _react.useRef)(false);
  var generatedId = (0, _react.useMemo)(function () {
    return (0, _generators.generateSimpleNumberId)();
  }, [isIdAlreadyGenerated]);
  isIdAlreadyGenerated.current = true;
  return generatedId;
};