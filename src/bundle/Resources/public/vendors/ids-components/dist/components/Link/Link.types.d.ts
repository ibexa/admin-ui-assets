import { BaseComponentAriaAttributes } from '@ids-types/general';
export declare enum LinkSize {
    Medium = "medium",
    Small = "small"
}
export declare enum LinkType {
    Primary = "primary",
    Secondary = "secondary",
    Tertiary = "tertiary",
    SecondaryAlt = "secondary-alt",
    TertiaryAlt = "tertiary-alt"
}
export declare enum LinkVariant {
    Button = "button",
    Text = "text"
}
interface LinkBaseProps extends BaseComponentAriaAttributes {
    ariaLabel?: string;
    disabled?: boolean;
    href: string;
    target?: string;
    rel?: string;
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
    variant?: LinkVariant;
}
interface LinkButtonSharedProps extends LinkBaseProps {
    variant?: LinkVariant.Button;
    size?: LinkSize;
    type?: LinkType;
}
interface LinkButtonNameIconProps {
    icon: string;
    iconUrl?: never;
}
interface LinkButtonUrlIconProps {
    icon?: never;
    iconUrl: string;
}
interface LinkButtonNoTextNameIconProps extends LinkButtonSharedProps, LinkButtonNameIconProps {
    children?: never;
}
interface LinkButtonNoTextUrlIconProps extends LinkButtonSharedProps, LinkButtonUrlIconProps {
    children?: never;
}
interface LinkButtonTextNoIconProps extends LinkButtonSharedProps {
    icon?: never;
    iconUrl?: never;
    children: React.ReactNode;
}
interface LinkButtonTextNameIconProps extends LinkButtonSharedProps, LinkButtonNameIconProps {
    children: React.ReactNode;
}
interface LinkButtonTextUrlIconProps extends LinkButtonSharedProps, LinkButtonUrlIconProps {
    children: React.ReactNode;
}
type LinkButtonProps = LinkButtonNoTextNameIconProps | LinkButtonNoTextUrlIconProps | LinkButtonTextNoIconProps | LinkButtonTextNameIconProps | LinkButtonTextUrlIconProps;
interface LinkTextProps extends LinkBaseProps {
    variant: LinkVariant.Text;
    children: React.ReactNode;
    size?: never;
    type?: never;
    icon?: never;
    iconUrl?: never;
}
export type LinkProps = LinkButtonProps | LinkTextProps;
export {};
