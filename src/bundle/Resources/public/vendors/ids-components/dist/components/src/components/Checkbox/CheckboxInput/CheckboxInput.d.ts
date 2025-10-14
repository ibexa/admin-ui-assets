import React from 'react';
import { CheckboxInputProps } from './CheckboxInput.types';
export declare const CheckboxInput: ({ className, indeterminate, ...restProps }: CheckboxInputProps) => React.JSX.Element;
export declare const CheckboxInputStateful: {
    ({ checked, onChange, ...restProps }: import("@ids-hoc/withStateChecked").WrappedComponentProps<CheckboxInputProps>): React.JSX.Element;
    displayName: string;
};
