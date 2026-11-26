"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilterDropdownStateful = exports.FilterDropdown = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Button = require("../Button");
var _focus = require("../Dropdown/utils/focus");
var _Icon = require("../Icon");
var _BaseDropdown = require("../../partials/BaseDropdown");
var _Checkbox = require("../Checkbox");
var _ItemsContainer = require("../../partials/BaseDropdown/components/ItemsContainer");
var _Translator = require("../../context/Translator");
var _idsCore = require("@ids-core");
var _withStateValue = require("../../hoc/withStateValue");
var _FilterDropdown = require("./FilterDropdown.types");
var _excluded = ["label", "name", "className", "hasSearch", "items", "onChange", "type", "value"];
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, e) { if ("object" != _typeof(t) || !t) return t; var r; if ("undefined" != typeof Symbol && void 0 !== (r = t[Symbol.toPrimitive])) { var i = r.call(t, e || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === e ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var MAX_VISIBLE_ITEMS = 10;
var PANEL_MIN_WIDTH = 200;
var SINGLE_SELECTION_COUNT = 1;
var FilterDropdown = exports.FilterDropdown = function FilterDropdown(_ref) {
  var label = _ref.label,
    name = _ref.name,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className,
    _ref$hasSearch = _ref.hasSearch,
    hasSearch = _ref$hasSearch === void 0 ? true : _ref$hasSearch,
    _ref$items = _ref.items,
    items = _ref$items === void 0 ? [] : _ref$items,
    _ref$onChange = _ref.onChange,
    onChange = _ref$onChange === void 0 ? function () {
      return undefined;
    } : _ref$onChange,
    _ref$type = _ref.type,
    type = _ref$type === void 0 ? _FilterDropdown.FilterDropdownType.Default : _ref$type,
    _ref$value = _ref.value,
    value = _ref$value === void 0 ? [] : _ref$value,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var Translator = (0, _react.useContext)(_Translator.TranslatorContext);
  var panelId = (0, _react.useId)();
  var _useState = (0, _react.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    referenceElement = _useState2[0],
    setReferenceElement = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    isOpen = _useState4[0],
    setIsOpen = _useState4[1];
  var selectedItems = (0, _BaseDropdown.flattenDropdownItems)(items).filter(function (item) {
    return value.includes(item.id);
  });
  var hasSelection = selectedItems.length > 0;
  var isIconOnly = type === _FilterDropdown.FilterDropdownType.MoreFiltersSmall;
  var hasTriggerIcon = type === _FilterDropdown.FilterDropdownType.MoreFilters || isIconOnly;
  var hasChevron = type === _FilterDropdown.FilterDropdownType.Default || type === _FilterDropdown.FilterDropdownType.Dashboard;
  var showsValue = type === _FilterDropdown.FilterDropdownType.Dashboard && selectedItems.length === SINGLE_SELECTION_COUNT;
  var rootClassName = (0, _idsCore.createCssClassNames)(_defineProperty(_defineProperty(_defineProperty(_defineProperty({
    'ids-dropdown': true,
    'ids-dropdown--filter': true
  }, "ids-dropdown--filter-".concat(type), true), 'ids-dropdown--open', isOpen), 'ids-dropdown--selected', hasSelection), className, !!className));
  (0, _react.useEffect)(function () {
    if (isOpen && !hasSearch) {
      var _document$getElementB;
      (_document$getElementB = document.getElementById(panelId)) === null || _document$getElementB === void 0 || (_document$getElementB = _document$getElementB.querySelector('.ids-dropdown__item .ids-input--checkbox')) === null || _document$getElementB === void 0 || _document$getElementB.focus();
    }
  }, [isOpen, hasSearch, panelId]);
  var toggleDropdown = function toggleDropdown() {
    setIsOpen(!isOpen);
  };
  var changeValue = function changeValue(id) {
    var isSelected = value.includes(id);
    var newValue = isSelected ? value.filter(function (selectedValue) {
      return selectedValue !== id;
    }) : [].concat(_toConsumableArray(value), [id]);
    onChange(newValue, id, isSelected ? _FilterDropdown.FilterDropdownAction.Uncheck : _FilterDropdown.FilterDropdownAction.Check);
  };
  var clearValue = function clearValue(event) {
    var panelNode = event.currentTarget.closest('.ids-dropdown__items-container');
    var firstFocusableNode = panelNode === null || panelNode === void 0 ? void 0 : panelNode.querySelector('.ids-dropdown__search input, .ids-dropdown__item .ids-input--checkbox');
    onChange([], '', _FilterDropdown.FilterDropdownAction.Clear);
    firstFocusableNode === null || firstFocusableNode === void 0 || firstFocusableNode.focus();
  };
  var isItemSelected = function isItemSelected(item) {
    return value.includes(item.id);
  };
  var getItemAttributes = function getItemAttributes() {
    return {
      role: undefined,
      tabIndex: undefined
    };
  };
  var renderItem = function renderItem(item) {
    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_Checkbox.CheckboxInput, {
      checked: isItemSelected(item),
      name: "".concat(name, "-checkbox"),
      value: item.id
    }), /*#__PURE__*/_react["default"].createElement("span", {
      className: "ids-dropdown__item-label"
    }, item.label));
  };
  var renderFooter = function renderFooter() {
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "ids-dropdown__footer"
    }, /*#__PURE__*/_react["default"].createElement("hr", {
      className: "ids-dropdown__divider"
    }), /*#__PURE__*/_react["default"].createElement(_Button.Button, {
      disabled: !hasSelection,
      icon: "discard",
      onClick: clearValue,
      size: _Button.ButtonSize.Small,
      type: _Button.ButtonType.TertiaryAlt
    }, Translator.trans(/*@Desc("Clear")*/'ids.filter_dropdown.clear.label')));
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
    var _itemsList$parentElem;
    var itemsList = _ref2.itemsList,
      search = _ref2.search;
    var checkboxes = Array.from(itemsList.querySelectorAll('.ids-dropdown__item .ids-input--checkbox'));
    var clearBtn = (_itemsList$parentElem = itemsList.parentElement) === null || _itemsList$parentElem === void 0 ? void 0 : _itemsList$parentElem.querySelector('.ids-dropdown__footer .ids-btn');
    return [].concat(_toConsumableArray(search instanceof HTMLElement ? [search] : []), checkboxes, _toConsumableArray(clearBtn ? [clearBtn] : []));
  };
  return /*#__PURE__*/_react["default"].createElement("div", _extends({
    className: rootClassName
  }, restProps), /*#__PURE__*/_react["default"].createElement("div", {
    className: "ids-dropdown__source"
  }, /*#__PURE__*/_react["default"].createElement("select", {
    defaultValue: value,
    multiple: true,
    name: name,
    tabIndex: -1
  }, items.map(function (entry, index) {
    return (0, _BaseDropdown.isDropdownItemGroup)(entry) ? renderOptionGroup(entry, index) : renderOption(entry);
  }))), /*#__PURE__*/_react["default"].createElement("button", {
    "aria-controls": panelId,
    "aria-expanded": isOpen,
    "aria-label": isIconOnly ? label : undefined,
    className: "ids-dropdown__trigger",
    onClick: toggleDropdown,
    ref: setReferenceElement,
    type: "button"
  }, hasTriggerIcon && /*#__PURE__*/_react["default"].createElement("span", {
    "aria-hidden": "true",
    className: "ids-dropdown__trigger-icon"
  }, /*#__PURE__*/_react["default"].createElement(_Icon.Icon, {
    name: "filters",
    size: _Icon.IconSize.Small
  })), !isIconOnly && /*#__PURE__*/_react["default"].createElement("span", {
    className: "ids-dropdown__trigger-label"
  }, showsValue ? "".concat(label, ":") : label), showsValue && /*#__PURE__*/_react["default"].createElement("span", {
    className: "ids-dropdown__value"
  }, selectedItems[0].label), hasSelection && !showsValue && /*#__PURE__*/_react["default"].createElement("span", {
    className: "ids-dropdown__counter"
  }, selectedItems.length), hasChevron && /*#__PURE__*/_react["default"].createElement("span", {
    "aria-hidden": "true",
    className: "ids-dropdown__chevron"
  }, /*#__PURE__*/_react["default"].createElement(_Icon.Icon, {
    name: "arrow-chevron-down",
    size: _Icon.IconSize.TinySmall
  }))), /*#__PURE__*/_react["default"].createElement(_ItemsContainer.ItemsContainer, {
    closeDropdown: function closeDropdown() {
      setIsOpen(false);
    },
    containerAttributes: {
      'aria-label': label,
      id: panelId,
      role: 'group'
    },
    filterFunction: function filterFunction(item, searchTerm) {
      return item.label.toLowerCase().includes(searchTerm.toLowerCase());
    },
    getItemAttributes: getItemAttributes,
    getNextFocusableItem: _focus.getNextFocusableItem.bind(null, getFocusableElements),
    hasSearch: hasSearch,
    isItemSelected: isItemSelected,
    isOpen: isOpen,
    items: items,
    maxVisibleItems: MAX_VISIBLE_ITEMS,
    minWidth: PANEL_MIN_WIDTH,
    onDropdownItemClick: function onDropdownItemClick(item) {
      changeValue(item.id);
    },
    referenceElement: referenceElement,
    renderFooter: renderFooter,
    renderItem: renderItem
  }));
};
var FilterDropdownStateful = exports.FilterDropdownStateful = (0, _withStateValue.withStateValue)(FilterDropdown);