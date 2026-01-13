import { BaseComponentAttributes } from '@ids-types/general';
import { AltRadioInputProps } from '../AltRadioInput';
import { Direction as AltRadiosListFieldDirection } from '@ids-partials/BaseInputsList';
import { HelperTextProps } from '@ids-components/HelperText';
import { LabelProps } from '@ids-components/Label';
export { AltRadiosListFieldDirection };
export type AltRadiosListFieldItem = Omit<AltRadioInputProps, 'name' | 'checked'>;
export interface AltRadiosListFieldProps extends BaseComponentAttributes {
    id: string;
    name: string;
    onChange?: (value: string) => void;
    direction?: AltRadiosListFieldDirection;
    helperText?: HelperTextProps['children'];
    helperTextExtra?: Omit<HelperTextProps, 'children' | 'type'>;
    items: AltRadiosListFieldItem[];
    label?: LabelProps['children'];
    labelExtra?: Omit<LabelProps, 'children' | 'error' | 'htmlFor' | 'required'>;
    required?: boolean;
    value?: string;
}
