import { BaseDropdownEntry, BaseDropdownItem, BaseDropdownItemGroup } from '@ids-partials/BaseDropdown';
import { BaseComponentAttributes } from '@ids-types/general';
export type DropdownSingleInputItem = BaseDropdownItem;
export type DropdownSingleInputItemGroup = BaseDropdownItemGroup<DropdownSingleInputItem>;
export type DropdownSingleInputEntry = BaseDropdownEntry<DropdownSingleInputItem>;
export interface DropdownSingleInputProps extends BaseComponentAttributes {
    name: string;
    disabled?: boolean;
    error?: boolean;
    items?: DropdownSingleInputEntry[];
    onChange?: (value: string) => void;
    placeholder?: string;
    value?: string;
}
