import React from 'react';
import { RadioButtonFieldProps } from './RadioButtonField.types';
export declare const RadioButtonField: ({ className, inputWrapperClassName, label, labelClassName, ...inputProps }: RadioButtonFieldProps) => React.JSX.Element;
export declare const RadioButtonFieldStateful: {
    ({ checked, onChange, ...restProps }: import("@ids-hoc/withStateChecked").WithStateCheckedWrappedComponentProps<RadioButtonFieldProps>): React.JSX.Element;
    displayName: string;
};
