import { BaseValidator } from './BaseValidator';
export class IsEmptyStringValidator extends BaseValidator {
    getErrorMessage() {
        const Translator = this._translator;
        return Translator.trans(/*@Desc("This field cannot be empty.")*/ 'ibexa.validators.is_empty_string');
    }
    validate(value) {
        return value.trim() !== '';
    }
}
