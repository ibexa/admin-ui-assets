import { BaseValidator, type ValidationResult } from '@ids-core';
import { InputTextFieldValueType } from './InputTextField.types';
export declare const useInitValidators: ({ required }: {
    required: boolean;
}) => BaseValidator<InputTextFieldValueType>[];
export declare const useValidateInput: ({ validators, value, }: {
    validators: BaseValidator<InputTextFieldValueType>[];
    value: InputTextFieldValueType;
}) => ValidationResult;
