"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RadioButtonsListFieldStateful = exports.RadioButtonsListField = void 0;
var _react = _interopRequireDefault(require("react"));
var _BaseInputsList = require("../../../../packages/components/src/partials/BaseInputsList");
var _HelperText = require("../../../../packages/components/src/components/HelperText");
var _RadioButtonField = require("../RadioButtonField");
var _withStateValue = _interopRequireDefault(require("../../../../packages/components/src/hoc/withStateValue"));
var _RadioButtonsListField = require("./RadioButtonsListField.types");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var RadioButtonsListField = exports.RadioButtonsListField = function RadioButtonsListField(_ref) {
  var _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className,
    _ref$direction = _ref.direction,
    direction = _ref$direction === void 0 ? _RadioButtonsListField.RadioButtonsListFieldDirection.Vertical : _ref$direction,
    helperText = _ref.helperText,
    _ref$helperTextExtra = _ref.helperTextExtra,
    helperTextExtra = _ref$helperTextExtra === void 0 ? {} : _ref$helperTextExtra,
    id = _ref.id,
    items = _ref.items,
    label = _ref.label,
    _ref$labelExtra = _ref.labelExtra,
    labelExtra = _ref$labelExtra === void 0 ? {} : _ref$labelExtra,
    name = _ref.name,
    _ref$onChange = _ref.onChange,
    _onChange = _ref$onChange === void 0 ? function () {
      return undefined;
    } : _ref$onChange,
    _ref$required = _ref.required,
    required = _ref$required === void 0 ? false : _ref$required,
    _ref$value = _ref.value,
    value = _ref$value === void 0 ? '' : _ref$value;
  var helperTextProps = _objectSpread({
    children: helperText,
    type: _HelperText.HelperTextType.Default
  }, helperTextExtra);
  var labelProps = _objectSpread({
    children: label,
    error: false,
    htmlFor: id,
    required: required
  }, labelExtra);
  var renderItem = function renderItem(item) {
    return /*#__PURE__*/_react["default"].createElement(_RadioButtonField.RadioButtonField, _extends({}, item, {
      checked: item.value === value,
      name: name,
      onChange: function onChange() {
        var _item$onChange;
        _onChange(item.value);
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        (_item$onChange = item.onChange) === null || _item$onChange === void 0 || _item$onChange.call.apply(_item$onChange, [item].concat(args));
      }
    }));
  };
  return /*#__PURE__*/_react["default"].createElement(_BaseInputsList.BaseInputsList, {
    className: className,
    direction: direction,
    helperTextProps: helperTextProps,
    items: items,
    labelProps: labelProps,
    renderItem: renderItem
  });
};
var RadioButtonsListFieldStateful = exports.RadioButtonsListFieldStateful = (0, _withStateValue["default"])(RadioButtonsListField);