import React from 'react';
import { CheckboxFieldProps } from './CheckboxField.types';
export declare const CheckboxField: ({ className, label, inputWrapperClassName, labelClassName, ...inputProps }: CheckboxFieldProps) => React.JSX.Element;
export declare const CheckboxFieldStateful: {
    ({ checked, onChange, ...restProps }: import("@ids-hoc/withStateChecked").WithStateCheckedWrappedComponentProps<CheckboxFieldProps>): React.JSX.Element;
    displayName: string;
};
