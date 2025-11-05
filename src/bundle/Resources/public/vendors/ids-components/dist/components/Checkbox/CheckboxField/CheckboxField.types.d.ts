import { ReactNode } from 'react';
import { CheckboxInputProps } from '../CheckboxInput';
export interface CheckboxFieldProps extends CheckboxInputProps {
    id: string;
    label: ReactNode;
    inputWrapperClassName?: string;
    labelClassName?: string;
}
