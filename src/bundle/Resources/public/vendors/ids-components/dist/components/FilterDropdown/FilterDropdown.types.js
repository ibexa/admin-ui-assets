"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilterDropdownType = exports.FilterDropdownAction = void 0;
var FilterDropdownType = exports.FilterDropdownType = /*#__PURE__*/function (FilterDropdownType) {
  FilterDropdownType["Default"] = "default";
  FilterDropdownType["Dashboard"] = "dashboard";
  FilterDropdownType["MoreFilters"] = "more-filters";
  FilterDropdownType["MoreFiltersSmall"] = "more-filters-small";
  return FilterDropdownType;
}({});
var FilterDropdownAction = exports.FilterDropdownAction = /*#__PURE__*/function (FilterDropdownAction) {
  FilterDropdownAction["Check"] = "check";
  FilterDropdownAction["Uncheck"] = "uncheck";
  FilterDropdownAction["Clear"] = "clear";
  return FilterDropdownAction;
}({});