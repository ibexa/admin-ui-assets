import { ItemsContainerMoveActiveFocusDirection } from '@ids-partials/BaseDropdown/components/ItemsContainer/ItemsContainer.types';
export interface ExtraParamsType {
    itemsList: HTMLUListElement;
    search: HTMLInputElement | null;
}
export declare const getNextFocusableItem: (getFocusableElements: (extraProps: ExtraParamsType) => HTMLElement[], element: HTMLElement, direction: ItemsContainerMoveActiveFocusDirection, extraParams: ExtraParamsType) => HTMLElement | null;
