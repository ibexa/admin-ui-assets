import React from 'react';
import { TabsChangeEvent, TabsItem } from '../../Tabs.types';
interface TabsTabProps {
    id: string;
    isSelected: boolean;
    item: TabsItem;
    onSelect: (id: string, event: TabsChangeEvent) => void;
    panelId?: string;
    setRef: (node: HTMLButtonElement | null) => void;
}
export declare const TabsTab: ({ id, isSelected, item, onSelect, panelId, setRef }: TabsTabProps) => React.JSX.Element;
export {};
