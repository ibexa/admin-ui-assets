import { BaseComponentAttributes } from '@ids-types/general';
export declare enum BadgeSize {
    Medium = "medium",
    Small = "small"
}
export interface BadgeProps extends BaseComponentAttributes {
    value: number;
    size?: BadgeSize;
}
