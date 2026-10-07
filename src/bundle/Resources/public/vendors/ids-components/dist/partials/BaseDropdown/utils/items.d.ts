import { BaseDropdownEntry, BaseDropdownItem, BaseDropdownItemGroup } from '../BaseDropdown.types';
export declare const isDropdownItemGroup: <T extends BaseDropdownItem>(entry: BaseDropdownEntry<T>) => entry is BaseDropdownItemGroup<T>;
export declare const flattenDropdownItems: <T extends BaseDropdownItem>(entries: BaseDropdownEntry<T>[]) => T[];
export declare const filterDropdownEntries: <T extends BaseDropdownItem>(entries: BaseDropdownEntry<T>[], searchTerm: string, filterFunction: (item: T, term: string) => boolean) => BaseDropdownEntry<T>[];
