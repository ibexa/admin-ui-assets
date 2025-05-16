interface ExpanderSharedProps {
    onClick: (isExpanded: boolean) => void;
    isExpanded?: boolean;
    type: 'caret' | 'triangle';
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
