import React, { ReactNode } from 'react';
interface TabsPanelProps {
    children: ReactNode;
    id: string;
    isSelected: boolean;
    tabId: string;
}
export declare const TabsPanel: ({ children, id, isSelected, tabId }: TabsPanelProps) => React.JSX.Element;
export {};
