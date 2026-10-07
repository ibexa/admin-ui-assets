import { BaseDropdownEntry, BaseDropdownItem } from '../../BaseDropdown.types';
export interface ItemsListProps<T extends BaseDropdownItem> {
    entries: BaseDropdownEntry<T>[];
    getItemAttributes: (item: T) => React.HTMLAttributes<HTMLElement>;
    groupIdPrefix: string;
    isItemSelected: (item: T) => boolean;
    onItemClick: (item: T) => void;
    renderItem: (item: T) => React.ReactNode;
    firstFocusableItemId?: string;
}
