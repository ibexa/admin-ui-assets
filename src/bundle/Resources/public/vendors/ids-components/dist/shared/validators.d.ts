import { BaseValidator, type ValidationResult } from '@ids-core';
export declare const validateInput: <T>(value: T, validators: BaseValidator<T>[]) => ValidationResult;
