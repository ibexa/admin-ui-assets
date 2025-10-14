"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useValidateInput = exports.useInitValidators = void 0;
var _react = require("react");
var _IsEmptyStringValidator = _interopRequireDefault(require("@ibexa/ids-core/validators/IsEmptyStringValidator"));
var _Translator = require("../../../../packages/components/src/context/Translator");
var _validators = require("../../../../packages/components/src/shared/validators");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var useInitValidators = exports.useInitValidators = function useInitValidators(_ref) {
  var required = _ref.required;
  var translator = (0, _react.useContext)(_Translator.TranslatorContext);
  var validators = (0, _react.useMemo)(function () {
    var validatorsList = [];
    if (required) {
      validatorsList.push(new _IsEmptyStringValidator["default"](translator));
    }
    return validatorsList;
  }, [required, translator]);
  return validators;
};
var useValidateInput = exports.useValidateInput = function useValidateInput(_ref2) {
  var validators = _ref2.validators,
    value = _ref2.value;
  var initialValue = (0, _react.useRef)(value);
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    isDirty = _useState2[0],
    setIsDirty = _useState2[1];
  (0, _react.useEffect)(function () {
    if (initialValue.current !== value) {
      setIsDirty(true);
    }
    initialValue.current = value;
  }, [value]);
  return (0, _react.useMemo)(function () {
    if (!isDirty) {
      return {
        isValid: true,
        messages: []
      };
    }
    return (0, _validators.validateInput)(value, validators);
  }, [initialValue.current, value, validators]);
};