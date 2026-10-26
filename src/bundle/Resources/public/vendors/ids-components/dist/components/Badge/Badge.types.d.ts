import { BaseComponentAttributes } from '@ids-types/general';
export declare enum BadgeSize {
    Medium = "medium",
    Small = "small"
}
export declare enum BadgeVariant {
    String = "string",
    Number = "number"
}
export interface BadgeProps extends BaseComponentAttributes {
    value: string;
    variant?: BadgeVariant;
    maxValue?: number;
    size?: BadgeSize;
}
