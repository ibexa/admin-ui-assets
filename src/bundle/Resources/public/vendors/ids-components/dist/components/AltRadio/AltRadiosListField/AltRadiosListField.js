"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AltRadiosListFieldStateful = exports.AltRadiosListField = void 0;
var _react = _interopRequireWildcard(require("react"));
var _AltRadioInput = require("../AltRadioInput");
var _BaseInputsList = require("../../../partials/BaseInputsList");
var _HelperText = require("../../HelperText");
var _idsCore = require("@ids-core");
var _withStateValue = require("../../../hoc/withStateValue");
var _AltRadiosListField = require("./AltRadiosListField.types");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, e) { if ("object" != _typeof(t) || !t) return t; var r; if ("undefined" != typeof Symbol && void 0 !== (r = t[Symbol.toPrimitive])) { var i = r.call(t, e || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === e ? String : Number)(t); }
var AltRadiosListField = exports.AltRadiosListField = function AltRadiosListField(_ref) {
  var _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className,
    _ref$direction = _ref.direction,
    direction = _ref$direction === void 0 ? _AltRadiosListField.AltRadiosListFieldDirection.Horizontal : _ref$direction,
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
  var componentClassName = (0, _idsCore.createCssClassNames)(_defineProperty({
    'ids-alt-radio-list-field': true
  }, className, !!className));
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
  var renderItem = (0, _react.useCallback)(function (item) {
    return /*#__PURE__*/_react["default"].createElement(_AltRadioInput.AltRadioInput, _extends({}, item, {
      checked: item.value === value,
      key: item.id,
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
  }, [value, name, _onChange]);
  return /*#__PURE__*/_react["default"].createElement(_BaseInputsList.BaseInputsList, {
    className: componentClassName,
    direction: direction,
    helperTextProps: helperTextProps,
    items: items,
    labelProps: labelProps,
    renderItem: renderItem
  });
};
var AltRadiosListFieldStateful = exports.AltRadiosListFieldStateful = (0, _withStateValue.withStateValue)(AltRadiosListField);