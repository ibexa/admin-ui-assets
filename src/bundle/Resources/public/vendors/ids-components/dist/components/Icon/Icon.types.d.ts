export declare enum IconSize {
    Tiny = "tiny",
    TinySmall = "tiny-small",
    Small = "small",
    SmallMedium = "small-medium",
    Medium = "medium",
    MediumLarge = "medium-large",
    Large = "large",
    LargeHuge = "large-huge",
    Huge = "huge"
}
interface IconSharedProps {
    className?: string;
    size?: IconSize;
}
interface IconPathProps extends IconSharedProps {
    path: string;
    name?: string;
}
interface IconBuiltinProps extends IconSharedProps {
    path?: never;
    name: string;
}
export type IconProps = IconPathProps | IconBuiltinProps;
export {};
