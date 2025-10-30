"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNextFocusableItem = void 0;
var _ItemsContainer = require("../../../partials/BaseDropdown/components/ItemsContainer/ItemsContainer.types");
var getNextFocusableItem = exports.getNextFocusableItem = function getNextFocusableItem(getFocusableElements, element, direction, extraParams) {
  var focusableElements = getFocusableElements(extraParams);
  var focusedItemIndex = focusableElements.findIndex(function (el) {
    return el === element;
  });
  if (direction === _ItemsContainer.ItemsContainerMoveActiveFocusDirection.Down) {
    var nextElement = focusableElements[focusedItemIndex + 1]; // eslint-disable-line no-magic-numbers

    return nextElement instanceof HTMLElement ? nextElement : element;
  }
  var prevElement = focusableElements[focusedItemIndex - 1]; // eslint-disable-line no-magic-numbers

  return prevElement instanceof HTMLElement ? prevElement : element;
};