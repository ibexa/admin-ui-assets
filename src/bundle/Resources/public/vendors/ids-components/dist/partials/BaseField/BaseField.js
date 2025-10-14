"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseField = void 0;
var _react = _interopRequireDefault(require("react"));
var _HelperText = require("../../../packages/components/src/components/HelperText");
var _Label = require("../../../packages/components/src/components/Label");
var _cssClassNames = require("@ibexa/ids-core/helpers/cssClassNames");
var _excluded = ["children"],
  _excluded2 = ["children"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var BaseField = exports.BaseField = function BaseField(_ref) {
  var children = _ref.children,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className,
    helperText = _ref.helperText,
    label = _ref.label,
    type = _ref.type;
  var classes = (0, _cssClassNames.createCssClassNames)(_defineProperty(_defineProperty({
    'ids-field': true
  }, "ids-field--".concat(type), true), className, !!className));
  var renderLabel = function renderLabel() {
    if (!label) {
      return null;
    }
    var labelContent = label.children,
      labelProps = _objectWithoutProperties(label, _excluded);
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "ids-field__label-wrapper"
    }, /*#__PURE__*/_react["default"].createElement(_Label.Label, labelProps, labelContent));
  };
  var renderHelperText = function renderHelperText() {
    if (!helperText) {
      return null;
    }
    var helperTextContent = helperText.children,
      helperTextProps = _objectWithoutProperties(helperText, _excluded2);
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "ids-field__helper-text-wrapper"
    }, /*#__PURE__*/_react["default"].createElement(_HelperText.HelperText, helperTextProps, helperTextContent));
  };
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: classes
  }, renderLabel(), /*#__PURE__*/_react["default"].createElement("div", {
    className: "ids-field__source-wrapper"
  }, children), renderHelperText());
};