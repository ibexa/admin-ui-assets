"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LinkVariant = exports.LinkType = exports.LinkSize = void 0;
var LinkSize = exports.LinkSize = /*#__PURE__*/function (LinkSize) {
  LinkSize["Medium"] = "medium";
  LinkSize["Small"] = "small";
  return LinkSize;
}({});
var LinkType = exports.LinkType = /*#__PURE__*/function (LinkType) {
  LinkType["Primary"] = "primary";
  LinkType["Secondary"] = "secondary";
  LinkType["Tertiary"] = "tertiary";
  LinkType["SecondaryAlt"] = "secondary-alt";
  LinkType["TertiaryAlt"] = "tertiary-alt";
  return LinkType;
}({});
var LinkVariant = exports.LinkVariant = /*#__PURE__*/function (LinkVariant) {
  LinkVariant["Button"] = "button";
  LinkVariant["Text"] = "text";
  return LinkVariant;
}({});