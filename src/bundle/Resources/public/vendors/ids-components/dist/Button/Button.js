"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _cssClass = require("../../packages/components/src/internal/shared/css.class.names");
var _Icon = _interopRequireDefault(require("../Icon"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var ICON_SIZE_MAPPING = {
  medium: 'small',
  small: 'tiny-small'
};
var Button = function Button(_ref) {
  var onClick = _ref.onClick,
    _ref$children = _ref.children,
    children = _ref$children === void 0 ? null : _ref$children,
    ariaLabel = _ref.ariaLabel,
    _ref$disabled = _ref.disabled,
    disabled = _ref$disabled === void 0 ? false : _ref$disabled,
    _ref$extraAria = _ref.extraAria,
    extraAria = _ref$extraAria === void 0 ? {} : _ref$extraAria,
    _ref$extraClasses = _ref.extraClasses,
    extraClasses = _ref$extraClasses === void 0 ? '' : _ref$extraClasses,
    _ref$icon = _ref.icon,
    icon = _ref$icon === void 0 ? '' : _ref$icon,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 'medium' : _ref$size,
    _ref$title = _ref.title,
    title = _ref$title === void 0 ? '' : _ref$title,
    _ref$type = _ref.type,
    type = _ref$type === void 0 ? 'primary' : _ref$type;
  var isIconOnly = icon !== '' && children === null;
  var classes = (0, _cssClass.createCssClassNames)(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({
    'ids-btn': true
  }, "ids-btn--".concat(type), true), "ids-btn--".concat(size), true), 'ids-btn--disabled', disabled), 'ids-btn--icon-only', isIconOnly), extraClasses, !!extraClasses));
  var getBtnAriaLabel = function getBtnAriaLabel() {
    if (ariaLabel) {
      return ariaLabel;
    } else if (isIconOnly) {
      return icon;
    }
    return typeof children === 'string' ? children : undefined;
  };
  var getIcon = function getIcon() {
    if (icon) {
      var iconSize = ICON_SIZE_MAPPING[size];
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "ids-btn__icon"
      }, /*#__PURE__*/_react["default"].createElement(_Icon["default"], {
        name: icon,
        size: iconSize
      }));
    }
    return null;
  };
  var getTextLabel = function getTextLabel() {
    if (isIconOnly) {
      return null;
    }
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "ids-btn__label"
    }, children);
  };
  return /*#__PURE__*/_react["default"].createElement("button", _extends({
    "aria-disabled": disabled,
    "aria-label": getBtnAriaLabel(),
    className: classes,
    disabled: disabled,
    onClick: onClick,
    role: "button",
    title: title,
    type: "button"
  }, extraAria), getIcon(), getTextLabel());
};
var _default = exports["default"] = Button;