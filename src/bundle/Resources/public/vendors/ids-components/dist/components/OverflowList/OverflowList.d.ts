import React from 'react';
import { OverflowListProps } from './OverflowList.types';
export declare const OverflowList: <ItemProps extends {
    id: string;
}>({ className, items, renderItem, renderMore, }: OverflowListProps<ItemProps>) => React.JSX.Element;
