"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseDropdown = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Expander = require("../../components/Expander");
var _ItemsContainer = require("./components/ItemsContainer");
var _Translator = require("../../context/Translator");
var _idsCore = require("@ids-core");
var _useKeyEvent = require("../../hooks/useKeyEvent");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var MAX_VISIBLE_ITEMS = 10;
var BaseDropdown = exports.BaseDropdown = function BaseDropdown(_ref) {
  var children = _ref.children,
    _ref$isEmpty = _ref.isEmpty,
    isEmpty = _ref$isEmpty === void 0 ? true : _ref$isEmpty,
    _ref$isItemSelected = _ref.isItemSelected,
    isItemSelected = _ref$isItemSelected === void 0 ? function () {
      return false;
    } : _ref$isItemSelected,
    items = _ref.items,
    _ref$disabled = _ref.disabled,
    disabled = _ref$disabled === void 0 ? false : _ref$disabled,
    _ref$error = _ref.error,
    error = _ref$error === void 0 ? false : _ref$error,
    _ref$filterFunction = _ref.filterFunction,
    filterFunction = _ref$filterFunction === void 0 ? function (item, searchTerm) {
      return item.label.toLowerCase().includes(searchTerm.toLowerCase());
    } : _ref$filterFunction,
    _ref$getItemAttribute = _ref.getItemAttributes,
    getItemAttributes = _ref$getItemAttribute === void 0 ? function () {
      return {};
    } : _ref$getItemAttribute,
    _ref$getNextFocusable = _ref.getNextFocusableItem,
    getNextFocusableItem = _ref$getNextFocusable === void 0 ? function () {
      return null;
    } : _ref$getNextFocusable,
    _ref$maxVisibleItems = _ref.maxVisibleItems,
    maxVisibleItems = _ref$maxVisibleItems === void 0 ? MAX_VISIBLE_ITEMS : _ref$maxVisibleItems,
    _ref$onDropdownItemCl = _ref.onDropdownItemClick,
    onDropdownItemClick = _ref$onDropdownItemCl === void 0 ? function () {
      return undefined;
    } : _ref$onDropdownItemCl,
    renderEmptySelectionInfo = _ref.renderEmptySelectionInfo,
    _ref$renderItem = _ref.renderItem,
    renderItem = _ref$renderItem === void 0 ? function (item) {
      return item.label;
    } : _ref$renderItem,
    _ref$renderSelectedIt = _ref.renderSelectedItems,
    renderSelectedItems = _ref$renderSelectedIt === void 0 ? function () {
      return null;
    } : _ref$renderSelectedIt,
    _ref$renderSource = _ref.renderSource,
    renderSource = _ref$renderSource === void 0 ? function () {
      return null;
    } : _ref$renderSource,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className;
  var Translator = (0, _react.useContext)(_Translator.TranslatorContext);
  var _useState = (0, _react.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    referenceElement = _useState2[0],
    setReferenceElement = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    isOpen = _useState4[0],
    setIsOpen = _useState4[1];
  var dropdownClassName = (0, _idsCore.createCssClassNames)(_defineProperty({
    'ids-dropdown': true,
    'ids-dropdown--disabled': disabled,
    'ids-dropdown--error': error
  }, className, !!className));
  var dropdownWidgetClassName = (0, _idsCore.createCssClassNames)({
    'ids-dropdown__widget ids-input': true,
    'ids-input--disabled': disabled,
    'ids-input--error': error
  });
  var toggleDropdown = function toggleDropdown() {
    setIsOpen(!isOpen);
  };
  var renderSelectionInfo = function renderSelectionInfo() {
    if (children) {
      return children;
    }
    if (isEmpty) {
      if (renderEmptySelectionInfo) {
        return renderEmptySelectionInfo();
      }
      var placeholder = Translator.trans(/*@Desc("Select an item")*/'ids.dropdown.placeholder');
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "ids-dropdown__placeholder"
      }, placeholder);
    }
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "ids-dropdown__selection-info-items"
    }, renderSelectedItems());
  };
  (0, _useKeyEvent.useKeyDown)(['Enter', ' '], function (event) {
    var activeElement = window.document.activeElement;
    if (activeElement === referenceElement) {
      event.preventDefault();
      toggleDropdown();
    }
  }, referenceElement);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: dropdownClassName
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "ids-dropdown__source"
  }, renderSource()), /*#__PURE__*/_react["default"].createElement("div", {
    className: dropdownWidgetClassName,
    onClick: toggleDropdown,
    ref: setReferenceElement,
    role: "button",
    tabIndex: 0
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "ids-dropdown__selection-info"
  }, renderSelectionInfo()), /*#__PURE__*/_react["default"].createElement("div", {
    className: "ids-dropdown__expander"
  }, /*#__PURE__*/_react["default"].createElement(_Expander.Expander, {
    isExpanded: isOpen,
    isFocusable: false,
    onClick: toggleDropdown,
    type: _Expander.ExpanderType.Chevron
  }))), /*#__PURE__*/_react["default"].createElement(_ItemsContainer.ItemsContainer, {
    closeDropdown: function closeDropdown() {
      setIsOpen(false);
    },
    filterFunction: filterFunction,
    getItemAttributes: getItemAttributes,
    getNextFocusableItem: getNextFocusableItem,
    isItemSelected: isItemSelected,
    isOpen: isOpen,
    items: items,
    maxVisibleItems: maxVisibleItems,
    onDropdownItemClick: onDropdownItemClick,
    referenceElement: referenceElement,
    renderItem: renderItem
  }));
};