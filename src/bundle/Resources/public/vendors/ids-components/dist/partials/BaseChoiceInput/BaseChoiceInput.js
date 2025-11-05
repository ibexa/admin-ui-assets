"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseChoiceInput = void 0;
var _react = _interopRequireDefault(require("react"));
var _BaseInput = require("../BaseInput");
var _idsCore = require("@ids-core");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var BaseChoiceInput = exports.BaseChoiceInput = function BaseChoiceInput(_ref) {
  var name = _ref.name,
    type = _ref.type,
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
    _ref$checked = _ref.checked,
    checked = _ref$checked === void 0 ? false : _ref$checked,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className,
    _ref$disabled = _ref.disabled,
    disabled = _ref$disabled === void 0 ? false : _ref$disabled,
    _ref$error = _ref.error,
    error = _ref$error === void 0 ? false : _ref$error,
    _ref$extraAria = _ref.extraAria,
    extraAria = _ref$extraAria === void 0 ? {} : _ref$extraAria,
    _ref$id = _ref.id,
    id = _ref$id === void 0 ? undefined : _ref$id,
    _ref$inputClassName = _ref.inputClassName,
    inputClassName = _ref$inputClassName === void 0 ? '' : _ref$inputClassName,
    ref = _ref.ref,
    _ref$required = _ref.required,
    required = _ref$required === void 0 ? false : _ref$required,
    _ref$title = _ref.title,
    title = _ref$title === void 0 ? '' : _ref$title,
    _ref$value = _ref.value,
    value = _ref$value === void 0 ? '' : _ref$value;
  var componentClassName = (0, _idsCore.createCssClassNames)(_defineProperty({
    'ids-choice-input': true
  }, className, !!className));
  var componentOnBlur = function componentOnBlur(event) {
    onBlur(event);
  };
  var componentOnChange = function componentOnChange(event) {
    onChange(event.target.checked, event);
  };
  var componentOnFocus = function componentOnFocus(event) {
    onFocus(event);
  };
  var componentOnInput = function componentOnInput(event) {
    onInput(event.target.checked, event);
  };
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: componentClassName
  }, /*#__PURE__*/_react["default"].createElement(_BaseInput.BaseInput, {
    className: inputClassName,
    disabled: disabled,
    error: error,
    extraInputAttrs: _objectSpread({
      checked: checked,
      onBlur: componentOnBlur,
      onChange: componentOnChange,
      onFocus: componentOnFocus,
      onInput: componentOnInput
    }, extraAria),
    id: id,
    name: name,
    ref: ref,
    required: required,
    title: title,
    type: type,
    value: value
  }));
};