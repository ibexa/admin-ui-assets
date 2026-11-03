"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tag = void 0;
var _react = _interopRequireDefault(require("react"));
var _Icon = require("../Icon");
var _idsCore = require("@ids-core");
var _Tag = require("./Tag.types");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Tag = exports.Tag = function Tag(_ref) {
  var children = _ref.children,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className,
    _ref$isDark = _ref.isDark,
    isDark = _ref$isDark === void 0 ? false : _ref$isDark,
    icon = _ref.icon,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? _Tag.TagSize.Medium : _ref$size,
    type = _ref.type;
  var isGhostType = function isGhostType(tagType) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
    return Object.values(_Tag.TagGhostType).includes(tagType);
  };
  var isGhost = isGhostType(type);
  var componentClassName = (0, _idsCore.createCssClassNames)(_defineProperty(_defineProperty(_defineProperty(_defineProperty({
    'ids-tag': true
  }, "ids-tag--".concat(type), true), "ids-tag--".concat(size), true), "ids-tag--dark", isDark), className, !!className));
  var renderDot = function renderDot() {
    if (isGhost) {
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "ids-tag__ghost-dot"
      });
    }
    return null;
  };
  var renderIcon = function renderIcon() {
    if (icon) {
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "ids-tag__icon"
      }, /*#__PURE__*/_react["default"].createElement(_Icon.Icon, {
        name: icon,
        size: _Icon.IconSize.Small
      }));
    }
    return null;
  };
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: componentClassName
  }, renderDot(), renderIcon(), /*#__PURE__*/_react["default"].createElement("div", {
    className: "ids-tag__content"
  }, children));
};