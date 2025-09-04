"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateSimpleNumberId = void 0;
var simpleNumberIdCounter = 0;
var generateSimpleNumberId = exports.generateSimpleNumberId = function generateSimpleNumberId() {
  simpleNumberIdCounter++;
  return simpleNumberIdCounter;
};