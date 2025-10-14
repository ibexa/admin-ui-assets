import { BaseComponentAriaAttributes, ComponentEntryDataType } from '@ids-types/general';
export declare enum InputTextInputSize {
    Medium = "medium",
    Small = "small"
}
export declare const INPUT_TYPE_VALUES: ["text", "password", "email", "number", "tel", "search", "url"];
export type InputTextInputType = (typeof INPUT_TYPE_VALUES)[number];
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
    required?: boolean;
    size?: InputTextInputSize;
    type?: InputTextInputType;
    value?: string | number;
}
