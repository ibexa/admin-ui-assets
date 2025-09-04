"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _cssClass = require("../../packages/components/src/internal/shared/css.class.names");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Label = function Label(_ref) {
  var children = _ref.children,
    htmlFor = _ref.htmlFor,
    _ref$error = _ref.error,
    error = _ref$error === void 0 ? false : _ref$error,
    _ref$extraClasses = _ref.extraClasses,
    extraClasses = _ref$extraClasses === void 0 ? '' : _ref$extraClasses,
    _ref$required = _ref.required,
    required = _ref$required === void 0 ? false : _ref$required,
    _ref$title = _ref.title,
    title = _ref$title === void 0 ? '' : _ref$title;
  var classes = (0, _cssClass.createCssClassNames)(_defineProperty({
    'ids-label': true,
    'ids-label--error': error,
    'ids-label--required': required
  }, extraClasses, !!extraClasses));
  return /*#__PURE__*/_react["default"].createElement("label", {
    className: classes,
    htmlFor: htmlFor,
    title: title
  }, children);
};
var _default = exports["default"] = Label;