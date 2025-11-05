import React from 'react';
import { ToggleButtonInputProps } from './ToggleButtonInput.types';
export declare const ToggleButtonInput: ({ className, offLabel, onLabel, size, title, ...inputProps }: ToggleButtonInputProps) => React.JSX.Element;
export declare const ToggleButtonInputStateful: {
    ({ checked, onChange, ...restProps }: import("@ids-hoc/withStateChecked").WithStateCheckedWrappedComponentProps<ToggleButtonInputProps>): React.JSX.Element;
    displayName: string;
};
