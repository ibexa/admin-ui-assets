import { BaseComponentAriaAttributes } from '@ids-types/general';
import { HelperTextProps } from '@ids-components/HelperText/HelperText.types';
import { LabelProps } from '@ids-components/Label/Label.types';
export declare enum Direction {
    Horizontal = "horizontal",
    Vertical = "vertical"
}
export interface BaseInputsListProps<T> extends BaseComponentAriaAttributes {
    items: T[];
    renderItem: (item: T) => React.ReactNode;
    direction?: Direction;
    helperTextProps?: HelperTextProps;
    labelProps?: LabelProps;
}
