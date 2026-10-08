"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Icon = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Assets = require("../../context/Assets");
var _idsCore = require("@ids-core");
var _Icon = require("./Icon.types");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, e) { if ("object" != _typeof(t) || !t) return t; var r; if ("undefined" != typeof Symbol && void 0 !== (r = t[Symbol.toPrimitive])) { var i = r.call(t, e || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === e ? String : Number)(t); }
var Icon = exports.Icon = function Icon(_ref) {
  var path = _ref.path,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className,
    _ref$name = _ref.name,
    name = _ref$name === void 0 ? '' : _ref$name,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? _Icon.IconSize.Small : _ref$size;
  var _useContext = (0, _react.useContext)(_Assets.AssetsContext),
    getIconPath = _useContext.getIconPath;
  var iconPath = path !== null && path !== void 0 ? path : getIconPath(name);
  var componentClassName = (0, _idsCore.createCssClassNames)(_defineProperty(_defineProperty({
    'ids-icon': true
  }, "ids-icon--".concat(size), true), className, !!className));
  return /*#__PURE__*/_react["default"].createElement("svg", {
    "aria-label": name,
    className: componentClassName,
    role: "img"
  }, /*#__PURE__*/_react["default"].createElement("use", {
    xlinkHref: iconPath
  }));
};