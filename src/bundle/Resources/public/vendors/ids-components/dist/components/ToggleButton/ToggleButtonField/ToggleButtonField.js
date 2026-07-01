"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToggleButtonFieldStateful = exports.ToggleButtonField = void 0;
var _react = _interopRequireDefault(require("react"));
var _BaseField = require("../../../partials/BaseField");
var _HelperText = require("../../HelperText");
var _ToggleButtonInput = require("../ToggleButtonInput");
var _idsCore = require("@ids-core");
var _withStateChecked = require("../../../hoc/withStateChecked");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var ToggleButtonField = exports.ToggleButtonField = function ToggleButtonField(_ref) {
  var _ref$checked = _ref.checked,
    checked = _ref$checked === void 0 ? false : _ref$checked,
    _ref$className = _ref.className,
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
    _ref$required = _ref.required,
    required = _ref$required === void 0 ? false : _ref$required;
  var toggleClassName = (0, _idsCore.createCssClassNames)(_defineProperty({
    'ids-toggle-field': true
  }, className, !!className));
  var helperTextProps = _objectSpread({
    children: helperText,
    type: _HelperText.HelperTextType.Default
  }, helperTextExtra);
  var labelProps = _objectSpread({
    children: label,
    required: required
  }, labelExtra);
  var inputProps = _objectSpread(_objectSpread({}, input), {}, {
    checked: checked,
    id: id,
    name: name,
    onChange: onChange
  });
  return /*#__PURE__*/_react["default"].createElement(_BaseField.BaseField, {
    className: toggleClassName,
    helperText: helperTextProps,
    label: labelProps,
    type: "toggle"
  }, /*#__PURE__*/_react["default"].createElement(_ToggleButtonInput.ToggleButtonInput, inputProps));
};
var ToggleButtonFieldStateful = exports.ToggleButtonFieldStateful = (0, _withStateChecked.withStateChecked)(ToggleButtonField);