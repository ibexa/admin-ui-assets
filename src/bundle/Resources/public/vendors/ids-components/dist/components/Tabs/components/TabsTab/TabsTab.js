"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabsTab = void 0;
var _react = _interopRequireDefault(require("react"));
var _Icon = require("../../../Icon");
var _idsCore = require("@ids-core");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var ERROR_ICON_NAME = 'alert-error';
var TabsTab = exports.TabsTab = function TabsTab(_ref) {
  var id = _ref.id,
    isSelected = _ref.isSelected,
    item = _ref.item,
    onSelect = _ref.onSelect,
    panelId = _ref.panelId,
    setRef = _ref.setRef;
  var _item$hasError = item.hasError,
    hasError = _item$hasError === void 0 ? false : _item$hasError,
    _item$isDisabled = item.isDisabled,
    isDisabled = _item$isDisabled === void 0 ? false : _item$isDisabled,
    label = item.label;
  var tabClassName = (0, _idsCore.createCssClassNames)({
    'ids-tabs__tab': true,
    'ids-tabs__tab--disabled': isDisabled,
    'ids-tabs__tab--error': hasError,
    'ids-tabs__tab--selected': isSelected
  });
  var reservedLabel = typeof label === 'string' ? label : undefined;
  var handleClick = function handleClick(event) {
    onSelect(item.id, event);
  };
  return /*#__PURE__*/_react["default"].createElement("li", {
    className: "ids-tabs__item",
    role: "presentation"
  }, /*#__PURE__*/_react["default"].createElement("button", {
    "aria-controls": panelId,
    "aria-selected": isSelected,
    className: tabClassName,
    disabled: isDisabled,
    id: id,
    onClick: handleClick,
    ref: setRef,
    role: "tab",
    tabIndex: isSelected ? 0 : -1,
    type: "button"
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: "ids-tabs__tab-label",
    "data-label": reservedLabel
  }, label), hasError && /*#__PURE__*/_react["default"].createElement(_Icon.Icon, {
    className: "ids-tabs__tab-error-icon",
    name: ERROR_ICON_NAME,
    size: _Icon.IconSize.TinySmall
  })));
};