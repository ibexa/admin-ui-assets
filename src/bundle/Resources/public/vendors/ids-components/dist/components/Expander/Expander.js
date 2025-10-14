"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Expander = void 0;
var _react = _interopRequireDefault(require("react"));
var _Button = require("../../../packages/components/src/components/Button");
var _Icon = require("../../../packages/components/src/components/Icon");
var _cssClassNames = require("@ibexa/ids-core/helpers/cssClassNames");
var _Expander = require("./Expander.types");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var ICONS_MAP = _defineProperty(_defineProperty({}, _Expander.ExpanderType.caret, 'arrow-caret-down'), _Expander.ExpanderType.chevron, 'arrow-chevron-down');
var Expander = exports.Expander = function Expander(_ref) {
  var _onClick = _ref.onClick,
    type = _ref.type,
    _ref$collapseLabel = _ref.collapseLabel,
    collapseLabel = _ref$collapseLabel === void 0 ? '' : _ref$collapseLabel,
    _ref$expandLabel = _ref.expandLabel,
    expandLabel = _ref$expandLabel === void 0 ? '' : _ref$expandLabel,
    _ref$hasIcon = _ref.hasIcon,
    hasIcon = _ref$hasIcon === void 0 ? true : _ref$hasIcon,
    _ref$isExpanded = _ref.isExpanded,
    isExpanded = _ref$isExpanded === void 0 ? false : _ref$isExpanded;
  var label = isExpanded ? collapseLabel : expandLabel;
  var componentClassName = (0, _cssClassNames.createCssClassNames)({
    'ids-expander': true,
    'ids-expander--has-icon': hasIcon,
    'ids-expander--has-label': label !== '',
    'ids-expander--is-expanded': isExpanded
  });
  var extraAria = {
    'aria-expanded': isExpanded
  };
  var renderExpanderIcon = function renderExpanderIcon() {
    if (!hasIcon) {
      return null;
    }
    return /*#__PURE__*/_react["default"].createElement(_Icon.Icon, {
      name: ICONS_MAP[type],
      size: _Icon.IconSize.Small
    });
  };
  return /*#__PURE__*/_react["default"].createElement(_Button.Button, {
    ariaLabel: label,
    className: componentClassName,
    extraAria: extraAria,
    onClick: function onClick() {
      _onClick(!isExpanded);
    },
    size: _Button.ButtonSize.Small,
    type: _Button.ButtonType.TertiaryAlt
  }, label, renderExpanderIcon());
};