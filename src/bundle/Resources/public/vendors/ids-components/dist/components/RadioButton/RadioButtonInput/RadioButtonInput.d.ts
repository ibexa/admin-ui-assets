import React from 'react';
import { RadioButtonInputProps } from './RadioButtonInput.types';
export declare const RadioButtonInput: ({ className, ...restProps }: RadioButtonInputProps) => React.JSX.Element;
export declare const RadioButtonInputStateful: {
    ({ checked, onChange, ...restProps }: import("@ids-hoc/withStateChecked").WithStateCheckedWrappedComponentProps<RadioButtonInputProps>): React.JSX.Element;
    displayName: string;
};
