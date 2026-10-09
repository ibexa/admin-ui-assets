"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabsStateful = exports.Tabs = void 0;
var _react = _interopRequireWildcard(require("react"));
var _idsCore = require("@ids-core");
var _TabsPanel = require("./components/TabsPanel");
var _TabsTab = require("./components/TabsTab");
var _useTabsKeyboardNavigation = require("./hooks/useTabsKeyboardNavigation");
var _excluded = ["initialSelectedId", "items", "onChange"];
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Tabs = exports.Tabs = function Tabs(_ref) {
  var _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className,
    _ref$extraAria = _ref.extraAria,
    extraAria = _ref$extraAria === void 0 ? {} : _ref$extraAria,
    idPrefix = _ref.idPrefix,
    items = _ref.items,
    onChange = _ref.onChange,
    selectedId = _ref.selectedId;
  var generatedIdPrefix = (0, _react.useId)();
  var prefix = idPrefix !== null && idPrefix !== void 0 ? idPrefix : generatedIdPrefix;
  var hasPanels = items.some(function (item) {
    return item.content !== undefined;
  });
  var componentClassName = (0, _idsCore.createCssClassNames)(_defineProperty({
    'ids-tabs': true
  }, className, !!className));
  var getTabId = function getTabId(id) {
    return "".concat(prefix, "-tab-").concat(id);
  };
  var getPanelId = function getPanelId(id) {
    return hasPanels ? "".concat(prefix, "-panel-").concat(id) : undefined;
  };
  var selectTab = function selectTab(id, event) {
    if (id !== selectedId) {
      onChange === null || onChange === void 0 || onChange(id, event);
    }
  };
  var _useTabsKeyboardNavig = (0, _useTabsKeyboardNavigation.useTabsKeyboardNavigation)(items, selectedId, selectTab),
    handleKeyDown = _useTabsKeyboardNavig.handleKeyDown,
    setTabNode = _useTabsKeyboardNavig.setTabNode;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: componentClassName
  }, /*#__PURE__*/_react["default"].createElement("ul", _extends({
    className: "ids-tabs__list",
    onKeyDown: handleKeyDown,
    role: "tablist"
  }, extraAria), items.map(function (item) {
    return /*#__PURE__*/_react["default"].createElement(_TabsTab.TabsTab, {
      id: getTabId(item.id),
      isSelected: item.id === selectedId,
      item: item,
      key: item.id,
      onSelect: selectTab,
      panelId: getPanelId(item.id),
      setRef: setTabNode(item.id)
    });
  })), hasPanels && /*#__PURE__*/_react["default"].createElement("div", {
    className: "ids-tabs__panels"
  }, items.map(function (item) {
    var _getPanelId;
    return /*#__PURE__*/_react["default"].createElement(_TabsPanel.TabsPanel, {
      id: (_getPanelId = getPanelId(item.id)) !== null && _getPanelId !== void 0 ? _getPanelId : '',
      isSelected: item.id === selectedId,
      key: item.id,
      tabId: getTabId(item.id)
    }, item.content);
  })));
};
var TabsStateful = exports.TabsStateful = function TabsStateful(_ref2) {
  var _ref3, _items$at;
  var initialSelectedId = _ref2.initialSelectedId,
    items = _ref2.items,
    onChange = _ref2.onChange,
    restProps = _objectWithoutProperties(_ref2, _excluded);
  var _useState = (0, _react.useState)((_ref3 = initialSelectedId !== null && initialSelectedId !== void 0 ? initialSelectedId : (_items$at = items.at(0)) === null || _items$at === void 0 ? void 0 : _items$at.id) !== null && _ref3 !== void 0 ? _ref3 : ''),
    _useState2 = _slicedToArray(_useState, 2),
    selectedId = _useState2[0],
    setSelectedId = _useState2[1];
  var handleChange = function handleChange(id, event) {
    setSelectedId(id);
    onChange === null || onChange === void 0 || onChange(id, event);
  };
  return /*#__PURE__*/_react["default"].createElement(Tabs, _extends({}, restProps, {
    items: items,
    onChange: handleChange,
    selectedId: selectedId
  }));
};