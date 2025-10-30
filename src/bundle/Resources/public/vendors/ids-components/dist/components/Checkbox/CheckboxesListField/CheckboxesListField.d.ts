import React from 'react';
import { CheckboxesListFieldProps } from './CheckboxesListField.types';
export declare const CheckboxesListField: ({ className, direction, helperText, helperTextExtra, id, items, label, labelExtra, name, onChange, required, value, }: CheckboxesListFieldProps) => React.JSX.Element;
export declare const CheckboxesListFieldStateful: {
    ({ value, onChange, ...restProps }: import("@ids-hoc/withStateValue").WIthStateValueWrappedComponentProps<CheckboxesListFieldProps, string[]>): React.JSX.Element;
    displayName: string;
};
