export declare enum ExpanderType {
    Caret = "caret",
    Chevron = "chevron"
}
interface ExpanderSharedProps {
    onClick?: (isExpanded: boolean) => void;
    isExpanded?: boolean;
    isFocusable?: boolean;
    type: ExpanderType;
}
interface ExpanderWithoutLabelProps extends ExpanderSharedProps {
    collapseLabel?: never;
    expandLabel?: never;
    hasIcon?: true;
}
interface ExpanderWithLabelProps extends ExpanderSharedProps {
    collapseLabel?: string;
    expandLabel?: string;
    hasIcon?: boolean;
}
export type ExpanderProps = ExpanderWithoutLabelProps | ExpanderWithLabelProps;
export {};
