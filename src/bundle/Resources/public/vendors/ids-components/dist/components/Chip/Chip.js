"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Chip = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Button = require("../Button");
var _Translator = require("../../context/Translator");
var _cssClassNames = require("@ids-core/helpers/cssClassNames");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, e) { if ("object" != _typeof(t) || !t) return t; var r; if ("undefined" != typeof Symbol && void 0 !== (r = t[Symbol.toPrimitive])) { var i = r.call(t, e || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === e ? String : Number)(t); }
var Chip = exports.Chip = function Chip(_ref) {
  var children = _ref.children,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className,
    _ref$disabled = _ref.disabled,
    disabled = _ref$disabled === void 0 ? false : _ref$disabled,
    _ref$error = _ref.error,
    error = _ref$error === void 0 ? false : _ref$error,
    _ref$isDeletable = _ref.isDeletable,
    isDeletable = _ref$isDeletable === void 0 ? true : _ref$isDeletable,
    onDelete = _ref.onDelete;
  var Translator = (0, _react.useContext)(_Translator.TranslatorContext);
  var deleteMsg = Translator.trans(/*@Desc("Delete")*/'ibexa.chip.delete-btn.label');
  var componentClassName = (0, _cssClassNames.createCssClassNames)(_defineProperty({
    'ids-chip': true,
    'ids-chip--disabled': disabled,
    'ids-chip--error': error
  }, className, !!className));
  var handleDeleteClick = function handleDeleteClick(event) {
    if (onDelete) {
      onDelete(event);
    }
  };
  var renderDeleteButton = function renderDeleteButton() {
    if (!isDeletable) {
      return null;
    }
    return /*#__PURE__*/_react["default"].createElement(_Button.Button, {
      "aria-label": deleteMsg,
      className: "ids-chip__delete",
      disabled: disabled,
      icon: "discard",
      isFocusable: true,
      onClick: handleDeleteClick,
      size: _Button.ButtonSize.Small,
      type: _Button.ButtonType.TertiaryAlt
    });
  };
  return /*#__PURE__*/_react["default"].createElement("div", {
    "aria-disabled": disabled,
    className: componentClassName,
    tabIndex: disabled ? -1 : 0
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "ids-chip__content"
  }, children), renderDeleteButton());
};