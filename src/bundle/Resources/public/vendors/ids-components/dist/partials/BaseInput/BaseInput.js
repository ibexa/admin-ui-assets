"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseInput = void 0;
var _react = _interopRequireDefault(require("react"));
var _cssClassNames = require("@ibexa/ids-core/helpers/cssClassNames");
var _generators = require("../../../packages/components/src/hooks/generators");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var BaseInput = exports.BaseInput = function BaseInput(_ref) {
  var name = _ref.name,
    _ref$disabled = _ref.disabled,
    disabled = _ref$disabled === void 0 ? false : _ref$disabled,
    _ref$error = _ref.error,
    error = _ref$error === void 0 ? false : _ref$error,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className,
    _ref$extraInputAttrs = _ref.extraInputAttrs,
    extraInputAttrs = _ref$extraInputAttrs === void 0 ? {} : _ref$extraInputAttrs,
    _ref$id = _ref.id,
    id = _ref$id === void 0 ? undefined : _ref$id,
    ref = _ref.ref,
    _ref$required = _ref.required,
    required = _ref$required === void 0 ? false : _ref$required,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 'medium' : _ref$size,
    _ref$title = _ref.title,
    title = _ref$title === void 0 ? '' : _ref$title,
    _ref$type = _ref.type,
    type = _ref$type === void 0 ? 'text' : _ref$type,
    _ref$value = _ref.value,
    value = _ref$value === void 0 ? '' : _ref$value;
  var componentId = (0, _generators.useGetOrCreateId)(id);
  var componentClassName = (0, _cssClassNames.createCssClassNames)(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({
    'ids-input': true
  }, "ids-input--".concat(type), true), "ids-input--".concat(size), true), 'ids-input--disabled', disabled), 'ids-input--error', error), 'ids-input--required', required), className, !!className));
  return /*#__PURE__*/_react["default"].createElement("input", _extends({
    "aria-invalid": error,
    "aria-required": required,
    className: componentClassName,
    disabled: disabled,
    id: componentId,
    name: name,
    ref: ref,
    title: title,
    type: type,
    value: value
  }, extraInputAttrs));
};