"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputTextInputStateful = exports.InputTextInput = void 0;
var _react = _interopRequireWildcard(require("react"));
var _BaseInput = require("../../../partials/BaseInput");
var _ClearBtn = require("../../../ui/ClearBtn");
var _idsCore = require("@ids-core");
var _withStateValue = require("../../../hoc/withStateValue");
var _InputTextInput = require("./InputTextInput.types");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var InputTextInput = exports.InputTextInput = function InputTextInput(_ref) {
  var name = _ref.name,
    _ref$onBlur = _ref.onBlur,
    onBlur = _ref$onBlur === void 0 ? function () {
      return undefined;
    } : _ref$onBlur,
    _ref$onChange = _ref.onChange,
    onChange = _ref$onChange === void 0 ? function () {
      return undefined;
    } : _ref$onChange,
    _ref$onFocus = _ref.onFocus,
    onFocus = _ref$onFocus === void 0 ? function () {
      return undefined;
    } : _ref$onFocus,
    _ref$onInput = _ref.onInput,
    onInput = _ref$onInput === void 0 ? function () {
      return undefined;
    } : _ref$onInput,
    _ref$disabled = _ref.disabled,
    disabled = _ref$disabled === void 0 ? false : _ref$disabled,
    _ref$error = _ref.error,
    error = _ref$error === void 0 ? false : _ref$error,
    _ref$extraAria = _ref.extraAria,
    extraAria = _ref$extraAria === void 0 ? {} : _ref$extraAria,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className,
    _ref$id = _ref.id,
    id = _ref$id === void 0 ? undefined : _ref$id,
    _ref$placeholder = _ref.placeholder,
    placeholder = _ref$placeholder === void 0 ? '' : _ref$placeholder,
    _ref$processActions = _ref.processActions,
    processActions = _ref$processActions === void 0 ? function (actions) {
      return actions;
    } : _ref$processActions,
    _ref$readOnly = _ref.readOnly,
    readOnly = _ref$readOnly === void 0 ? false : _ref$readOnly,
    _ref$ref = _ref.ref,
    ref = _ref$ref === void 0 ? null : _ref$ref,
    _ref$required = _ref.required,
    required = _ref$required === void 0 ? false : _ref$required,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? _InputTextInput.InputTextInputSize.Medium : _ref$size,
    _ref$title = _ref.title,
    title = _ref$title === void 0 ? '' : _ref$title,
    _ref$type = _ref.type,
    type = _ref$type === void 0 ? 'text' : _ref$type,
    _ref$value = _ref.value,
    value = _ref$value === void 0 ? '' : _ref$value;
  var actionsRef = (0, _react.useRef)(null);
  var _useState = (0, _react.useState)(0),
    _useState2 = _slicedToArray(_useState, 2),
    sourcePadding = _useState2[0],
    setSourcePadding = _useState2[1];
  var inputTextClassName = (0, _idsCore.createCssClassNames)(_defineProperty({
    'ids-input-text': true
  }, className, true));
  var componentOnBlur = function componentOnBlur(event) {
    onBlur(event);
  };
  var componentOnChange = function componentOnChange(event) {
    onChange(event.target.value, event);
  };
  var componentOnFocus = function componentOnFocus(event) {
    onFocus(event);
  };
  var componentOnInput = function componentOnInput(event) {
    onInput(event.target.value, event);
  };
  var actions = (0, _react.useMemo)(function () {
    var baseActions = [];
    if (value) {
      baseActions.push({
        component: /*#__PURE__*/_react["default"].createElement(_ClearBtn.ClearBtn, {
          disabled: disabled,
          onClick: function onClick() {
            onChange('');
          }
        }),
        id: 'clear'
      });
    }
    return processActions(baseActions);
  }, [disabled, onChange, processActions, value]);
  var renderActions = function renderActions() {
    if (actions.length === 0) {
      return null;
    }
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "ids-input-text__actions",
      ref: actionsRef
    }, actions.map(function (action) {
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "ids-input-text__action",
        key: action.id
      }, action.component);
    }));
  };
  (0, _react.useLayoutEffect)(function () {
    var _actionsRef$current$o, _actionsRef$current;
    var actionsWidth = (_actionsRef$current$o = (_actionsRef$current = actionsRef.current) === null || _actionsRef$current === void 0 ? void 0 : _actionsRef$current.offsetWidth) !== null && _actionsRef$current$o !== void 0 ? _actionsRef$current$o : 0;
    setSourcePadding(actionsWidth);
  }, [value]);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: inputTextClassName
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "ids-input-text__source"
  }, /*#__PURE__*/_react["default"].createElement(_BaseInput.BaseInput, {
    disabled: disabled,
    error: error,
    extraInputAttrs: _objectSpread({
      onBlur: componentOnBlur,
      onChange: componentOnChange,
      onFocus: componentOnFocus,
      onInput: componentOnInput,
      placeholder: placeholder,
      readOnly: readOnly,
      style: {
        paddingRight: "".concat(sourcePadding, "px")
      }
    }, extraAria),
    id: id,
    name: name,
    ref: ref,
    required: required,
    size: size,
    title: title,
    type: type,
    value: value
  })), renderActions());
};
var InputTextInputStateful = exports.InputTextInputStateful = (0, _withStateValue.withStateValue)(InputTextInput);