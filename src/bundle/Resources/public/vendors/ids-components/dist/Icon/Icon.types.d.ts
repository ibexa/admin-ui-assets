export declare const ICON_SIZE_VALUES: readonly ["tiny", "tiny-small", "small", "small-medium", "medium", "medium-large", "large", "large-huge", "huge"];
export type IconSizeType = (typeof ICON_SIZE_VALUES)[number];
interface IconSharedProps {
    cssClass?: string;
    size?: (typeof ICON_SIZE_VALUES)[number];
}
interface IconCustomPathProps extends IconSharedProps {
    customPath: string;
    name?: never;
}
interface IconNameProps extends IconSharedProps {
    customPath?: never;
    name: string;
}
export type IconProps = IconCustomPathProps | IconNameProps;
export {};
