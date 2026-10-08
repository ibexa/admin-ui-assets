"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Search = void 0;
var _react = _interopRequireWildcard(require("react"));
var _InputText = require("../../../../components/InputText");
var _Translator = require("../../../../context/Translator");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
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