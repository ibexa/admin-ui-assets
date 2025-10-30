import { BaseComponentAttributes } from '@ids-types/general';
import { BaseDropdownItem } from '@ids-partials/BaseDropdown';
export type DropdownMultiInputItem = BaseDropdownItem;
export declare enum DropdownMultiInputAction {
    Check = "check",
    Uncheck = "uncheck"
}
export interface DropdownMultiInputProps extends BaseComponentAttributes {
    name: string;
    disabled?: boolean;
    error?: boolean;
    items?: DropdownMultiInputItem[];
    onChange?: (value: string[], itemValue: string, action: DropdownMultiInputAction) => void;
    value?: string[];
}
