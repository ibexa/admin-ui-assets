import React from 'react';
import { BaseDropdownItem, BaseDropdownProps } from './BaseDropdown.types';
export declare const BaseDropdown: <T extends BaseDropdownItem>({ children, isEmpty, isItemSelected, items, disabled, error, size, filterFunction, getItemAttributes, getNextFocusableItem, maxVisibleItems, onDropdownItemClick, placeholder, renderEmptySelectionInfo, renderItem, renderSelectedItems, renderSource, className, }: BaseDropdownProps<T>) => React.JSX.Element;
