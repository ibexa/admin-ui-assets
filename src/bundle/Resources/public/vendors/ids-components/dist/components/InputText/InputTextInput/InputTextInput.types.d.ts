import { BaseComponentAriaAttributes, ComponentEntryDataType } from '@ids-types/general';
import React from 'react';
export declare enum InputTextInputSize {
    Medium = "medium",
    Small = "small"
}
export declare const INPUT_TEXT_TYPE_VALUES: ["text", "password", "email", "number", "tel", "search", "url"];
export type InputTextInputType = (typeof INPUT_TEXT_TYPE_VALUES)[number];
export interface InputTextInputProps extends BaseComponentAriaAttributes {
    name: string;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    onChange?: (value: string, event?: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    onInput?: (value: string, event?: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    error?: boolean;
    id?: string;
    placeholder?: string;
    processActions?: (actions: ComponentEntryDataType[]) => ComponentEntryDataType[];
    readOnly?: boolean;
    ref?: React.Ref<HTMLInputElement>;
    required?: boolean;
    size?: InputTextInputSize;
    type?: InputTextInputType;
    value?: string | number;
}
