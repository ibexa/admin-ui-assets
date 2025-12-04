"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsEmptyStringValidator = void 0;
const BaseValidator_1 = require("./BaseValidator");
class IsEmptyStringValidator extends BaseValidator_1.BaseValidator {
    getErrorMessage() {
        const Translator = this._translator;
        return Translator.trans(/*@Desc("This field cannot be empty.")*/ 'ibexa.validators.is_empty_string');
    }
    validate(value) {
        return value.trim() !== '';
    }
}
exports.IsEmptyStringValidator = IsEmptyStringValidator;
