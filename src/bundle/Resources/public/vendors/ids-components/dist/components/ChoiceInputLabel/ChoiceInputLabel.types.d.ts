import { ReactNode } from 'react';
import { BaseComponentAttributes } from '@ids-types/general';
export interface ChoiceInputLabelProps extends BaseComponentAttributes {
    children: ReactNode;
    htmlFor: string;
}
