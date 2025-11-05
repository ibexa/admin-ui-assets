import { ReactNode } from 'react';
import { BaseComponentAttributes } from '@ids-types/general';
export declare enum HelperTextType {
    Default = "default",
    Error = "error"
}
export interface HelperTextProps extends BaseComponentAttributes {
    children: ReactNode;
    type?: HelperTextType;
}
