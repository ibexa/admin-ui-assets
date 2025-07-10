import { ReactNode } from 'react';
import { BaseComponentAttributes } from '@ids-types/general';
export declare const HELPER_TEXT_TYPE_VALUES: readonly ["default", "error"];
export type HelperTextTypesType = (typeof HELPER_TEXT_TYPE_VALUES)[number];
export interface HelperTextProps extends BaseComponentAttributes {
    children: ReactNode;
    type?: HelperTextTypesType;
}
