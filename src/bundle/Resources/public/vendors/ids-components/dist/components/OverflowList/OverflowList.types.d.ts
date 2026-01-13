import { ReactNode } from 'react';
import { BaseComponentAttributes } from '@ids-types/general';
export declare enum OverflowListCalculateAction {
    None = "none",
    CalculateItems = "calculate-items",
    CalculateOverflow = "calculate-overflow"
}
export interface OverflowListProps<ItemProps> extends BaseComponentAttributes {
    renderItem: (item: ItemProps) => NonNullable<ReactNode>;
    renderMore: ({ hiddenCount }: {
        hiddenCount: number;
    }) => NonNullable<ReactNode>;
    items?: ItemProps[];
}
