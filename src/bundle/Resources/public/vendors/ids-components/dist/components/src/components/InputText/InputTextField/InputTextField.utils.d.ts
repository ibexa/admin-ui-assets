import BaseValidator from '@ibexa/ids-core/validators/BaseValidator';
import { ValidationResult } from '@ibexa/ids-core/types/validation';
import { InputTextFieldValueType } from './InputTextField.types';
export declare const useInitValidators: ({ required }: {
    required: boolean;
}) => BaseValidator<InputTextFieldValueType>[];
export declare const useValidateInput: ({ validators, value, }: {
    validators: BaseValidator<InputTextFieldValueType>[];
    value: InputTextFieldValueType;
}) => ValidationResult;
