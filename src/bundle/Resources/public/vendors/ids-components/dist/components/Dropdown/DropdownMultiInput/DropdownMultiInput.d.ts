import React from 'react';
import { DropdownMultiInputProps } from './DropdownMultiInput.types';
export declare const DropdownMultiInput: ({ name, className, items, onChange, value, ...restProps }: DropdownMultiInputProps) => React.JSX.Element;
export declare const DropdownMultiInputStateful: {
    ({ value, onChange, ...restProps }: import("@ids-hoc/withStateValue").WIthStateValueWrappedComponentProps<DropdownMultiInputProps, string[]>): React.JSX.Element;
    displayName: string;
};
