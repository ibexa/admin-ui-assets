"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputTextFieldStateful = exports.InputTextField = void 0;
var _react = _interopRequireWildcard(require("react"));
var _InputTextField = require("./InputTextField.utils");
var _BaseField = require("../../../partials/BaseField");
var _HelperText = require("../../HelperText");
var _InputTextInput = require("../InputTextInput");
var _idsCore = require("@ids-core");
var _withStateValue = require("../../../hoc/withStateValue");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, e) { if ("object" != _typeof(t) || !t) return t; var r; if ("undefined" != typeof Symbol && void 0 !== (r = t[Symbol.toPrimitive])) { var i = r.call(t, e || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === e ? String : Number)(t); }
var InputTextField = exports.InputTextField = function InputTextField(_ref) {
  var _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className,
    helperText = _ref.helperText,
    _ref$helperTextExtra = _ref.helperTextExtra,
    helperTextExtra = _ref$helperTextExtra === void 0 ? {} : _ref$helperTextExtra,
    id = _ref.id,
    _ref$input = _ref.input,
    input = _ref$input === void 0 ? {} : _ref$input,
    label = _ref.label,
    _ref$labelExtra = _ref.labelExtra,
    labelExtra = _ref$labelExtra === void 0 ? {} : _ref$labelExtra,
    name = _ref.name,
    _ref$onChange = _ref.onChange,
    onChange = _ref$onChange === void 0 ? function () {
      return undefined;
    } : _ref$onChange,
    _ref$onValidate = _ref.onValidate,
    onValidate = _ref$onValidate === void 0 ? function () {
      return undefined;
    } : _ref$onValidate,
    _ref$required = _ref.required,
    required = _ref$required === void 0 ? false : _ref$required,
    _ref$value = _ref.value,
    value = _ref$value === void 0 ? '' : _ref$value;
  var componentClassName = (0, _idsCore.createCssClassNames)(_defineProperty({
    'ids-input-text-field': true
  }, className, !!className));
  var validators = (0, _InputTextField.useInitValidators)({
    required: required
  });
  var _useValidateInput = (0, _InputTextField.useValidateInput)({
      validators: validators,
      value: value
    }),
    isValid = _useValidateInput.isValid,
    messages = _useValidateInput.messages;
  var helperTextProps = _objectSpread({
    children: isValid ? helperText : messages.join(', '),
    type: isValid ? _HelperText.HelperTextType.Default : _HelperText.HelperTextType.Error
  }, helperTextExtra);
  var labelProps = _objectSpread({
    children: label,
    error: !isValid,
    htmlFor: id,
    required: required
  }, labelExtra);
  var inputProps = _objectSpread(_objectSpread({}, input), {}, {
    error: !isValid,
    id: id,
    name: name,
    onChange: onChange,
    value: value
  });
  (0, _react.useEffect)(function () {
    onValidate(isValid, messages);
  }, [isValid, messages, onValidate]);
  return /*#__PURE__*/_react["default"].createElement(_BaseField.BaseField, {
    className: componentClassName,
    helperText: helperTextProps,
    label: labelProps,
    type: "input-text"
  }, /*#__PURE__*/_react["default"].createElement(_InputTextInput.InputTextInput, inputProps));
};
var InputTextFieldStateful = exports.InputTextFieldStateful = (0, _withStateValue.withStateValue)(InputTextField);