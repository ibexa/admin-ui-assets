import { ReactNode } from 'react';
import { BaseComponentAttributes } from '@ids-types/general';
import { HelperTextProps } from '@ids-components/HelperText/HelperText.types';
import { LabelProps } from '@ids-components/Label/Label.types';
export interface BaseFieldProps extends BaseComponentAttributes {
    children: ReactNode;
    type: string;
    helperText?: HelperTextProps;
    label?: LabelProps;
}
