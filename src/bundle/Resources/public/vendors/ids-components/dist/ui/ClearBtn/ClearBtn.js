"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClearBtn = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Button = require("../../components/Button");
var _Translator = require("../../context/Translator");
var _idsCore = require("@ids-core");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var ClearBtn = exports.ClearBtn = function ClearBtn(_ref) {
  var onClick = _ref.onClick,
    _ref$disabled = _ref.disabled,
    disabled = _ref$disabled === void 0 ? false : _ref$disabled;
  var Translator = (0, _react.useContext)(_Translator.TranslatorContext);
  var clearMsg = Translator.trans(/*@Desc("Clear")*/'ids.clear_btn.label');
  var componentClassName = (0, _idsCore.createCssClassNames)({
    'ids-clear-btn': true
  });
  return /*#__PURE__*/_react["default"].createElement(_Button.Button, {
    ariaLabel: clearMsg,
    className: componentClassName,
    disabled: disabled,
    icon: "discard",
    onClick: onClick,
    size: _Button.ButtonSize.Small,
    title: clearMsg,
    type: _Button.ButtonType.TertiaryAlt
  });
};