import { BaseComponentAttributes } from '@ids-types/general';
import { GetNextFocusableItemType } from './components/ItemsContainer/ItemsContainer.types';
export declare enum DropdownType {
    Input = "input",
    Chip = "chip"
}
export declare enum DropdownSize {
    Medium = "medium",
    Small = "small"
}
export interface DropdownAppearanceProps {
    icon?: string;
    label?: string;
    size?: DropdownSize;
    type?: DropdownType;
}
export interface BaseDropdownItem {
    id: string;
    label: string;
}
export interface BaseDropdownItemGroup<T extends BaseDropdownItem> {
    items: BaseDropdownEntry<T>[];
    label: string;
    id?: string;
}
export type BaseDropdownEntry<T extends BaseDropdownItem> = T | BaseDropdownItemGroup<T>;
export interface ExtraDropdownItemClickParamsType {
    closeDropdown: () => void;
}
export interface BaseDropdownProps<T extends BaseDropdownItem> extends BaseComponentAttributes, DropdownAppearanceProps {
    isItemSelected: (item: T) => boolean;
    items: BaseDropdownEntry<T>[];
    children?: React.ReactNode;
    disabled?: boolean;
    error?: boolean;
    filterFunction?: (item: T, searchTerm: string) => boolean;
    getItemAttributes?: (item: T) => React.HTMLAttributes<HTMLElement>;
    isEmpty?: boolean;
    getNextFocusableItem?: GetNextFocusableItemType;
    maxVisibleItems?: number;
    onDropdownItemClick: (item: T, extraParams: ExtraDropdownItemClickParamsType) => void;
    placeholder?: string;
    renderEmptySelectionInfo?: () => React.ReactNode;
    renderItem?: (item: T) => React.ReactNode;
    renderSelectedItems?: () => React.ReactNode;
    renderSource?: () => React.ReactNode;
}
