"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNextSelectableId = exports.checkIsNavigationKey = void 0;
var INDEX_STEP = 1;
var NAVIGATION_KEYS = ['ArrowLeft', 'ArrowRight', 'End', 'Home'];
var checkIsNavigationKey = exports.checkIsNavigationKey = function checkIsNavigationKey(key) {
  return NAVIGATION_KEYS.includes(key);
};
var getNextSelectableId = exports.getNextSelectableId = function getNextSelectableId(items, selectedId, key) {
  var enabledItems = items.filter(function (item) {
    return !item.isDisabled;
  });
  if (enabledItems.length === 0) {
    return null;
  }
  var lastIndex = enabledItems.length - INDEX_STEP;
  var currentIndex = enabledItems.findIndex(function (item) {
    return item.id === selectedId;
  });
  var nextIndexByKey = {
    ArrowLeft: currentIndex <= 0 ? lastIndex : currentIndex - INDEX_STEP,
    ArrowRight: currentIndex >= lastIndex ? 0 : currentIndex + INDEX_STEP,
    End: lastIndex,
    Home: 0
  };
  var nextIndex = nextIndexByKey[key];
  if (nextIndex === undefined) {
    return null;
  }
  return enabledItems[nextIndex].id;
};