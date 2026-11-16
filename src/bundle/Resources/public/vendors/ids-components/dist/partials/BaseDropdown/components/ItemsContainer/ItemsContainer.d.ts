import React from 'react';
import { ItemsContainerProps } from './ItemsContainer.types';
import { BaseDropdownItem } from '../../BaseDropdown.types';
export declare const ItemsContainer: <T extends BaseDropdownItem>({ closeDropdown, containerAttributes, filterFunction, getItemAttributes, getNextFocusableItem, hasSearch, isItemSelected, isOpen, items, maxVisibleItems, minWidth, onDropdownItemClick, referenceElement, renderFooter, renderItem, }: ItemsContainerProps<T>) => React.JSX.Element | null;
