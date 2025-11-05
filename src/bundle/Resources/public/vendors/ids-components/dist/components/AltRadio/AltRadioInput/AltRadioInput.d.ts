import React from 'react';
import { AltRadioInputProps } from './AltRadioInput.types';
export declare const AltRadioInput: ({ className, label, tileClassName, title, ...inputProps }: AltRadioInputProps) => React.JSX.Element;
export declare const AltRadioInputStateful: {
    ({ checked, onChange, ...restProps }: import("@ids-hoc/withStateChecked").WithStateCheckedWrappedComponentProps<AltRadioInputProps>): React.JSX.Element;
    displayName: string;
};
