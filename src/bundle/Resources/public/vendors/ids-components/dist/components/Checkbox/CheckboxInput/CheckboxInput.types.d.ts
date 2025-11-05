import { BaseChoiceInputProps } from '@ids-partials/BaseChoiceInput';
export type CheckboxInputProps = Omit<BaseChoiceInputProps, 'type'> & {
    checked?: boolean;
    indeterminate?: boolean;
    value: string;
};
