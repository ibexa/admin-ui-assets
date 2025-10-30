import { BaseComponentAttributes } from '@ids-types/general';
import { HelperTextProps } from '@ids-components/HelperText/HelperText.types';
import { LabelProps } from '@ids-components/Label/Label.types';
import { RadioButtonFieldProps } from '../RadioButtonField/RadioButtonField.types';
import { Direction as RadioButtonsListFieldDirection } from '@ids-partials/BaseInputsList/BaseInputsList.types';
export { RadioButtonsListFieldDirection };
export type RadioButtonsListFieldItem = Omit<RadioButtonFieldProps, 'name' | 'checked'>;
export interface RadioButtonsListFieldProps extends BaseComponentAttributes {
    id: string;
    name: string;
    onChange?: (value: string) => void;
    direction?: RadioButtonsListFieldDirection;
    helperText?: HelperTextProps['children'];
    helperTextExtra?: Omit<HelperTextProps, 'children' | 'type'>;
    items: RadioButtonsListFieldItem[];
    label?: LabelProps['children'];
    labelExtra?: Omit<LabelProps, 'children' | 'error' | 'htmlFor' | 'required'>;
    required?: boolean;
    value?: string;
}
