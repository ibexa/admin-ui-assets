import { ReactNode } from 'react';

export type ExtraAriaType = Record<`aria-${string}`, boolean | number | string>;

export interface BaseComponentAttributes {
    className?: string;
    title?: string;
};

export interface BaseComponentAriaAttributes extends BaseComponentAttributes {
    extraAria?: ExtraAriaType;
};

export interface ComponentEntryDataType {
    id: string;
    component: ReactNode;
};
