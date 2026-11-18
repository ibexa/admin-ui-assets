"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChipDropdownStateful = exports.ChipDropdown = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Expander = require("../Expander");
var _focus = require("../Dropdown/utils/focus");
var _Icon = require("../Icon");
var _BaseDropdown = require("../../partials/BaseDropdown");
var _ItemsContainer = require("../../partials/BaseDropdown/components/ItemsContainer");
var _idsCore = require("@ids-core");
var _useKeyEvent = require("../../hooks/useKeyEvent");
var _withStateValue = require("../../hoc/withStateValue");
var _ChipDropdown = require("./ChipDropdown.types");
var _excluded = ["name", "className", "disabled", "icon", "items", "label", "onChange", "size", "value"];
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, e) { if ("object" != _typeof(t) || !t) return t; var r; if ("undefined" != typeof Symbol && void 0 !== (r = t[Symbol.toPrimitive])) { var i = r.call(t, e || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === e ? String : Number)(t); }
var MAX_VISIBLE_ITEMS = 10;
var ICON_SIZE_MAPPING = _defineProperty(_defineProperty({}, _ChipDropdown.ChipDropdownSize.Medium, _Icon.IconSize.TinySmall), _ChipDropdown.ChipDropdownSize.Small, _Icon.IconSize.Tiny);
var ChipDropdown = exports.ChipDropdown = function ChipDropdown(_ref) {
  var _flattenDropdownItems, _selectedItem$label;
  var name = _ref.name,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className,
    _ref$disabled = _ref.disabled,
    disabled = _ref$disabled === void 0 ? false : _ref$disabled,
    _ref$icon = _ref.icon,
    icon = _ref$icon === void 0 ? '' : _ref$icon,
    _ref$items = _ref.items,
    items = _ref$items === void 0 ? [] : _ref$items,
    _ref$label = _ref.label,
    label = _ref$label === void 0 ? '' : _ref$label,
    _ref$onChange = _ref.onChange,
    onChange = _ref$onChange === void 0 ? function () {
      return undefined;
    } : _ref$onChange,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? _ChipDropdown.ChipDropdownSize.Medium : _ref$size,
    _ref$value = _ref.value,
    value = _ref$value === void 0 ? '' : _ref$value,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var panelId = (0, _react.useId)();
  var _useState = (0, _react.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    referenceElement = _useState2[0],
    setReferenceElement = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    isOpen = _useState4[0],
    setIsOpen = _useState4[1];
  var selectedItem = (_flattenDropdownItems = (0, _BaseDropdown.flattenDropdownItems)(items).find(function (item) {
    return item.id === value;
  })) !== null && _flattenDropdownItems !== void 0 ? _flattenDropdownItems : null;
  var rootClassName = (0, _idsCore.createCssClassNames)(_defineProperty(_defineProperty(_defineProperty({
    'ids-dropdown': true,
    'ids-dropdown--chip': true
  }, "ids-dropdown--chip-".concat(size), true), 'ids-dropdown--disabled', disabled), className, !!className));
  var toggleDropdown = function toggleDropdown() {
    if (disabled) {
      return;
    }
    setIsOpen(!isOpen);
  };
  var isItemSelected = function isItemSelected(item) {
    return item.id === value;
  };
  var renderItem = function renderItem(item) {
    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("span", {
      className: "ids-dropdown__item-label"
    }, item.label), isItemSelected(item) && /*#__PURE__*/_react["default"].createElement("span", {
      "aria-hidden": "true",
      className: "ids-dropdown__item-check"
    }, /*#__PURE__*/_react["default"].createElement(_Icon.Icon, {
      name: "form-check",
      size: _Icon.IconSize.TinySmall
    })));
  };
  var renderOption = function renderOption(item) {
    return /*#__PURE__*/_react["default"].createElement("option", {
      key: item.id,
      value: item.id
    }, item.label);
  };
  var renderOptionGroup = function renderOptionGroup(group, index) {
    var _group$id;
    return /*#__PURE__*/_react["default"].createElement("optgroup", {
      key: "group-".concat((_group$id = group.id) !== null && _group$id !== void 0 ? _group$id : index.toString()),
      label: group.label
    }, (0, _BaseDropdown.flattenDropdownItems)(group.items).map(renderOption));
  };
  var getFocusableElements = function getFocusableElements(_ref2) {
    var itemsList = _ref2.itemsList;
    return Array.from(itemsList.querySelectorAll('.ids-dropdown__item:not(.ids-dropdown__item--selected)'));
  };
  (0, _useKeyEvent.useKeyDown)(['Enter', ' '], function (event) {
    if (window.document.activeElement === referenceElement) {
      event.preventDefault();
      toggleDropdown();
    }
  }, referenceElement);
  return /*#__PURE__*/_react["default"].createElement("div", _extends({
    className: rootClassName
  }, restProps), /*#__PURE__*/_react["default"].createElement("div", {
    className: "ids-dropdown__source"
  }, /*#__PURE__*/_react["default"].createElement("select", {
    defaultValue: value,
    disabled: disabled,
    name: name,
    tabIndex: -1
  }, items.map(function (entry, index) {
    return (0, _BaseDropdown.isDropdownItemGroup)(entry) ? renderOptionGroup(entry, index) : renderOption(entry);
  }))), /*#__PURE__*/_react["default"].createElement("div", {
    "aria-controls": panelId,
    "aria-disabled": disabled || undefined,
    "aria-expanded": isOpen,
    className: "ids-dropdown__widget",
    onClick: toggleDropdown,
    ref: setReferenceElement,
    role: "button",
    tabIndex: disabled ? -1 : 0
  }, icon && /*#__PURE__*/_react["default"].createElement("span", {
    "aria-hidden": "true",
    className: "ids-dropdown__icon"
  }, /*#__PURE__*/_react["default"].createElement(_Icon.Icon, {
    name: icon,
    size: ICON_SIZE_MAPPING[size]
  })), label && /*#__PURE__*/_react["default"].createElement("div", {
    className: "ids-dropdown__label"
  }, label), /*#__PURE__*/_react["default"].createElement("div", {
    className: "ids-dropdown__selection-info"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "ids-dropdown__selection-info-items"
  }, (_selectedItem$label = selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.label) !== null && _selectedItem$label !== void 0 ? _selectedItem$label : '')), /*#__PURE__*/_react["default"].createElement("div", {
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
    containerAttributes: {
      id: panelId
    },
    filterFunction: function filterFunction(item, searchTerm) {
      return item.label.toLowerCase().includes(searchTerm.toLowerCase());
    },
    getItemAttributes: function getItemAttributes() {
      return {};
    },
    getNextFocusableItem: _focus.getNextFocusableItem.bind(null, getFocusableElements),
    hasSearch: false,
    isItemSelected: isItemSelected,
    isOpen: isOpen,
    items: items,
    maxVisibleItems: MAX_VISIBLE_ITEMS,
    onDropdownItemClick: function onDropdownItemClick(item, _ref3) {
      var closeDropdown = _ref3.closeDropdown;
      onChange(item.id);
      closeDropdown();
    },
    referenceElement: referenceElement,
    renderItem: renderItem
  }));
};
var ChipDropdownStateful = exports.ChipDropdownStateful = (0, _withStateValue.withStateValue)(ChipDropdown);