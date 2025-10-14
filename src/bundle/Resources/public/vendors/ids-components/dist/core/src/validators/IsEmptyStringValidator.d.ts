import BaseValidator from './BaseValidator';
export default class IsEmptyStringValidator extends BaseValidator<string> {
    getErrorMessage(): string;
    validate(value: string): boolean;
}
