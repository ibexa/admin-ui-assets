"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HelperText = void 0;
var _react = _interopRequireDefault(require("react"));
var _Icon = require("../Icon");
var _idsCore = require("@ids-core");
var _HelperText = require("./HelperText.types");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var ICONS_TYPE_MAP = {
  "default": 'info-circle',
  error: 'alert-error'
};
var HelperText = exports.HelperText = function HelperText(_ref) {
  var children = _ref.children,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className,
    _ref$title = _ref.title,
    title = _ref$title === void 0 ? '' : _ref$title,
    _ref$type = _ref.type,
    type = _ref$type === void 0 ? _HelperText.HelperTextType.Default : _ref$type;
  if (!children) {
    return null;
  }
  var componentClassName = (0, _idsCore.createCssClassNames)(_defineProperty(_defineProperty({
    'ids-helper-text': true
  }, "ids-helper-text--".concat(type), !!type), className, !!className));
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: componentClassName,
    title: title
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "ids-helper-text__icon-wrapper"
  }, /*#__PURE__*/_react["default"].createElement(_Icon.Icon, {
    className: "ids-helper-text__icon",
    name: ICONS_TYPE_MAP[type],
    size: _Icon.IconSize.Small
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "ids-helper-text__content-wrapper"
  }, children));
};