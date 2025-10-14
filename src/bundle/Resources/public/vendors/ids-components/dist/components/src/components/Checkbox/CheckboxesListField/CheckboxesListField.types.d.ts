import { BaseComponentAttributes } from '@ids-types/general';
import { CheckboxFieldProps } from '../CheckboxField/CheckboxField.types';
import { Direction as CheckboxesListFieldDirection } from '@ids-partials/BaseInputsList/BaseInputsList.types';
import { HelperTextProps } from '@ids-components/HelperText/HelperText.types';
import { LabelProps } from '@ids-components/Label/Label.types';
export { CheckboxesListFieldDirection };
export type CheckboxesListFieldItem = Omit<CheckboxFieldProps, 'name' | 'checked'>;
export declare enum CheckboxesListFieldAction {
    Check = "check",
    Uncheck = "uncheck"
}
export interface CheckboxesListFieldProps extends BaseComponentAttributes {
    id: string;
    name: string;
    onChange?: (value: string[], itemValue: string, action: CheckboxesListFieldAction) => void;
    direction?: CheckboxesListFieldDirection;
    helperText?: HelperTextProps['children'];
    helperTextExtra?: Omit<HelperTextProps, 'children' | 'type'>;
    items: CheckboxesListFieldItem[];
    label?: LabelProps['children'];
    labelExtra?: Omit<LabelProps, 'children' | 'error' | 'htmlFor' | 'required'>;
    required?: boolean;
    value?: string[];
}
