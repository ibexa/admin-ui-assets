import React from 'react';
import { RadioButtonsListFieldProps } from './RadioButtonsListField.types';
export declare const RadioButtonsListField: ({ className, direction, helperText, helperTextExtra, id, items, label, labelExtra, name, onChange, required, value, }: RadioButtonsListFieldProps) => React.JSX.Element;
export declare const RadioButtonsListFieldStateful: {
    ({ value, onChange, ...restProps }: import("@ids-hoc/withStateValue").WrappedComponentProps<RadioButtonsListFieldProps, string>): React.JSX.Element;
    displayName: string;
};
