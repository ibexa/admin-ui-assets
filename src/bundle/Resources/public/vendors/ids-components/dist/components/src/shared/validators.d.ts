import BaseValidator from '@ibexa/ids-core/validators/BaseValidator';
import type { ValidationResult } from '@ibexa/ids-core/types/validation';
export declare const validateInput: <T>(value: T, validators: BaseValidator<T>[]) => ValidationResult;
