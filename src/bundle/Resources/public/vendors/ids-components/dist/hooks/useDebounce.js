"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDebounce = void 0;
var _react = require("react");
var useDebounce = exports.useDebounce = function useDebounce(delay) {
  var timeoutRef = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    return function () {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  });
  return (0, _react.useCallback)(function (callback) {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(function () {
      callback();
    }, delay);
  }, [delay]);
};