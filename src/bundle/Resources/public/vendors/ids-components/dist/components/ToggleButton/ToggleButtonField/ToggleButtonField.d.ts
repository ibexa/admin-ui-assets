import React from 'react';
import { ToggleButtonFieldProps } from './ToggleButtonField.types';
export declare const ToggleButtonField: ({ checked, className, helperText, helperTextExtra, id, input, label, labelExtra, name, onChange, required, }: ToggleButtonFieldProps) => React.JSX.Element;
export declare const ToggleButtonFieldStateful: {
    ({ checked, onChange, ...restProps }: import("@ids-hoc/withStateChecked").WithStateCheckedWrappedComponentProps<ToggleButtonFieldProps>): React.JSX.Element;
    displayName: string;
};
