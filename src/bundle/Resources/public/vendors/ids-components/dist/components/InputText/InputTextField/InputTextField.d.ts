import React from 'react';
import { InputTextFieldProps, InputTextFieldValueType } from './InputTextField.types';
export declare const InputTextField: ({ className, helperText, helperTextExtra, id, input, label, labelExtra, name, onChange, onValidate, required, value, }: InputTextFieldProps) => React.JSX.Element;
export declare const InputTextFieldStateful: {
    ({ value, onChange, ...restProps }: import("@ids-hoc/withStateValue").WIthStateValueWrappedComponentProps<InputTextFieldProps, InputTextFieldValueType>): React.JSX.Element;
    displayName: string;
};
