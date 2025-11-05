import { TranslatorType } from '../types/translator';
export declare abstract class BaseValidator<T> {
    protected _translator: TranslatorType;
    constructor(translator: TranslatorType);
    abstract getErrorMessage(): string;
    abstract validate(value: T): boolean;
}
