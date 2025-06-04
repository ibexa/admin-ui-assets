"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _cssClass = require("../internal/shared/css.class.names");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Button = function Button(_ref) {
  var _ref$type = _ref.type,
    type = _ref$type === void 0 ? 'primary' : _ref$type,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 'large' : _ref$size,
    ariaLabel = _ref.ariaLabel,
    _ref$extraAria = _ref.extraAria,
    extraAria = _ref$extraAria === void 0 ? {} : _ref$extraAria,
    children = _ref.children,
    _ref$disabled = _ref.disabled,
    disabled = _ref$disabled === void 0 ? false : _ref$disabled,
    _ref$extraClasses = _ref.extraClasses,
    extraClasses = _ref$extraClasses === void 0 ? '' : _ref$extraClasses,
    onClick = _ref.onClick;
  var classes = (0, _cssClass.createCssClassNames)(_defineProperty(_defineProperty(_defineProperty(_defineProperty({
    'ids-btn': true
  }, "ids-btn--".concat(type), !!type), "ids-btn--".concat(size), !!size), 'ids-btn--disabled', disabled), extraClasses, true));
  var btnAriaLabel = ariaLabel !== null && ariaLabel !== void 0 ? ariaLabel : typeof children === 'string' ? children : undefined;
  return /*#__PURE__*/_react["default"].createElement("button", _extends({
    "aria-disabled": disabled,
    "aria-label": btnAriaLabel,
    className: classes,
    disabled: disabled,
    onClick: onClick,
    role: "button",
    type: "button"
  }, extraAria), children);
};
var _default = exports["default"] = Button;