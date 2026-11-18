import { BaseDropdownEntry, BaseDropdownItem, BaseDropdownItemGroup } from '@ids-partials/BaseDropdown';
import { BaseComponentAttributes } from '@ids-types/general';
export type ChipDropdownItem = BaseDropdownItem;
export type ChipDropdownItemGroup = BaseDropdownItemGroup<ChipDropdownItem>;
export type ChipDropdownEntry = BaseDropdownEntry<ChipDropdownItem>;
export declare enum ChipDropdownSize {
    Medium = "medium",
    Small = "small"
}
export interface ChipDropdownProps extends BaseComponentAttributes {
    name: string;
    disabled?: boolean;
    icon?: string;
    items?: ChipDropdownEntry[];
    label?: string;
    onChange?: (value: string) => void;
    size?: ChipDropdownSize;
    value?: string;
}
