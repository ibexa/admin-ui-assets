import { BaseComponentAriaAttributes, ComponentEntryDataType } from '@ids-types/general';
import { BaseInputProps } from '@ids-partials/BaseInput/BaseInput.types';
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
    onInput?: React.InputEventHandler<HTMLInputElement>;
    disabled?: boolean;
    error?: boolean;
    extraInputAttrs?: BaseInputProps['extraInputAttrs'];
    hasSearchAction?: boolean;
    id?: string;
    placeholder?: string;
    processActions?: (actions: ComponentEntryDataType[]) => ComponentEntryDataType[];
    readOnly?: boolean;
    ref?: React.Ref<HTMLInputElement>;
    required?: boolean;
    searchButtonType?: 'button' | 'reset' | 'submit';
    size?: InputTextInputSize;
    type?: InputTextInputType;
    value?: string | number;
}
