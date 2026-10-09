"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useTabsKeyboardNavigation = void 0;
var _react = require("react");
var _navigation = require("../utils/navigation");
var useTabsKeyboardNavigation = exports.useTabsKeyboardNavigation = function useTabsKeyboardNavigation(items, selectedId, selectTab) {
  var tabsNodes = (0, _react.useRef)(new Map());
  var setTabNode = function setTabNode(id) {
    return function (node) {
      if (node) {
        tabsNodes.current.set(id, node);
      } else {
        tabsNodes.current["delete"](id);
      }
    };
  };
  var handleKeyDown = function handleKeyDown(event) {
    var _tabsNodes$current$ge;
    if (!(0, _navigation.checkIsNavigationKey)(event.key)) {
      return;
    }
    var nextId = (0, _navigation.getNextSelectableId)(items, selectedId, event.key);
    if (nextId === null) {
      return;
    }
    event.preventDefault();
    (_tabsNodes$current$ge = tabsNodes.current.get(nextId)) === null || _tabsNodes$current$ge === void 0 || _tabsNodes$current$ge.focus();
    selectTab(nextId, event);
  };
  return {
    handleKeyDown: handleKeyDown,
    setTabNode: setTabNode
  };
};