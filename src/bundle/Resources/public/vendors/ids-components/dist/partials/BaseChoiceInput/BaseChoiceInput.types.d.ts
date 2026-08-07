import { Ref } from 'react';
import { BaseComponentAriaAttributes } from '@ids-types/general';
export declare const INPUT_CHOICE_TYPE_VALUES: ["checkbox", "radio"];
export type InputChoiceTypesType = (typeof INPUT_CHOICE_TYPE_VALUES)[number];
export interface BaseChoiceInputProps extends BaseComponentAriaAttributes {
    name: string;
    type: InputChoiceTypesType;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    onChange?: (value: boolean, event?: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    onInput?: React.InputEventHandler<HTMLInputElement>;
    checked?: boolean;
    disabled?: boolean;
    error?: boolean;
    id?: string;
    ref?: Ref<HTMLInputElement>;
    value?: string;
}
