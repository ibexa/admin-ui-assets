import { KeyboardEvent, MouseEvent, ReactNode } from 'react';
import { BaseComponentAriaAttributes } from '@ids-types/general';
export interface TabsItem {
    content?: ReactNode;
    hasError?: boolean;
    id: string;
    isDisabled?: boolean;
    label: ReactNode;
}
export type TabsChangeEvent = KeyboardEvent<HTMLElement> | MouseEvent<HTMLElement>;
export interface TabsProps extends BaseComponentAriaAttributes {
    idPrefix?: string;
    items: TabsItem[];
    onChange?: (id: string, event: TabsChangeEvent) => void;
    selectedId: string;
}
export interface TabsStatefulProps extends Omit<TabsProps, 'selectedId'> {
    initialSelectedId?: string;
}
