"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseInputsList = void 0;
var _react = _interopRequireDefault(require("react"));
var _BaseField = require("../../../packages/components/src/partials/BaseField");
var _cssClassNames = require("@ibexa/ids-core/helpers/cssClassNames");
var _BaseInputsList = require("./BaseInputsList.types");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var BaseInputsList = exports.BaseInputsList = function BaseInputsList(_ref) {
  var items = _ref.items,
    renderItem = _ref.renderItem,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className,
    _ref$direction = _ref.direction,
    direction = _ref$direction === void 0 ? _BaseInputsList.Direction.Vertical : _ref$direction,
    helperTextProps = _ref.helperTextProps,
    labelProps = _ref.labelProps;
  var listClassName = (0, _cssClassNames.createCssClassNames)(_defineProperty(_defineProperty({
    'ids-choice-inputs-list': true
  }, "ids-choice-inputs-list--".concat(direction), true), className, true));
  return /*#__PURE__*/_react["default"].createElement(_BaseField.BaseField, {
    className: listClassName,
    helperText: helperTextProps,
    label: labelProps,
    type: "list"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "ids-choice-inputs-list__items"
  }, items.map(function (item) {
    return renderItem(item);
  })));
};