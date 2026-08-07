import { BaseComponentAttributes } from '@ids-types/general';
import { ToggleButtonInputProps as BasicToggleButtonProps, ToggleButtonInputSize as ToggleButtonFieldSize } from '../ToggleButtonInput/ToggleButtonInput.types';
import { HelperTextProps } from '@ids-components/HelperText/HelperText.types';
import { LabelProps } from '@ids-components/Label/Label.types';
export { ToggleButtonFieldSize };
export interface ToggleButtonFieldProps extends BaseComponentAttributes {
    id: string;
    name: BasicToggleButtonProps['name'];
    checked?: boolean;
    input?: Omit<BasicToggleButtonProps, 'checked' | 'error' | 'name' | 'onChange' | 'required'>;
    helperText?: HelperTextProps['children'];
    helperTextExtra?: Omit<HelperTextProps, 'children' | 'type'>;
    label?: LabelProps['children'];
    labelExtra?: Omit<LabelProps, 'children' | 'error' | 'htmlFor' | 'required'>;
    onChange?: BasicToggleButtonProps['onChange'];
    required?: boolean;
}
