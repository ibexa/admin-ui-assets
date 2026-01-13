"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AltRadioInputStateful = exports.AltRadioInput = void 0;
var _react = _interopRequireWildcard(require("react"));
var _BaseChoiceInput = require("../../../partials/BaseChoiceInput");
var _idsCore = require("@ids-core");
var _withStateChecked = require("../../../hoc/withStateChecked");
var _excluded = ["className", "label", "tileClassName", "title"];
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var AltRadioInput = exports.AltRadioInput = function AltRadioInput(_ref) {
  var _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className,
    label = _ref.label,
    _ref$tileClassName = _ref.tileClassName,
    tileClassName = _ref$tileClassName === void 0 ? '' : _ref$tileClassName,
    _ref$title = _ref.title,
    title = _ref$title === void 0 ? '' : _ref$title,
    inputProps = _objectWithoutProperties(_ref, _excluded);
  var _inputProps$checked = inputProps.checked,
    checked = _inputProps$checked === void 0 ? false : _inputProps$checked,
    _inputProps$disabled = inputProps.disabled,
    disabled = _inputProps$disabled === void 0 ? false : _inputProps$disabled,
    _inputProps$error = inputProps.error,
    error = _inputProps$error === void 0 ? false : _inputProps$error,
    onBlur = inputProps.onBlur,
    onChange = inputProps.onChange,
    onFocus = inputProps.onFocus,
    onInput = inputProps.onInput;
  var inputRef = (0, _react.useRef)(null);
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    isFocused = _useState2[0],
    setIsFocused = _useState2[1];
  var altRadioClassName = (0, _idsCore.createCssClassNames)(_defineProperty({
    'ids-alt-radio': true
  }, className, !!className));
  var altRadioTileClassName = (0, _idsCore.createCssClassNames)(_defineProperty({
    'ids-alt-radio__tile': true,
    'ids-alt-radio__tile--checked': checked,
    'ids-alt-radio__tile--disabled': disabled,
    'ids-alt-radio__tile--error': error,
    'ids-alt-radio__tile--focused': isFocused
  }, tileClassName, !!tileClassName));
  var onTileClick = function onTileClick() {
    var _inputRef$current;
    (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 || _inputRef$current.focus();
    if (!checked) {
      onChange === null || onChange === void 0 || onChange(true);
      onInput === null || onInput === void 0 || onInput(true);
    }
  };
  var onInputFocus = function onInputFocus(event) {
    setIsFocused(true);
    onFocus === null || onFocus === void 0 || onFocus(event);
  };
  var onInputBlur = function onInputBlur(event) {
    setIsFocused(false);
    onBlur === null || onBlur === void 0 || onBlur(event);
  };
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: altRadioClassName,
    title: title
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "ids-alt-radio__source"
  }, /*#__PURE__*/_react["default"].createElement(_BaseChoiceInput.BaseChoiceInput, _extends({}, inputProps, {
    onBlur: onInputBlur,
    onFocus: onInputFocus,
    ref: function ref(node) {
      inputRef.current = node;
      if (typeof inputProps.ref === 'function') {
        inputProps.ref(node);
      } else if (inputProps.ref) {
        inputProps.ref.current = node; // eslint-disable-line no-param-reassign
      }
    },
    type: "radio"
  }))), /*#__PURE__*/_react["default"].createElement("div", {
    className: altRadioTileClassName,
    onClick: onTileClick,
    role: "button"
  }, label));
};
var AltRadioInputStateful = exports.AltRadioInputStateful = (0, _withStateChecked.withStateChecked)(AltRadioInput);