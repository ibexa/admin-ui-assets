import React from 'react';
import { TabsChangeEvent, TabsItem } from '../Tabs.types';
type SelectTabFn = (id: string, event: TabsChangeEvent) => void;
export declare const useTabsKeyboardNavigation: (items: TabsItem[], selectedId: string, selectTab: SelectTabFn) => {
    handleKeyDown: (event: React.KeyboardEvent<HTMLUListElement>) => void;
    setTabNode: (id: string) => (node: HTMLButtonElement | null) => void;
};
export {};
