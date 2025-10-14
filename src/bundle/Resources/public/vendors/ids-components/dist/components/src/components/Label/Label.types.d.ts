import { ReactNode } from 'react';
import { BaseComponentAttributes } from '@ids-types/general';
export interface LabelProps extends BaseComponentAttributes {
    children: ReactNode;
    htmlFor?: string;
    error?: boolean;
    required?: boolean;
}
