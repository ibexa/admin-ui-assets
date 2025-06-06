import { ReactNode } from 'react';
export interface AccordionProps {
    children: ReactNode;
    header: ReactNode;
    initiallyExpanded?: boolean;
    onHandleExpand: (isExpanded: boolean) => void;
}
