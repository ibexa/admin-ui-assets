"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckboxInputStateful = exports.CheckboxInput = void 0;
var _react = _interopRequireDefault(require("react"));
var _BaseChoiceInput = require("../../../partials/BaseChoiceInput");
var _idsCore = require("@ids-core");
var _withStateChecked = require("../../../hoc/withStateChecked");
var _excluded = ["className", "indeterminate"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var CheckboxInput = exports.CheckboxInput = function CheckboxInput(_ref) {
  var _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className,
    _ref$indeterminate = _ref.indeterminate,
    indeterminate = _ref$indeterminate === void 0 ? false : _ref$indeterminate,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var checkboxClassName = (0, _idsCore.createCssClassNames)(_defineProperty({
    'ids-checkbox': true
  }, className, true));
  var inputClassName = (0, _idsCore.createCssClassNames)({
    'ids-input--indeterminate': indeterminate
  });
  return /*#__PURE__*/_react["default"].createElement(_BaseChoiceInput.BaseChoiceInput, _extends({
    className: checkboxClassName,
    inputClassName: inputClassName,
    ref: function ref(node) {
      if (node) {
        node.indeterminate = indeterminate; // eslint-disable-line no-param-reassign
      }
    },
    type: "checkbox"
  }, restProps));
};
var CheckboxInputStateful = exports.CheckboxInputStateful = (0, _withStateChecked.withStateChecked)(CheckboxInput);