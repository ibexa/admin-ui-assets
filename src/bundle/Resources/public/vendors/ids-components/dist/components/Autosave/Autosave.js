"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Autosave = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Icon = require("../Icon");
var _Translator = require("../../context/Translator");
var _idsCore = require("@ids-core");
var _Autosave = require("./Autosave.types");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var Autosave = exports.Autosave = function Autosave(_ref) {
  var _ref$isDarkMode = _ref.isDarkMode,
    isDarkMode = _ref$isDarkMode === void 0 ? false : _ref$isDarkMode,
    _ref$isEnabled = _ref.isEnabled,
    isEnabled = _ref$isEnabled === void 0 ? true : _ref$isEnabled,
    _ref$status = _ref.status,
    status = _ref$status === void 0 ? _Autosave.AutosaveStatus.On : _ref$status,
    lastSavedTime = _ref.lastSavedTime;
  var Translator = (0, _react.useContext)(_Translator.TranslatorContext);
  var classes = (0, _idsCore.createCssClassNames)({
    'ids-autosave': true,
    'ids-autosave--error': status === _Autosave.AutosaveStatus.Error,
    'ids-autosave--light': isDarkMode
  });
  var tooltipMessage = 'content.autosave.turn_off.message';
  var getIconName = function getIconName() {
    if (!isEnabled) {
      return 'autosave-off';
    }
    switch (status) {
      case _Autosave.AutosaveStatus.On:
        return 'autosave-on';
      case _Autosave.AutosaveStatus.Saving:
        return 'autosave-saving';
      case _Autosave.AutosaveStatus.Saved:
        return 'autosave-saved';
      case _Autosave.AutosaveStatus.Error:
        return 'autosave-error';
      default:
        return 'autosave-off';
    }
  };
  var getStatusMessage = function getStatusMessage() {
    var _lastSavedTime$toStri;
    var offMessage = Translator.trans(/*@Desc("Autosave is off, draft not created")*/'content_edit.autosave.status_off.message');
    if (!isEnabled) {
      return offMessage;
    }
    switch (status) {
      case _Autosave.AutosaveStatus.On:
        return Translator.trans(/*@Desc("Autosave is on, draft created")*/'content_edit.autosave.status_on.message');
      case _Autosave.AutosaveStatus.Saving:
        return Translator.trans(/*@Desc("Saving")*/'content_edit.autosave.status_saving.message');
      case _Autosave.AutosaveStatus.Saved:
        return Translator.trans(/*@Desc("Autosave is on, draft saved %time%")*/'content_edit.autosave.status_saved.message.full', {
          time: (_lastSavedTime$toStri = lastSavedTime === null || lastSavedTime === void 0 ? void 0 : lastSavedTime.toString()) !== null && _lastSavedTime$toStri !== void 0 ? _lastSavedTime$toStri : ''
        });
      case _Autosave.AutosaveStatus.Error:
        return Translator.trans(/*@Desc("Saving error")*/'content_edit.autosave.status_error.message');
      default:
        return offMessage;
    }
  };
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: classes,
    title: isEnabled ? tooltipMessage : undefined
  }, /*#__PURE__*/_react["default"].createElement(_Icon.Icon, {
    className: "ids-icon",
    name: getIconName(),
    size: _Icon.IconSize.Small
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "ids-autosave__status-message"
  }, getStatusMessage()));
};