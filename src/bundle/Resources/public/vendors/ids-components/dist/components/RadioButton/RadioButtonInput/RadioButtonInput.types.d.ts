import { BaseChoiceInputProps } from '@ids-partials/BaseChoiceInput';
export type RadioButtonInputProps = Omit<BaseChoiceInputProps, 'type'> & {
    value: string;
};
