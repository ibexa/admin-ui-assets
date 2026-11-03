"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useKeyDown = void 0;
var _react = require("react");
var useKeyDown = exports.useKeyDown = function useKeyDown(key, callback, node) {
  (0, _react.useEffect)(function () {
    var listenerElement = node !== null && node !== void 0 ? node : window;
    var handleKeyDown = function handleKeyDown(event) {
      if (event instanceof KeyboardEvent && key.includes(event.key)) {
        callback(event);
      }
    };
    listenerElement.addEventListener('keydown', handleKeyDown);
    return function () {
      listenerElement.removeEventListener('keydown', handleKeyDown);
    };
  }, [key, callback]);
};