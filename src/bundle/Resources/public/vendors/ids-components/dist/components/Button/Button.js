"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Button = void 0;
var _react = _interopRequireDefault(require("react"));
var _Icon = require("../Icon");
var _idsCore = require("@ids-core");
var _Button = require("./Button.types");
var _excluded = ["onClick", "children", "ariaLabel", "disabled", "extraAria", "className", "icon", "iconUrl", "isFocusable", "ref", "size", "title", "type", "iconPosition"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var ICON_SIZE_MAPPING = _defineProperty(_defineProperty({}, _Button.ButtonSize.Medium, _Icon.IconSize.Small), _Button.ButtonSize.Small, _Icon.IconSize.TinySmall);
var Button = exports.Button = function Button(_ref) {
  var onClick = _ref.onClick,
    _ref$children = _ref.children,
    children = _ref$children === void 0 ? null : _ref$children,
    ariaLabel = _ref.ariaLabel,
    _ref$disabled = _ref.disabled,
    disabled = _ref$disabled === void 0 ? false : _ref$disabled,
    _ref$extraAria = _ref.extraAria,
    extraAria = _ref$extraAria === void 0 ? {} : _ref$extraAria,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className,
    icon = _ref.icon,
    iconUrl = _ref.iconUrl,
    _ref$isFocusable = _ref.isFocusable,
    isFocusable = _ref$isFocusable === void 0 ? true : _ref$isFocusable,
    _ref$ref = _ref.ref,
    ref = _ref$ref === void 0 ? null : _ref$ref,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? _Button.ButtonSize.Medium : _ref$size,
    _ref$title = _ref.title,
    title = _ref$title === void 0 ? '' : _ref$title,
    _ref$type = _ref.type,
    type = _ref$type === void 0 ? _Button.ButtonType.Primary : _ref$type,
    _ref$iconPosition = _ref.iconPosition,
    iconPosition = _ref$iconPosition === void 0 ? _Button.IconPosition.Start : _ref$iconPosition,
    nativeButtonProps = _objectWithoutProperties(_ref, _excluded);
  var hasIcon = !!icon || !!iconUrl;
  var iconOnly = hasIcon && !children;
  var componentClassName = (0, _idsCore.createCssClassNames)(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({
    'ids-btn': true
  }, "ids-btn--".concat(type), true), "ids-btn--".concat(size), true), 'ids-btn--disabled', disabled), 'ids-btn--icon-only', iconOnly), className, !!className));
  var getBtnAriaLabel = function getBtnAriaLabel() {
    if (ariaLabel) {
      return ariaLabel;
    } else if (iconOnly) {
      if (iconUrl !== undefined) {
        return iconUrl;
      }
      return icon;
    }
    return typeof children === 'string' ? children : '';
  };
  var renderIcon = function renderIcon() {
    if (iconUrl) {
      var iconSize = ICON_SIZE_MAPPING[size];
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "ids-btn__icon"
      }, /*#__PURE__*/_react["default"].createElement(_Icon.Icon, {
        path: iconUrl,
        size: iconSize
      }));
    }
    if (icon) {
      var _iconSize = ICON_SIZE_MAPPING[size];
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "ids-btn__icon"
      }, /*#__PURE__*/_react["default"].createElement(_Icon.Icon, {
        name: icon,
        size: _iconSize
      }));
    }
    return null;
  };
  var renderLabel = function renderLabel() {
    if (!iconOnly) {
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "ids-btn__label"
      }, children);
    }
    return null;
  };
  var isIconEnd = iconPosition === _Button.IconPosition.End;
  return /*#__PURE__*/_react["default"].createElement("button", _extends({}, nativeButtonProps, {
    "aria-disabled": disabled,
    "aria-label": getBtnAriaLabel(),
    className: componentClassName,
    disabled: disabled,
    onClick: onClick,
    ref: ref,
    role: "button",
    tabIndex: isFocusable && !disabled ? 0 : -1,
    title: title,
    type: "button"
  }, extraAria), !isIconEnd && renderIcon(), renderLabel(), isIconEnd && renderIcon());
};