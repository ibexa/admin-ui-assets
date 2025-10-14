import React from 'react';
import { InputTextInputProps } from './InputTextInput.types';
export declare const InputTextInput: ({ name, onBlur, onChange, onFocus, onInput, disabled, error, extraAria, className, id, placeholder, processActions, readOnly, required, size, title, type, value, }: InputTextInputProps) => React.JSX.Element;
export declare const InputTextInputStateful: {
    ({ value, onChange, ...restProps }: import("@ids-hoc/withStateValue").WrappedComponentProps<InputTextInputProps, string | number>): React.JSX.Element;
    displayName: string;
};
