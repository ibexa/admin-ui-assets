import React from 'react';
import { AltRadiosListFieldProps } from './AltRadiosListField.types';
export declare const AltRadiosListField: ({ className, direction, helperText, helperTextExtra, id, items, label, labelExtra, name, onChange, required, value, }: AltRadiosListFieldProps) => React.JSX.Element;
export declare const AltRadiosListFieldStateful: {
    ({ value, onChange, ...restProps }: import("@ids-hoc/withStateValue").WrappedComponentProps<AltRadiosListFieldProps, string>): React.JSX.Element;
    displayName: string;
};
