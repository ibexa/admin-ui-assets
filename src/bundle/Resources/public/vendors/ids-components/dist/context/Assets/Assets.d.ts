import React from 'react';
import { AssetsProps, AssetsType } from './Assets.types';
export declare const AssetsContext: React.Context<AssetsType>;
declare const AssetsProvider: ({ children, value }: AssetsProps) => React.JSX.Element;
export default AssetsProvider;
