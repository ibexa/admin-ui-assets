"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AssetsProvider = exports.AssetsContext = void 0;
var _react = _interopRequireWildcard(require("react"));
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
var AssetsContext = exports.AssetsContext = /*#__PURE__*/(0, _react.createContext)({
  getIconPath: function getIconPath() {
    return '';
  }
});
var AssetsProvider = exports.AssetsProvider = function AssetsProvider(_ref) {
  var children = _ref.children,
    value = _ref.value;
  return /*#__PURE__*/_react["default"].createElement(AssetsContext.Provider, {
    value: value
  }, children);
};