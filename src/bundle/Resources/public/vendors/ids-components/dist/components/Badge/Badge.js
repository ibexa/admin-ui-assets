"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Badge = void 0;
var _react = _interopRequireDefault(require("react"));
var _cssClassNames = require("@ibexa/ids-core/helpers/cssClassNames");
var _Badge = require("./Badge.types");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var MAX_BADGE_VALUE = 99;
var THRESHOLD = _defineProperty(_defineProperty({}, _Badge.BadgeSize.Medium, 100), _Badge.BadgeSize.Small, 10);
var Badge = exports.Badge = function Badge(_ref) {
  var _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? _Badge.BadgeSize.Medium : _ref$size,
    value = _ref.value;
  var isStretched = value >= THRESHOLD[size];
  var componentClassName = (0, _cssClassNames.createCssClassNames)(_defineProperty(_defineProperty(_defineProperty({
    'ids-badge': true
  }, "ids-badge--".concat(size), true), 'ids-badge--stretched', isStretched), className, !!className));
  var formatBadgeValue = function formatBadgeValue(badgeValue) {
    return badgeValue > MAX_BADGE_VALUE ? "".concat(MAX_BADGE_VALUE, "+") : badgeValue.toString();
  };
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: componentClassName
  }, formatBadgeValue(value));
};