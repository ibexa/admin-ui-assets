import type { ButtonHTMLAttributes } from 'react';
import { BaseComponentAriaAttributes } from '@ids-types/general';
export declare enum ButtonSize {
    Medium = "medium",
    Small = "small"
}
export declare enum ButtonType {
    Primary = "primary",
    Secondary = "secondary",
    Tertiary = "tertiary",
    SecondaryAlt = "secondary-alt",
    TertiaryAlt = "tertiary-alt"
}
export declare enum IconPosition {
    Start = "start",
    End = "end"
}
type NativeButtonAttributes = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className' | 'disabled' | 'onClick' | 'type'>;
interface ButtonSharedProps extends BaseComponentAriaAttributes, NativeButtonAttributes {
    ariaLabel?: string;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    isFocusable?: boolean;
    ref?: React.Ref<HTMLButtonElement>;
    size?: ButtonSize;
    type?: ButtonType;
    iconPosition?: IconPosition;
}
interface ButtonNameIconProps {
    icon: string;
    iconUrl?: never;
}
interface ButtonUrlIconProps {
    icon?: never;
    iconUrl: string;
}
interface ButtonNoTextNameIconProps extends ButtonSharedProps, ButtonNameIconProps {
    children?: never;
}
interface ButtonNoTextUrlIconProps extends ButtonSharedProps, ButtonUrlIconProps {
    children?: never;
}
interface ButtonTextNoIconProps extends ButtonSharedProps {
    icon?: never;
    iconUrl?: never;
    children: React.ReactNode;
}
interface ButtonTextNameIconProps extends ButtonSharedProps, ButtonNameIconProps {
    children: React.ReactNode;
}
interface ButtonTextUrlIconProps extends ButtonSharedProps, ButtonUrlIconProps {
    children: React.ReactNode;
}
export type ButtonProps = ButtonNoTextNameIconProps | ButtonNoTextUrlIconProps | ButtonTextNoIconProps | ButtonTextNameIconProps | ButtonTextUrlIconProps;
export {};
