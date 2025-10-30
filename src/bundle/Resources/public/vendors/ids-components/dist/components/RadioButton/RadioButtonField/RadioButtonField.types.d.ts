import { ReactNode } from 'react';
import { RadioButtonInputProps } from '../RadioButtonInput';
export interface RadioButtonFieldProps extends RadioButtonInputProps {
    id: string;
    label: ReactNode;
    inputWrapperClassName?: string;
    labelClassName?: string;
}
