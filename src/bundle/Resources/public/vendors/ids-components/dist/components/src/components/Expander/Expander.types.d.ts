export declare enum ExpanderType {
    caret = "caret",
    chevron = "chevron"
}
interface ExpanderSharedProps {
    onClick: (isExpanded: boolean) => void;
    isExpanded?: boolean;
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
