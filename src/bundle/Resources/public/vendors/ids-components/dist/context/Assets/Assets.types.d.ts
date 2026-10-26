import { ReactNode } from 'react';
export type GetIconPathType = (iconName: string) => string;
export interface AssetsType {
    getIconPath: GetIconPathType;
}
export interface AssetsProps {
    children: ReactNode;
    value: AssetsType;
}
