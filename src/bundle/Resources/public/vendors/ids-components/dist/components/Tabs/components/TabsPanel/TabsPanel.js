"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabsPanel = void 0;
var _react = _interopRequireDefault(require("react"));
var _idsCore = require("@ids-core");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var TabsPanel = exports.TabsPanel = function TabsPanel(_ref) {
  var children = _ref.children,
    id = _ref.id,
    isSelected = _ref.isSelected,
    tabId = _ref.tabId;
  var panelClassName = (0, _idsCore.createCssClassNames)({
    'ids-tabs__panel': true,
    'ids-tabs__panel--selected': isSelected
  });
  return /*#__PURE__*/_react["default"].createElement("div", {
    "aria-labelledby": tabId,
    className: panelClassName,
    hidden: !isSelected,
    id: id,
    role: "tabpanel"
  }, children);
};