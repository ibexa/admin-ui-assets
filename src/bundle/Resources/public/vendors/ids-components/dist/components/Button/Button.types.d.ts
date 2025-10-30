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
interface ButtonSharedProps extends BaseComponentAriaAttributes {
    ariaLabel?: string;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    isFocusable?: boolean;
    size?: ButtonSize;
    type?: ButtonType;
}
interface ButtonNoTextProps extends ButtonSharedProps {
    icon: string;
    children?: never;
}
interface ButtonTextProps extends ButtonSharedProps {
    icon?: string;
    children: React.ReactNode;
}
export type ButtonProps = ButtonNoTextProps | ButtonTextProps;
export {};
