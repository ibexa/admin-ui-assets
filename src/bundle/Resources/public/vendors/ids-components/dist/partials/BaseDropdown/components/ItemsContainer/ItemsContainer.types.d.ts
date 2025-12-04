import { BaseDropdownItem, ExtraDropdownItemClickParamsType } from '../../BaseDropdown.types';
export declare enum ItemsContainerMoveActiveFocusDirection {
    Up = "up",
    Down = "down"
}
export type GetNextFocusableItemType = (element: HTMLElement, direction: ItemsContainerMoveActiveFocusDirection, { itemsList, search }: {
    itemsList: HTMLUListElement;
    search: HTMLInputElement | null;
}) => HTMLElement | null;
export type ItemsContainerItemsStylesType = React.CSSProperties & {
    '--max-visible-items'?: number;
};
export interface ItemsContainerProps<T extends BaseDropdownItem> {
    closeDropdown: () => void;
    filterFunction: (item: T, searchTerm: string) => boolean;
    getItemAttributes: (item: T) => React.HTMLAttributes<HTMLElement>;
    getNextFocusableItem: GetNextFocusableItemType;
    isItemSelected: (item: T) => boolean;
    isOpen: boolean;
    items: T[];
    maxVisibleItems: number;
    onDropdownItemClick: (item: T, extraParams: ExtraDropdownItemClickParamsType) => void;
    referenceElement: HTMLDivElement | null;
    renderItem: (item: T) => React.ReactNode;
}
