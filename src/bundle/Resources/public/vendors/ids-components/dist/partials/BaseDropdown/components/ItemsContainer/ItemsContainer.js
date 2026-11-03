"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemsContainer = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactPopper = require("react-popper");
var _Search = require("../Search");
var _idsCore = require("@ids-core");
var _useKeyEvent = require("../../../../hooks/useKeyEvent");
var _ItemsContainer = require("./ItemsContainer.types");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
var ItemsContainer = exports.ItemsContainer = function ItemsContainer(_ref) {
  var _attributes$popper;
  var closeDropdown = _ref.closeDropdown,
    filterFunction = _ref.filterFunction,
    getItemAttributes = _ref.getItemAttributes,
    getNextFocusableItem = _ref.getNextFocusableItem,
    isItemSelected = _ref.isItemSelected,
    isOpen = _ref.isOpen,
    items = _ref.items,
    maxVisibleItems = _ref.maxVisibleItems,
    onDropdownItemClick = _ref.onDropdownItemClick,
    referenceElement = _ref.referenceElement,
    renderItem = _ref.renderItem;
  var searchRef = (0, _react.useRef)(null);
  var itemsRef = (0, _react.useRef)(null);
  var originalItemsMaxHeightRef = (0, _react.useRef)(0);
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    isTopPlacementForced = _useState2[0],
    setIsTopPlacementForced = _useState2[1];
  var _useState3 = (0, _react.useState)(''),
    _useState4 = _slicedToArray(_useState3, 2),
    searchTerm = _useState4[0],
    setSearchTerm = _useState4[1];
  var _useState5 = (0, _react.useState)(null),
    _useState6 = _slicedToArray(_useState5, 2),
    popperElement = _useState6[0],
    setPopperElement = _useState6[1];
  var _useState7 = (0, _react.useState)(0),
    _useState8 = _slicedToArray(_useState7, 2),
    itemsContainerWidth = _useState8[0],
    setItemsContainerWidth = _useState8[1];
  var _useState9 = (0, _react.useState)(0),
    _useState0 = _slicedToArray(_useState9, 2),
    itemsMaxHeight = _useState0[0],
    setItemsMaxHeight = _useState0[1];
  var _usePopper = (0, _reactPopper.usePopper)(referenceElement, popperElement, {
      placement: isTopPlacementForced ? 'top-start' : 'bottom-start',
      strategy: 'fixed'
    }),
    styles = _usePopper.styles,
    attributes = _usePopper.attributes;
  var hasSearchInput = items.length > maxVisibleItems;
  var filteredItems = (0, _react.useMemo)(function () {
    if (!searchTerm) {
      return items;
    }
    return items.filter(function (item) {
      return filterFunction(item, searchTerm);
    });
  }, [items, searchTerm, filterFunction]);
  var onItemClick = function onItemClick(item) {
    onDropdownItemClick(item, {
      closeDropdown: closeDropdown
    });
  };
  var itemsContainerStyles = _objectSpread(_objectSpread({}, styles.popper), {}, {
    width: itemsContainerWidth ? "".concat(itemsContainerWidth, "px") : 'auto'
  });
  var getItemsStyles = function getItemsStyles() {
    var itemsStyles = {
      '--max-visible-items': maxVisibleItems
    };
    if (itemsMaxHeight) {
      itemsStyles.maxHeight = "".concat(itemsMaxHeight, "px");
    }
    return itemsStyles;
  };
  var popperPlacement = ((_attributes$popper = attributes.popper) === null || _attributes$popper === void 0 ? void 0 : _attributes$popper['data-popper-placement']) === 'top-start' ? 'top' : 'bottom';
  var calculateMaxAvailableItemsHeight = (0, _react.useCallback)(function (availableHeight) {
    if (!isOpen || !popperElement || !itemsRef.current) {
      return 0;
    }
    var _window$getComputedSt = window.getComputedStyle(popperElement),
      itemsMarginTop = _window$getComputedSt.marginTop,
      itemsMarginBottom = _window$getComputedSt.marginBottom;
    var _popperElement$getBou = popperElement.getBoundingClientRect(),
      itemsContainerTop = _popperElement$getBou.top,
      itemsContainerBottom = _popperElement$getBou.bottom;
    var _itemsRef$current$get = itemsRef.current.getBoundingClientRect(),
      itemsTop = _itemsRef$current$get.top,
      itemsBottom = _itemsRef$current$get.bottom;
    var topHeight = parseInt(itemsMarginTop, 10) + (itemsTop - itemsContainerTop);
    var bottomHeight = parseInt(itemsMarginBottom, 10) + (itemsContainerBottom - itemsBottom);
    var calculatedAvailableHeight = availableHeight - topHeight - bottomHeight;
    return calculatedAvailableHeight;
  }, [popperElement, isOpen]);
  var moveActiveFocus = function moveActiveFocus(event, direction) {
    if (isOpen) {
      event.preventDefault();
      var activeElement = window.document.activeElement;
      if (activeElement instanceof HTMLElement && itemsRef.current instanceof HTMLUListElement) {
        var nextElement = getNextFocusableItem(activeElement, direction, {
          itemsList: itemsRef.current,
          search: searchRef.current
        });
        if (nextElement) {
          nextElement.focus();
        }
      }
    }
  };
  (0, _react.useEffect)(function () {
    var clickOutsideHandler = function clickOutsideHandler(event) {
      if (event.target instanceof Node && !(popperElement !== null && popperElement !== void 0 && popperElement.contains(event.target)) && !(referenceElement !== null && referenceElement !== void 0 && referenceElement.contains(event.target))) {
        closeDropdown();
      }
    };
    if (isOpen) {
      var _searchRef$current;
      setSearchTerm('');
      (_searchRef$current = searchRef.current) === null || _searchRef$current === void 0 || _searchRef$current.focus();
      window.document.body.addEventListener('click', clickOutsideHandler);
      return function () {
        window.document.body.removeEventListener('click', clickOutsideHandler);
      };
    }
  }, [isOpen, popperElement, referenceElement]);
  (0, _react.useLayoutEffect)(function () {
    if (isOpen && referenceElement) {
      var _itemsRef$current$off, _itemsRef$current;
      setItemsContainerWidth(referenceElement.offsetWidth);
      originalItemsMaxHeightRef.current = (_itemsRef$current$off = (_itemsRef$current = itemsRef.current) === null || _itemsRef$current === void 0 ? void 0 : _itemsRef$current.offsetHeight) !== null && _itemsRef$current$off !== void 0 ? _itemsRef$current$off : 0;
    } else {
      setItemsMaxHeight(0);
    }
  }, [isOpen, referenceElement]);
  (0, _react.useLayoutEffect)(function () {
    if (styles.popper.transform && referenceElement) {
      var getAvailableHeight = function getAvailableHeight() {
        if (popperPlacement === 'bottom') {
          var _window = window,
            windowHeight = _window.innerHeight;
          var _referenceElement$get = referenceElement.getBoundingClientRect(),
            dropdownBottom = _referenceElement$get.bottom;
          return windowHeight - dropdownBottom;
        }
        return referenceElement.getBoundingClientRect().top;
      };
      var availableHeight = getAvailableHeight();
      var availableItemsHeight = calculateMaxAvailableItemsHeight(availableHeight);
      var originalDropdownFitsInViewport = availableItemsHeight > originalItemsMaxHeightRef.current;
      if (originalDropdownFitsInViewport) {
        setItemsMaxHeight(0);
      } else {
        setItemsMaxHeight(availableItemsHeight);
      }
    }
  }, [styles.popper.transform, popperPlacement, referenceElement]);
  (0, _react.useLayoutEffect)(function () {
    if (isOpen && referenceElement) {
      var _referenceElement$get2 = referenceElement.getBoundingClientRect(),
        referenceTop = _referenceElement$get2.top,
        referenceBottom = _referenceElement$get2.bottom;
      var _window2 = window,
        windowHeight = _window2.innerHeight;
      if (referenceBottom < 0 || referenceTop > windowHeight) {
        closeDropdown();
        return;
      }
      var availableSpaceAbove = referenceTop;
      var availableSpaceBelow = windowHeight - referenceBottom;
      var originalDropdownFitsInViewport = availableSpaceBelow > originalItemsMaxHeightRef.current;
      var moreSpaceAbove = availableSpaceAbove > availableSpaceBelow;
      var showDropdownAbove = moreSpaceAbove && !originalDropdownFitsInViewport;
      setIsTopPlacementForced(showDropdownAbove);
    }
  }, [isOpen, referenceElement, styles.popper.transform]);
  (0, _useKeyEvent.useKeyDown)(['Enter', ' '], function (event) {
    var activeElement = window.document.activeElement;
    if (isOpen && activeElement !== null && activeElement !== void 0 && activeElement.classList.contains('ids-dropdown__item') && activeElement instanceof HTMLElement) {
      event.preventDefault();
      activeElement.click();
    }
  }, popperElement);
  (0, _useKeyEvent.useKeyDown)(['Escape'], function () {
    if (isOpen) {
      closeDropdown();
      referenceElement === null || referenceElement === void 0 || referenceElement.focus();
    }
  }, popperElement);
  (0, _useKeyEvent.useKeyDown)(['ArrowDown', 'Tab'], function (event) {
    moveActiveFocus(event, _ItemsContainer.ItemsContainerMoveActiveFocusDirection.Down);
  }, popperElement);
  (0, _useKeyEvent.useKeyDown)(['ArrowUp'], function (event) {
    moveActiveFocus(event, _ItemsContainer.ItemsContainerMoveActiveFocusDirection.Up);
  }, popperElement);
  if (!isOpen) {
    return null;
  }
  return /*#__PURE__*/_react["default"].createElement("div", _extends({
    className: "ids-dropdown__items-container",
    ref: setPopperElement,
    style: itemsContainerStyles
  }, attributes.popper), /*#__PURE__*/_react["default"].createElement(_Search.Search, {
    isVisible: hasSearchInput,
    searchRef: searchRef,
    searchTerm: searchTerm,
    setSearchTerm: setSearchTerm
  }), /*#__PURE__*/_react["default"].createElement("ul", {
    className: "ids-dropdown__items",
    ref: itemsRef,
    style: getItemsStyles()
  }, filteredItems.map(function (item, index) {
    var dropdownItemClassName = (0, _idsCore.createCssClassNames)({
      'ids-dropdown__item': true,
      'ids-dropdown__item--selected': isItemSelected(item)
    });
    return /*#__PURE__*/_react["default"].createElement("li", _extends({
      className: dropdownItemClassName,
      key: item.id,
      onClick: function onClick() {
        onItemClick(item);
      },
      ref: function ref(node) {
        if (index === 0 && !hasSearchInput && node) {
          node.focus();
        }
      },
      role: "button",
      tabIndex: 0
    }, getItemAttributes(item)), renderItem(item));
  })));
};