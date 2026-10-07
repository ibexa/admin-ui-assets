import React from 'react';
import { BaseDropdownItem } from '../../BaseDropdown.types';
import { ItemsListProps } from './ItemsList.types';
export declare const ItemsList: <T extends BaseDropdownItem>({ entries, firstFocusableItemId, getItemAttributes, groupIdPrefix, isItemSelected, onItemClick, renderItem, }: ItemsListProps<T>) => React.JSX.Element;
