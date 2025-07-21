"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _BaseInput = _interopRequireDefault(require("../../packages/components/src/internal/partials/BaseInput"));
var _cssClass = require("../../packages/components/src/internal/shared/css.class.names");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Input = function Input(_ref) {
  var name = _ref.name,
    _ref$onBlur = _ref.onBlur,
    onBlur = _ref$onBlur === void 0 ? function () {
      return undefined;
    } : _ref$onBlur,
    _ref$onChange = _ref.onChange,
    onChange = _ref$onChange === void 0 ? function () {
      return undefined;
    } : _ref$onChange,
    _ref$onFocus = _ref.onFocus,
    onFocus = _ref$onFocus === void 0 ? function () {
      return undefined;
    } : _ref$onFocus,
    _ref$onInput = _ref.onInput,
    onInput = _ref$onInput === void 0 ? function () {
      return undefined;
    } : _ref$onInput,
    _ref$disabled = _ref.disabled,
    disabled = _ref$disabled === void 0 ? false : _ref$disabled,
    _ref$error = _ref.error,
    error = _ref$error === void 0 ? false : _ref$error,
    _ref$extraAria = _ref.extraAria,
    extraAria = _ref$extraAria === void 0 ? {} : _ref$extraAria,
    _ref$extraClasses = _ref.extraClasses,
    extraClasses = _ref$extraClasses === void 0 ? '' : _ref$extraClasses,
    _ref$id = _ref.id,
    id = _ref$id === void 0 ? undefined : _ref$id,
    _ref$placeholder = _ref.placeholder,
    placeholder = _ref$placeholder === void 0 ? '' : _ref$placeholder,
    _ref$readOnly = _ref.readOnly,
    readOnly = _ref$readOnly === void 0 ? false : _ref$readOnly,
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
  var componentExtraClasses = (0, _cssClass.createCssClassNames)(_defineProperty({}, extraClasses, true));
  var componentOnBlur = function componentOnBlur(event) {
    onBlur(event);
  };
  var componentOnChange = function componentOnChange(event) {
    onChange(event.target.value, event);
  };
  var componentOnFocus = function componentOnFocus(event) {
    onFocus(event);
  };
  var componentOnInput = function componentOnInput(event) {
    onInput(event.target.value, event);
  };
  return /*#__PURE__*/_react["default"].createElement(_BaseInput["default"], {
    disabled: disabled,
    error: error,
    extraClasses: componentExtraClasses,
    extraInputAttrs: _objectSpread({
      onBlur: componentOnBlur,
      onChange: componentOnChange,
      onFocus: componentOnFocus,
      onInput: componentOnInput,
      placeholder: placeholder,
      readOnly: readOnly
    }, extraAria),
    id: id,
    name: name,
    required: required,
    size: size,
    title: title,
    type: type,
    value: value
  });
};
var _default = exports["default"] = Input;