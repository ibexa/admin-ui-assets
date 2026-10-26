"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlertVariant = exports.AlertType = exports.AlertRole = void 0;
var AlertType = exports.AlertType = /*#__PURE__*/function (AlertType) {
  AlertType["Success"] = "success";
  AlertType["Warning"] = "warning";
  AlertType["Error"] = "error";
  AlertType["Info"] = "info";
  return AlertType;
}({});
var AlertVariant = exports.AlertVariant = /*#__PURE__*/function (AlertVariant) {
  AlertVariant["Floating"] = "floating";
  AlertVariant["Local"] = "local";
  AlertVariant["Toast"] = "toast";
  return AlertVariant;
}({});
var AlertRole = exports.AlertRole = /*#__PURE__*/function (AlertRole) {
  AlertRole["Alert"] = "alert";
  AlertRole["Status"] = "status";
  return AlertRole;
}({});