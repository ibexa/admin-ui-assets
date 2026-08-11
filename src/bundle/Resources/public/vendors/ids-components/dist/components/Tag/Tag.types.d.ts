import type { CSSProperties, ReactNode } from 'react';
import { BaseComponentAttributes } from '@ids-types/general';
export declare enum TagSize {
    Medium = "medium",
    Small = "small"
}
export declare enum TagGhostType {
    SuccessGhost = "success-ghost",
    ErrorGhost = "error-ghost",
    NeutralGhost = "neutral-ghost"
}
export declare enum TagType {
    Primary = "primary",
    PrimaryAlt = "primary-alt",
    Success = "success",
    Info = "info",
    Warning = "warning",
    Error = "error",
    Neutral = "neutral",
    IconTag = "icon-tag"
}
export interface TagCustomColors {
    text: string;
    background: string;
    border?: string;
}
export interface TagProps extends BaseComponentAttributes {
    children: ReactNode;
    type: TagType | TagGhostType;
    icon?: string;
    size?: TagSize;
    isDark?: boolean;
    customColors?: TagCustomColors;
}
export type TagCustomColorsStyle = CSSProperties & {
    '--ids-tag-custom-text-color': string;
    '--ids-tag-custom-bg-color': string;
    '--ids-tag-custom-border-color': string;
};
