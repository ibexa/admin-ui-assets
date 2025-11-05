import { BaseChoiceInputProps } from '@ids-partials/BaseChoiceInput';
export declare enum ToggleButtonInputSize {
    Small = "small",
    Medium = "medium"
}
export type ToggleButtonInputProps = Omit<BaseChoiceInputProps, 'type' | 'error'> & {
    onLabel?: string;
    offLabel?: string;
    onChange?: (checked: boolean) => void;
    size?: ToggleButtonInputSize;
};
