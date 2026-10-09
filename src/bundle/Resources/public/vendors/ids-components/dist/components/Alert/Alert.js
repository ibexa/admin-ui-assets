"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Alert = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Button = require("../Button");
var _Icon = require("../Icon");
var _Translator = require("../../context/Translator");
var _cssClassNames = require("@ids-core/helpers/cssClassNames");
var _Alert = require("./Alert.types");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var ICONS_TYPE_MAP = _defineProperty(_defineProperty(_defineProperty(_defineProperty({}, _Alert.AlertType.Error, 'alert-error'), _Alert.AlertType.Info, 'info-rounded'), _Alert.AlertType.Success, 'check-circle'), _Alert.AlertType.Warning, 'alert-warning');
var ROLES_TYPE_MAP = _defineProperty(_defineProperty(_defineProperty(_defineProperty({}, _Alert.AlertType.Error, _Alert.AlertRole.Alert), _Alert.AlertType.Info, _Alert.AlertRole.Status), _Alert.AlertType.Success, _Alert.AlertRole.Status), _Alert.AlertType.Warning, _Alert.AlertRole.Alert);
var Alert = exports.Alert = function Alert(_ref) {
  var _ref$actions = _ref.actions,
    actions = _ref$actions === void 0 ? null : _ref$actions,
    _ref$children = _ref.children,
    children = _ref$children === void 0 ? null : _ref$children,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className,
    _ref$icon = _ref.icon,
    icon = _ref$icon === void 0 ? '' : _ref$icon,
    _ref$iconPath = _ref.iconPath,
    iconPath = _ref$iconPath === void 0 ? '' : _ref$iconPath,
    _ref$isDismissible = _ref.isDismissible,
    isDismissible = _ref$isDismissible === void 0 ? false : _ref$isDismissible,
    onDismiss = _ref.onDismiss,
    role = _ref.role,
    _ref$title = _ref.title,
    title = _ref$title === void 0 ? '' : _ref$title,
    type = _ref.type,
    _ref$variant = _ref.variant,
    variant = _ref$variant === void 0 ? _Alert.AlertVariant.Floating : _ref$variant;
  var Translator = (0, _react.useContext)(_Translator.TranslatorContext);
  var closeLabel = Translator.trans(/*@Desc("Close")*/'ibexa.alert.close-btn.label');
  var componentClassName = (0, _cssClassNames.createCssClassNames)(_defineProperty(_defineProperty(_defineProperty({
    'ids-alert': true
  }, "ids-alert--".concat(type), true), "ids-alert--".concat(variant), true), className, !!className));
  var iconName = icon || ICONS_TYPE_MAP[type];
  var iconProps = iconPath ? {
    path: iconPath
  } : {
    name: iconName
  };
  var handleDismissClick = function handleDismissClick(event) {
    onDismiss === null || onDismiss === void 0 || onDismiss(event);
  };
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: componentClassName,
    role: role !== null && role !== void 0 ? role : ROLES_TYPE_MAP[type]
  }, /*#__PURE__*/_react["default"].createElement(_Icon.Icon, _extends({
    className: "ids-alert__icon",
    size: _Icon.IconSize.Small
  }, iconProps)), /*#__PURE__*/_react["default"].createElement("div", {
    className: "ids-alert__content"
  }, title && /*#__PURE__*/_react["default"].createElement("div", {
    className: "ids-alert__title"
  }, title), children && /*#__PURE__*/_react["default"].createElement("div", {
    className: "ids-alert__description"
  }, children), actions && /*#__PURE__*/_react["default"].createElement("div", {
    className: "ids-alert__actions"
  }, actions)), isDismissible && /*#__PURE__*/_react["default"].createElement(_Button.Button, {
    "aria-label": closeLabel,
    className: "ids-alert__close-btn",
    icon: "discard",
    onClick: handleDismissClick,
    size: _Button.ButtonSize.Small,
    type: _Button.ButtonType.TertiaryAlt
  }));
};