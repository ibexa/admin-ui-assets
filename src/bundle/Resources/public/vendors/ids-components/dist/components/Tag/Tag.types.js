"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TagType = exports.TagSize = exports.TagGhostType = void 0;
var TagSize = exports.TagSize = /*#__PURE__*/function (TagSize) {
  TagSize["Medium"] = "medium";
  TagSize["Small"] = "small";
  return TagSize;
}({});
var TagGhostType = exports.TagGhostType = /*#__PURE__*/function (TagGhostType) {
  TagGhostType["SuccessGhost"] = "success-ghost";
  TagGhostType["ErrorGhost"] = "error-ghost";
  TagGhostType["NeutralGhost"] = "neutral-ghost";
  return TagGhostType;
}({});
var TagType = exports.TagType = /*#__PURE__*/function (TagType) {
  TagType["Primary"] = "primary";
  TagType["PrimaryAlt"] = "primary-alt";
  TagType["Success"] = "success";
  TagType["Info"] = "info";
  TagType["Warning"] = "warning";
  TagType["Error"] = "error";
  TagType["Neutral"] = "neutral";
  TagType["IconTag"] = "icon-tag";
  return TagType;
}({});