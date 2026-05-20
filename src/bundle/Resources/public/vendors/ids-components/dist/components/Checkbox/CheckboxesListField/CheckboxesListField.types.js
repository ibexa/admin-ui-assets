"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckboxesListFieldAction = void 0;
Object.defineProperty(exports, "CheckboxesListFieldDirection", {
  enumerable: true,
  get: function get() {
    return _BaseInputsList.Direction;
  }
});
var _BaseInputsList = require("../../../partials/BaseInputsList/BaseInputsList.types");
var CheckboxesListFieldAction = exports.CheckboxesListFieldAction = /*#__PURE__*/function (CheckboxesListFieldAction) {
  CheckboxesListFieldAction["Check"] = "check";
  CheckboxesListFieldAction["Uncheck"] = "uncheck";
  return CheckboxesListFieldAction;
}({});