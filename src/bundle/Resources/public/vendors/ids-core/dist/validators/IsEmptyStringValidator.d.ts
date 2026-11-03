import { BaseValidator } from './BaseValidator';
export declare class IsEmptyStringValidator extends BaseValidator<string> {
    getErrorMessage(): string;
    validate(value: string): boolean;
}
