"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClearBtn = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Button = require("../../components/Button");
var _Translator = require("../../context/Translator");
var _idsCore = require("@ids-core");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
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