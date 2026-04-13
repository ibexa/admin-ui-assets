"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OverflowList = void 0;
var _react = _interopRequireWildcard(require("react"));
var _cssClassNames = require("@ids-core/helpers/cssClassNames");
var _useDebounce = require("../../hooks/useDebounce");
var _OverflowList = require("./OverflowList.types");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var RESIZE_TIMEOUT = 200;
var OverflowList = exports.OverflowList = function OverflowList(_ref) {
  var _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className,
    _ref$items = _ref.items,
    items = _ref$items === void 0 ? [] : _ref$items,
    renderItem = _ref.renderItem,
    renderMore = _ref.renderMore;
  var listRef = (0, _react.useRef)(null);
  var itemsRef = (0, _react.useRef)(null);
  var _useState = (0, _react.useState)(0),
    _useState2 = _slicedToArray(_useState, 2),
    itemsWidth = _useState2[0],
    setItemsWidth = _useState2[1];
  var _useState3 = (0, _react.useState)(_OverflowList.OverflowListCalculateAction.None),
    _useState4 = _slicedToArray(_useState3, 2),
    currentAction = _useState4[0],
    setCurrentAction = _useState4[1];
  var _useState5 = (0, _react.useState)(items.length),
    _useState6 = _slicedToArray(_useState5, 2),
    numberOfVisibleItems = _useState6[0],
    setNumberOfVisibleItems = _useState6[1];
  var debounce = (0, _useDebounce.useDebounce)(RESIZE_TIMEOUT);
  var componentClassName = (0, _cssClassNames.createCssClassNames)(_defineProperty({
    'ids-overflow-list': true
  }, className, !!className));
  var recalculateVisibleItems = function recalculateVisibleItems() {
    if (!itemsRef.current) {
      return;
    }
    var itemsNodes = Array.from(itemsRef.current.children);
    var _itemsRef$current$get = itemsRef.current.getBoundingClientRect(),
      listRightPosition = _itemsRef$current$get.right;
    var newNumberOfVisibleItems = itemsNodes.findIndex(function (itemNode) {
      var _itemNode$getBounding = itemNode.getBoundingClientRect(),
        itemRightPosition = _itemNode$getBounding.right;
      return itemRightPosition > listRightPosition;
    });
    if (newNumberOfVisibleItems === -1 || newNumberOfVisibleItems === items.length) {
      return true;
    }
    if (newNumberOfVisibleItems === numberOfVisibleItems) {
      setNumberOfVisibleItems(newNumberOfVisibleItems - 1); // eslint-disable-line no-magic-numbers
    } else {
      setNumberOfVisibleItems(newNumberOfVisibleItems);
    }
    return false;
  };
  var listResizeObserver = (0, _react.useMemo)(function () {
    return new ResizeObserver(function () {
      debounce(function () {
        var _listRef$current$offs, _listRef$current;
        setItemsWidth((_listRef$current$offs = (_listRef$current = listRef.current) === null || _listRef$current === void 0 ? void 0 : _listRef$current.offsetWidth) !== null && _listRef$current$offs !== void 0 ? _listRef$current$offs : 0);
        setNumberOfVisibleItems(items.length);
        setCurrentAction(_OverflowList.OverflowListCalculateAction.CalculateItems);
      });
    });
  }, [items.length, debounce]);
  var renderItems = function renderItems() {
    return items.slice(0, numberOfVisibleItems).map(function (item) {
      return renderItem(item);
    });
  };
  var renderOverflow = function renderOverflow() {
    var hiddenCount = items.length - numberOfVisibleItems;
    if (hiddenCount > 0) {
      return renderMore({
        hiddenCount: hiddenCount
      });
    }
  };
  (0, _react.useLayoutEffect)(function () {
    if (currentAction === _OverflowList.OverflowListCalculateAction.CalculateItems) {
      var stopRecalculating = recalculateVisibleItems();
      if (stopRecalculating) {
        setCurrentAction(_OverflowList.OverflowListCalculateAction.None);
      }
    }
  }, [currentAction, numberOfVisibleItems]);
  (0, _react.useLayoutEffect)(function () {
    if (listRef.current) {
      setItemsWidth(listRef.current.offsetWidth);
    }
  }, []);
  (0, _react.useEffect)(function () {
    if (currentAction === _OverflowList.OverflowListCalculateAction.None) {
      setNumberOfVisibleItems(items.length);
      setCurrentAction(_OverflowList.OverflowListCalculateAction.CalculateItems);
    }
  }, [items]);
  (0, _react.useEffect)(function () {
    if (listRef.current) {
      listResizeObserver.observe(listRef.current);
    }
    return function () {
      listResizeObserver.disconnect();
    };
  }, []);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: componentClassName,
    ref: listRef
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "ids-overflow-list__items",
    ref: itemsRef,
    style: {
      width: "".concat(itemsWidth, "px")
    }
  }, renderItems(), renderOverflow()));
};