"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DropdownMultiInputStateful = exports.DropdownMultiInput = void 0;
var _react = _interopRequireDefault(require("react"));
var _focus = require("../utils/focus");
var _BaseDropdown = require("../../../partials/BaseDropdown");
var _Checkbox = require("../../Checkbox");
var _Chip = require("../../Chip");
var _OverflowList = require("../../OverflowList");
var _idsCore = require("@ids-core");
var _withStateValue = require("../../../hoc/withStateValue");
var _DropdownMultiInput = require("./DropdownMultiInput.types");
var _excluded = ["name", "className", "items", "onChange", "value"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var DropdownMultiInput = exports.DropdownMultiInput = function DropdownMultiInput(_ref) {
  var name = _ref.name,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className,
    _ref$items = _ref.items,
    items = _ref$items === void 0 ? [] : _ref$items,
    _ref$onChange = _ref.onChange,
    onChange = _ref$onChange === void 0 ? function () {
      return undefined;
    } : _ref$onChange,
    _ref$value = _ref.value,
    value = _ref$value === void 0 ? [] : _ref$value,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var dropdownClassName = (0, _idsCore.createCssClassNames)(_defineProperty({
    'ids-dropdown--multi': true
  }, className, !!className));
  var changeValue = function changeValue(id) {
    var oldValueLength = value.length;
    var newValue = value.includes(id) ? value.filter(function (val) {
      return val !== id;
    }) : [].concat(_toConsumableArray(value), [id]);
    var actionPerformed = newValue.length > oldValueLength ? _DropdownMultiInput.DropdownMultiInputAction.Check : _DropdownMultiInput.DropdownMultiInputAction.Uncheck;
    onChange(newValue, id, actionPerformed);
  };
  var clickDropdownItem = function clickDropdownItem(_ref2) {
    var id = _ref2.id;
    changeValue(id);
  };
  var getItemAttributes = function getItemAttributes() {
    return {
      role: undefined,
      tabIndex: undefined
    };
  };
  var isItemSelected = function isItemSelected(item) {
    return value.includes(item.id);
  };
  var renderItem = function renderItem(item) {
    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_Checkbox.CheckboxInput, {
      checked: isItemSelected(item),
      name: "".concat(name, "-checkbox"),
      value: item.id
    }), item.label);
  };
  var selectedItems = value.length ? items.filter(function (item) {
    return value.includes(item.id);
  }) : [];
  var renderSelectedItems = function renderSelectedItems() {
    return /*#__PURE__*/_react["default"].createElement(_OverflowList.OverflowList, {
      items: selectedItems,
      renderItem: function renderItem(item) {
        return /*#__PURE__*/_react["default"].createElement(_Chip.Chip, {
          key: item.id,
          onDelete: function onDelete() {
            changeValue(item.id);
          }
        }, item.label);
      },
      renderMore: function renderMore(_ref3) {
        var hiddenCount = _ref3.hiddenCount;
        return /*#__PURE__*/_react["default"].createElement(_Chip.Chip, {
          isDeletable: false
        }, "+", hiddenCount);
      }
    });
  };
  var renderSource = function renderSource() {
    return /*#__PURE__*/_react["default"].createElement("select", {
      defaultValue: value,
      multiple: true,
      name: name,
      tabIndex: -1
    }, items.map(function (item) {
      return /*#__PURE__*/_react["default"].createElement("option", {
        key: item.id,
        value: item.id
      }, item.label);
    }));
  };
  var getFocusableElements = function getFocusableElements(_ref4) {
    var itemsList = _ref4.itemsList,
      search = _ref4.search;
    var focusableElements = [].concat(_toConsumableArray(search instanceof HTMLElement ? [search] : []), _toConsumableArray(Array.from(itemsList.children).reduce(function (acc, child) {
      if (child instanceof HTMLElement) {
        var checkbox = child.querySelector('.ids-input--checkbox');
        if (checkbox instanceof HTMLElement && !checkbox.classList.contains('ids-input--disabled')) {
          acc.push(checkbox);
        }
      }
      return acc;
    }, [])));
    return focusableElements;
  };
  return /*#__PURE__*/_react["default"].createElement(_BaseDropdown.BaseDropdown, _extends({}, restProps, {
    className: dropdownClassName,
    getItemAttributes: getItemAttributes,
    getNextFocusableItem: _focus.getNextFocusableItem.bind(null, getFocusableElements),
    isEmpty: selectedItems.length === 0,
    isItemSelected: isItemSelected,
    items: items,
    onDropdownItemClick: clickDropdownItem,
    renderItem: renderItem,
    renderSelectedItems: renderSelectedItems,
    renderSource: renderSource
  }));
};
var DropdownMultiInputStateful = exports.DropdownMultiInputStateful = (0, _withStateValue.withStateValue)(DropdownMultiInput);