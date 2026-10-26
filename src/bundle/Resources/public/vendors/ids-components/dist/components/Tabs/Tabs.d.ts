import React from 'react';
import { TabsProps, TabsStatefulProps } from './Tabs.types';
export declare const Tabs: ({ className, extraAria, idPrefix, items, onChange, selectedId }: TabsProps) => React.JSX.Element;
export declare const TabsStateful: ({ initialSelectedId, items, onChange, ...restProps }: TabsStatefulProps) => React.JSX.Element;
