import React from 'react';
import { ItemsContainerProps } from './ItemsContainer.types';
import { BaseDropdownItem } from '../../BaseDropdown.types';
export declare const ItemsContainer: <T extends BaseDropdownItem>({ closeDropdown, filterFunction, getItemAttributes, getNextFocusableItem, isItemSelected, isOpen, items, maxVisibleItems, onDropdownItemClick, referenceElement, renderItem, }: ItemsContainerProps<T>) => React.JSX.Element | null;
