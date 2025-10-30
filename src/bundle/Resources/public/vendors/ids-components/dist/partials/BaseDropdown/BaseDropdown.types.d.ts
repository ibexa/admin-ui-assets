import { BaseComponentAttributes } from '@ids-types/general';
import { GetNextFocusableItemType } from './components/ItemsContainer/ItemsContainer.types';
export interface BaseDropdownItem {
    id: string;
    label: string;
}
export interface ExtraDropdownItemClickParamsType {
    closeDropdown: () => void;
}
export interface BaseDropdownProps<T extends BaseDropdownItem> extends BaseComponentAttributes {
    isItemSelected: (item: T) => boolean;
    items: T[];
    children?: React.ReactNode;
    disabled?: boolean;
    error?: boolean;
    filterFunction?: (item: T, searchTerm: string) => boolean;
    getItemAttributes?: (item: T) => React.HTMLAttributes<HTMLElement>;
    isEmpty?: boolean;
    getNextFocusableItem?: GetNextFocusableItemType;
    maxVisibleItems?: number;
    onDropdownItemClick: (item: T, extraParams: ExtraDropdownItemClickParamsType) => void;
    renderEmptySelectionInfo?: () => React.ReactNode;
    renderItem?: (item: T) => React.ReactNode;
    renderSelectedItems?: () => React.ReactNode;
    renderSource?: () => React.ReactNode;
}
