"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Assets = require("../../packages/components/src/context/Assets");
var _cssClass = require("../../packages/components/src/internal/shared/css.class.names");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Icon = function Icon(_ref) {
  var _ref$cssClass = _ref.cssClass,
    cssClass = _ref$cssClass === void 0 ? '' : _ref$cssClass,
    name = _ref.name,
    customPath = _ref.customPath,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 'small' : _ref$size;
  var _useContext = (0, _react.useContext)(_Assets.AssetsContext),
    getIconPath = _useContext.getIconPath;
  var classes = (0, _cssClass.createCssClassNames)(_defineProperty(_defineProperty({
    'ids-icon': true
  }, "ids-icon--".concat(size), true), cssClass, !!cssClass));
  var linkHref = customPath !== null && customPath !== void 0 ? customPath : getIconPath(name);
  return /*#__PURE__*/_react["default"].createElement("svg", {
    "aria-label": name,
    className: classes,
    role: "img"
  }, /*#__PURE__*/_react["default"].createElement("use", {
    xlinkHref: linkHref
  }));
};
var _default = exports["default"] = Icon;