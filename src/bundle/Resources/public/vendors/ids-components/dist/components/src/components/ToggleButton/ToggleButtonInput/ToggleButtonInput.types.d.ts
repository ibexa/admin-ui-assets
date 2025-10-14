import { BaseChoiceInputProps } from '@ids-partials/BaseChoiceInput';
export declare enum ToggleButtonInputSize {
    Small = "small",
    Medium = "medium"
}
export type ToggleButtonInputProps = Omit<BaseChoiceInputProps, 'type' | 'error'> & {
    enabledLabel?: string;
    disabledLabel?: string;
    onChange?: (checked: boolean) => void;
    size?: ToggleButtonInputSize;
    value: string;
};
