import React from 'react';
import { ChipDropdownProps } from './ChipDropdown.types';
export declare const ChipDropdown: ({ name, className, disabled, icon, items, label, onChange, size, value, ...restProps }: ChipDropdownProps) => React.JSX.Element;
export declare const ChipDropdownStateful: {
    ({ value, onChange, ...restProps }: import("@ids-hoc/withStateValue").WIthStateValueWrappedComponentProps<ChipDropdownProps, string>): React.JSX.Element;
    displayName: string;
};
