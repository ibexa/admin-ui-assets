"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToggleButtonInputStateful = exports.ToggleButtonInput = void 0;
var _react = _interopRequireWildcard(require("react"));
var _BaseChoiceInput = require("../../../partials/BaseChoiceInput");
var _ChoiceInputLabel = require("../../ChoiceInputLabel");
var _Translator = require("../../../context/Translator");
var _idsCore = require("@ids-core");
var _generators = require("../../../hooks/generators");
var _withStateChecked = require("../../../hoc/withStateChecked");
var _ToggleButtonInput = require("./ToggleButtonInput.types");
var _excluded = ["className", "offLabel", "onLabel", "size", "title"];
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
var ToggleButtonInput = exports.ToggleButtonInput = function ToggleButtonInput(_ref) {
  var _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className,
    offLabel = _ref.offLabel,
    onLabel = _ref.onLabel,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? _ToggleButtonInput.ToggleButtonInputSize.Medium : _ref$size,
    _ref$title = _ref.title,
    title = _ref$title === void 0 ? '' : _ref$title,
    inputProps = _objectWithoutProperties(_ref, _excluded);
  var _inputProps$checked = inputProps.checked,
    checked = _inputProps$checked === void 0 ? false : _inputProps$checked,
    _inputProps$disabled = inputProps.disabled,
    disabled = _inputProps$disabled === void 0 ? false : _inputProps$disabled,
    id = inputProps.id,
    _inputProps$onBlur = inputProps.onBlur,
    onBlur = _inputProps$onBlur === void 0 ? function () {
      return undefined;
    } : _inputProps$onBlur,
    _inputProps$onChange = inputProps.onChange,
    onChange = _inputProps$onChange === void 0 ? function () {
      return undefined;
    } : _inputProps$onChange,
    _inputProps$onFocus = inputProps.onFocus,
    onFocus = _inputProps$onFocus === void 0 ? function () {
      return undefined;
    } : _inputProps$onFocus,
    _inputProps$onInput = inputProps.onInput,
    onInput = _inputProps$onInput === void 0 ? function () {
      return undefined;
    } : _inputProps$onInput;
  var Translator = (0, _react.useContext)(_Translator.TranslatorContext);
  var componentId = (0, _generators.useGetOrCreateId)(id);
  var inputRef = (0, _react.useRef)(null);
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    isFocused = _useState2[0],
    setIsFocused = _useState2[1];
  var toggleClassName = (0, _idsCore.createCssClassNames)(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({
    'ids-toggle': true
  }, "ids-toggle--".concat(size), true), 'ids-toggle--checked', checked), 'ids-toggle--disabled', disabled), 'ids-toggle--focused', isFocused), className, !!className));
  var onTogglerClick = function onTogglerClick() {
    var _inputRef$current;
    (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 || _inputRef$current.focus();
    onChange(!checked);
    onInput(!checked);
  };
  var onInputFocus = function onInputFocus(event) {
    setIsFocused(true);
    onFocus(event);
  };
  var onInputBlur = function onInputBlur(event) {
    setIsFocused(false);
    onBlur(event);
  };
  var getLabel = function getLabel() {
    var defaultOnLabel = Translator.trans(/*@Desc("On")*/'ids.toggle.label.on');
    var defaultOffLabel = Translator.trans(/*@Desc("Off")*/'ids.toggle.label.off');
    if (checked) {
      return onLabel !== null && onLabel !== void 0 ? onLabel : defaultOnLabel;
    }
    return offLabel !== null && offLabel !== void 0 ? offLabel : defaultOffLabel;
  };
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: toggleClassName,
    title: title
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "ids-toggle__source"
  }, /*#__PURE__*/_react["default"].createElement(_BaseChoiceInput.BaseChoiceInput, _extends({}, inputProps, {
    id: componentId,
    onBlur: onInputBlur,
    onChange: onChange,
    onFocus: onInputFocus,
    onInput: onInput,
    ref: function ref(node) {
      inputRef.current = node;
      if (typeof inputProps.ref === 'function') {
        inputProps.ref(node);
      } else if (inputProps.ref) {
        inputProps.ref.current = node; // eslint-disable-line no-param-reassign
      }
    },
    type: "checkbox"
  }))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "ids-toggle__widget",
    onClick: onTogglerClick,
    role: "button"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "ids-toggle__indicator"
  })), /*#__PURE__*/_react["default"].createElement(_ChoiceInputLabel.ChoiceInputLabel, {
    className: "ids-toggle__label",
    htmlFor: componentId,
    title: title
  }, getLabel()));
};
var ToggleButtonInputStateful = exports.ToggleButtonInputStateful = (0, _withStateChecked.withStateChecked)(ToggleButtonInput);