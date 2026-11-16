import React from 'react';
import { FilterDropdownProps } from './FilterDropdown.types';
export declare const FilterDropdown: ({ label, name, className, hasSearch, items, onChange, type, value, ...restProps }: FilterDropdownProps) => React.JSX.Element;
export declare const FilterDropdownStateful: {
    ({ value, onChange, ...restProps }: import("@ids-hoc/withStateValue").WIthStateValueWrappedComponentProps<FilterDropdownProps, string[]>): React.JSX.Element;
    displayName: string;
};
