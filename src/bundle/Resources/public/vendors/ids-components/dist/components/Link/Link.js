"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Link = void 0;
var _react = _interopRequireDefault(require("react"));
var _Icon = require("../Icon");
var _idsCore = require("@ids-core");
var _Link = require("./Link.types");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var ICON_SIZE_MAPPING = _defineProperty(_defineProperty({}, _Link.LinkSize.Medium, _Icon.IconSize.Small), _Link.LinkSize.Small, _Icon.IconSize.TinySmall);
var Link = exports.Link = function Link(_ref) {
  var onClick = _ref.onClick,
    _ref$children = _ref.children,
    children = _ref$children === void 0 ? null : _ref$children,
    ariaLabel = _ref.ariaLabel,
    _ref$disabled = _ref.disabled,
    disabled = _ref$disabled === void 0 ? false : _ref$disabled,
    href = _ref.href,
    target = _ref.target,
    rel = _ref.rel,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className,
    _ref$extraAria = _ref.extraAria,
    extraAria = _ref$extraAria === void 0 ? {} : _ref$extraAria,
    _ref$title = _ref.title,
    title = _ref$title === void 0 ? '' : _ref$title,
    _ref$variant = _ref.variant,
    variant = _ref$variant === void 0 ? _Link.LinkVariant.Button : _ref$variant,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? _Link.LinkSize.Medium : _ref$size,
    _ref$type = _ref.type,
    type = _ref$type === void 0 ? _Link.LinkType.Tertiary : _ref$type,
    icon = _ref.icon;
  var computedRel = target === '_blank' && !rel ? 'noopener noreferrer' : rel;
  var handleClick = function handleClick(e) {
    if (disabled) {
      e.preventDefault();
      return;
    }
    onClick === null || onClick === void 0 || onClick(e);
  };
  if (variant === _Link.LinkVariant.Text) {
    var _componentClassName = (0, _idsCore.createCssClassNames)(_defineProperty({
      'ids-link': true,
      'ids-link--disabled': disabled
    }, className, !!className));
    return /*#__PURE__*/_react["default"].createElement("a", _extends({
      "aria-label": ariaLabel,
      className: _componentClassName,
      href: href,
      onClick: handleClick,
      rel: computedRel,
      target: target,
      title: title
    }, extraAria), children);
  }
  var iconOnly = !!icon && !children;
  var componentClassName = (0, _idsCore.createCssClassNames)(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({
    'ids-btn': true
  }, "ids-btn--".concat(type), true), "ids-btn--".concat(size), true), 'ids-btn--icon-only', iconOnly), 'ids-link--disabled', disabled), className, !!className));
  var getLinkAriaLabel = function getLinkAriaLabel() {
    if (ariaLabel) {
      return ariaLabel;
    } else if (iconOnly) {
      return icon;
    }
    return typeof children === 'string' ? children : '';
  };
  var renderIcon = function renderIcon() {
    if (icon) {
      var iconSize = ICON_SIZE_MAPPING[size];
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "ids-btn__icon"
      }, /*#__PURE__*/_react["default"].createElement(_Icon.Icon, {
        name: icon,
        size: iconSize
      }));
    }
    return null;
  };
  var renderLabel = function renderLabel() {
    if (!iconOnly) {
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "ids-btn__label"
      }, children);
    }
    return null;
  };
  return /*#__PURE__*/_react["default"].createElement("a", _extends({
    "aria-label": getLinkAriaLabel(),
    className: componentClassName,
    href: href,
    onClick: handleClick,
    rel: computedRel,
    role: "link",
    target: target,
    title: title
  }, extraAria), renderIcon(), renderLabel());
};