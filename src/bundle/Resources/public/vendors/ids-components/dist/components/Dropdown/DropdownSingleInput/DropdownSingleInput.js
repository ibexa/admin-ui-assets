"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DropdownSingleInputStateful = exports.DropdownSingleInput = void 0;
var _react = _interopRequireDefault(require("react"));
var _BaseDropdown = require("../../../partials/BaseDropdown");
var _focus = require("../utils/focus");
var _Icon = require("../../Icon");
var _idsCore = require("@ids-core");
var _withStateValue = require("../../../hoc/withStateValue");
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
var DropdownSingleInput = exports.DropdownSingleInput = function DropdownSingleInput(_ref) {
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
    value = _ref$value === void 0 ? '' : _ref$value,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var dropdownClassName = (0, _idsCore.createCssClassNames)(_defineProperty({
    'ids-dropdown--single': true
  }, className, !!className));
  var clickDropdownItem = function clickDropdownItem(_ref2, _ref3) {
    var id = _ref2.id;
    var closeDropdown = _ref3.closeDropdown;
    onChange(id);
    closeDropdown();
  };
  var selectedItem = value ? items.find(function (item) {
    return item.id === value;
  }) : null;
  var isItemSelected = function isItemSelected(item) {
    return item.id === value;
  };
  var renderItem = function renderItem(item) {
    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, item.label, isItemSelected(item) && /*#__PURE__*/_react["default"].createElement(_Icon.Icon, {
      name: "check-circle",
      size: _Icon.IconSize.TinySmall
    }));
  };
  var renderSource = function renderSource() {
    return /*#__PURE__*/_react["default"].createElement("select", {
      defaultValue: value,
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
    var focusableElements = [].concat(_toConsumableArray(search ? [search] : []), _toConsumableArray(Array.from(itemsList.children).filter(function (child) {
      return !child.classList.contains('ids-dropdown__item--selected');
    })));
    return focusableElements.filter(function (element) {
      return element instanceof HTMLElement;
    });
  };
  return /*#__PURE__*/_react["default"].createElement(_BaseDropdown.BaseDropdown, _extends({}, restProps, {
    className: dropdownClassName,
    getNextFocusableItem: _focus.getNextFocusableItem.bind(null, getFocusableElements),
    isEmpty: !selectedItem,
    isItemSelected: isItemSelected,
    items: items,
    onDropdownItemClick: clickDropdownItem,
    renderItem: renderItem,
    renderSelectedItems: function renderSelectedItems() {
      var _selectedItem$label;
      return (_selectedItem$label = selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.label) !== null && _selectedItem$label !== void 0 ? _selectedItem$label : '';
    },
    renderSource: renderSource
  }));
};
var DropdownSingleInputStateful = exports.DropdownSingleInputStateful = (0, _withStateValue.withStateValue)(DropdownSingleInput);