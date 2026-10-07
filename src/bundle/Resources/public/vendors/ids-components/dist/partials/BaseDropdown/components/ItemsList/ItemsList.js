"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemsList = void 0;
var _react = _interopRequireDefault(require("react"));
var _items = require("../../utils/items");
var _idsCore = require("@ids-core");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var ItemsList = exports.ItemsList = function ItemsList(_ref) {
  var entries = _ref.entries,
    firstFocusableItemId = _ref.firstFocusableItemId,
    getItemAttributes = _ref.getItemAttributes,
    groupIdPrefix = _ref.groupIdPrefix,
    isItemSelected = _ref.isItemSelected,
    onItemClick = _ref.onItemClick,
    renderItem = _ref.renderItem;
  var renderDropdownItem = function renderDropdownItem(item) {
    var dropdownItemClassName = (0, _idsCore.createCssClassNames)({
      'ids-dropdown__item': true,
      'ids-dropdown__item--selected': isItemSelected(item)
    });
    return /*#__PURE__*/_react["default"].createElement("li", _extends({
      className: dropdownItemClassName,
      key: item.id,
      onClick: function onClick() {
        onItemClick(item);
      },
      ref: function ref(node) {
        if (item.id === firstFocusableItemId && node) {
          node.focus();
        }
      },
      role: "button",
      tabIndex: 0
    }, getItemAttributes(item)), renderItem(item));
  };
  var _renderEntries = function renderEntries(entriesToRender, idPrefix) {
    return entriesToRender.map(function (entry, index) {
      var _entry$id;
      if (!(0, _items.isDropdownItemGroup)(entry)) {
        return renderDropdownItem(entry);
      }
      if ((0, _items.flattenDropdownItems)(entry.items).length === 0) {
        return null;
      }
      var groupId = (_entry$id = entry.id) !== null && _entry$id !== void 0 ? _entry$id : "".concat(idPrefix, "-group-").concat(index);
      return /*#__PURE__*/_react["default"].createElement("li", {
        "aria-labelledby": groupId,
        className: "ids-dropdown__group",
        key: groupId,
        role: "group"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "ids-dropdown__group-label",
        id: groupId
      }, entry.label), /*#__PURE__*/_react["default"].createElement("ul", {
        className: "ids-dropdown__group-items"
      }, _renderEntries(entry.items, groupId)));
    });
  };
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, _renderEntries(entries, groupIdPrefix));
};