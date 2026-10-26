"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Autosave = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Icon = require("../Icon");
var _Translator = require("../../context/Translator");
var _idsCore = require("@ids-core");
var _Autosave = require("./Autosave.types");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
var Autosave = exports.Autosave = function Autosave(_ref) {
  var _ref$isDarkMode = _ref.isDarkMode,
    isDarkMode = _ref$isDarkMode === void 0 ? false : _ref$isDarkMode,
    isEnabled = _ref.isEnabled,
    lastSavedTime = _ref.lastSavedTime,
    _ref$status = _ref.status,
    status = _ref$status === void 0 ? _Autosave.AutosaveStatus.On : _ref$status;
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