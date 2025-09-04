"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _Button = _interopRequireDefault(require("../Button"));
var _Icon = _interopRequireDefault(require("../Icon"));
var _cssClass = require("../../packages/components/src/internal/shared/css.class.names");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var ICONS_MAP = {
  caret: 'arrow-caret-down',
  triangle: 'arrow-down'
};
var Expander = function Expander(_ref) {
  var _onClick = _ref.onClick,
    _ref$collapseLabel = _ref.collapseLabel,
    collapseLabel = _ref$collapseLabel === void 0 ? '' : _ref$collapseLabel,
    _ref$expandLabel = _ref.expandLabel,
    expandLabel = _ref$expandLabel === void 0 ? '' : _ref$expandLabel,
    _ref$hasIcon = _ref.hasIcon,
    hasIcon = _ref$hasIcon === void 0 ? true : _ref$hasIcon,
    _ref$isExpanded = _ref.isExpanded,
    isExpanded = _ref$isExpanded === void 0 ? false : _ref$isExpanded,
    _ref$type = _ref.type,
    type = _ref$type === void 0 ? 'caret' : _ref$type;
  var label = isExpanded ? collapseLabel : expandLabel;
  var extraClasses = (0, _cssClass.createCssClassNames)({
    'ids-expander': true,
    'ids-expander--has-icon': hasIcon,
    'ids-expander--has-label': label !== '',
    'ids-expander--is-expanded': isExpanded
  });
  var extraAria = {
    'aria-expanded': isExpanded
  };
  var renderExpanderIcon = function renderExpanderIcon() {
    if (!hasIcon) {
      return null;
    }
    return /*#__PURE__*/_react["default"].createElement(_Icon["default"], {
      cssClass: "ids-icon",
      name: ICONS_MAP[type],
      size: "small"
    });
  };
  return /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    ariaLabel: label,
    extraAria: extraAria,
    extraClasses: extraClasses,
    onClick: function onClick() {
      _onClick(!isExpanded);
    },
    size: "small",
    type: "tertiary-alt"
  }, label, renderExpanderIcon());
};
var _default = exports["default"] = Expander;