"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Search = void 0;
var _react = _interopRequireWildcard(require("react"));
var _InputText = require("../../../../components/InputText");
var _Translator = require("../../../../context/Translator");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var Search = exports.Search = function Search(_ref) {
  var isVisible = _ref.isVisible,
    setSearchTerm = _ref.setSearchTerm,
    searchRef = _ref.searchRef,
    searchTerm = _ref.searchTerm;
  var Translator = (0, _react.useContext)(_Translator.TranslatorContext);
  if (!isVisible) {
    return null;
  }
  var placeholderText = Translator.trans(/*@Desc("Search...")*/'ids.dropdown.search.placeholder');
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "ids-dropdown__search"
  }, /*#__PURE__*/_react["default"].createElement(_InputText.InputTextInput, {
    name: "dropdown-search",
    onChange: setSearchTerm,
    placeholder: placeholderText,
    ref: searchRef,
    size: _InputText.InputTextInputSize.Small,
    value: searchTerm
  }));
};