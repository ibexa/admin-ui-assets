import React from 'react';
import { DropdownSingleInputProps } from './DropdownSingleInput.types';
export declare const DropdownSingleInput: ({ name, className, items, onChange, value, ...restProps }: DropdownSingleInputProps) => React.JSX.Element;
export declare const DropdownSingleInputStateful: {
    ({ value, onChange, ...restProps }: import("@ids-hoc/withStateValue").WIthStateValueWrappedComponentProps<DropdownSingleInputProps, string>): React.JSX.Element;
    displayName: string;
};
