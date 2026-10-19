import { BaseDropdownEntry, BaseDropdownItem, BaseDropdownItemGroup } from '@ids-partials/BaseDropdown';
import { BaseComponentAttributes } from '@ids-types/general';
export type DropdownMultiInputItem = BaseDropdownItem;
export type DropdownMultiInputItemGroup = BaseDropdownItemGroup<DropdownMultiInputItem>;
export type DropdownMultiInputEntry = BaseDropdownEntry<DropdownMultiInputItem>;
export declare enum DropdownMultiInputAction {
    Check = "check",
    Uncheck = "uncheck"
}
export interface DropdownMultiInputProps extends BaseComponentAttributes {
    name: string;
    disabled?: boolean;
    error?: boolean;
    items?: DropdownMultiInputEntry[];
    onChange?: (value: string[], itemValue: string, action: DropdownMultiInputAction) => void;
    placeholder?: string;
    value?: string[];
}
