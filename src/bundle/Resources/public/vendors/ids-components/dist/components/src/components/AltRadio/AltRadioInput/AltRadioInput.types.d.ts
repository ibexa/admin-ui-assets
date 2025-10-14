import { ReactNode } from 'react';
import { BaseChoiceInputProps } from '@ids-partials/BaseChoiceInput';
export interface AltRadioInputProps extends Omit<BaseChoiceInputProps, 'type'> {
    label: ReactNode;
    tileClassName?: string;
    value: string;
}
