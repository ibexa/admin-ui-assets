"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseValidator_1 = __importDefault(require("./BaseValidator"));
class IsEmptyStringValidator extends BaseValidator_1.default {
    getErrorMessage() {
        const Translator = this._translator;
        return Translator.trans(/*@Desc("This field cannot be empty.")*/ 'ibexa.validators.is_empty_string');
    }
    validate(value) {
        return value.trim() !== '';
    }
}
exports.default = IsEmptyStringValidator;
