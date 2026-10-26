"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RadioButtonFieldStateful = exports.RadioButtonField = void 0;
var _react = _interopRequireWildcard(require("react"));
var _BaseChoiceInputField = require("../../../partials/BaseChoiceInputField");
var _RadioButtonInput = require("../RadioButtonInput");
var _idsCore = require("@ids-core");
var _withStateChecked = require("../../../hoc/withStateChecked");
var _excluded = ["className", "inputWrapperClassName", "label", "labelClassName"];
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, e) { if ("object" != _typeof(t) || !t) return t; var r; if ("undefined" != typeof Symbol && void 0 !== (r = t[Symbol.toPrimitive])) { var i = r.call(t, e || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === e ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var RadioButtonField = exports.RadioButtonField = function RadioButtonField(_ref) {
  var _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className,
    _ref$inputWrapperClas = _ref.inputWrapperClassName,
    inputWrapperClassName = _ref$inputWrapperClas === void 0 ? '' : _ref$inputWrapperClas,
    label = _ref.label,
    _ref$labelClassName = _ref.labelClassName,
    labelClassName = _ref$labelClassName === void 0 ? '' : _ref$labelClassName,
    inputProps = _objectWithoutProperties(_ref, _excluded);
  var fieldClassName = (0, _idsCore.createCssClassNames)(_defineProperty({
    'ids-radio-button-field': true
  }, className, !!className));
  var renderInput = (0, _react.useCallback)(function () {
    return /*#__PURE__*/_react["default"].createElement(_RadioButtonInput.RadioButtonInput, inputProps);
  }, [inputProps]);
  return /*#__PURE__*/_react["default"].createElement(_BaseChoiceInputField.BaseChoiceInputField, {
    className: fieldClassName,
    disabled: inputProps.disabled,
    error: inputProps.error,
    id: inputProps.id,
    inputWrapperClassName: inputWrapperClassName,
    labelClassName: labelClassName,
    renderInput: renderInput
  }, label);
};
var RadioButtonFieldStateful = exports.RadioButtonFieldStateful = (0, _withStateChecked.withStateChecked)(RadioButtonField);