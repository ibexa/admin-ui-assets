import { BaseComponentAttributes } from '@ids-types/general';
import { InputTextInputProps as BasicInputTextProps, InputTextInputSize as InputTextFieldSize } from '../InputTextInput/InputTextInput.types';
import { HelperTextProps } from '@ids-components/HelperText/HelperText.types';
import { LabelProps } from '@ids-components/Label/Label.types';
export { InputTextFieldSize };
export interface InputTextFieldProps extends BaseComponentAttributes {
    id: string;
    name: BasicInputTextProps['name'];
    input?: Omit<BasicInputTextProps, 'error' | 'name' | 'onChange' | 'required' | 'value'>;
    helperText?: HelperTextProps['children'];
    helperTextExtra?: Omit<HelperTextProps, 'children' | 'type'>;
    label?: LabelProps['children'];
    labelExtra?: Omit<LabelProps, 'children' | 'error' | 'htmlFor' | 'required'>;
    onChange?: BasicInputTextProps['onChange'];
    onValidate?: (isValid: boolean, messages: string[]) => void;
    required?: boolean;
    value?: BasicInputTextProps['value'];
}
export type InputTextFieldOnChangeArgsType = Parameters<NonNullable<InputTextFieldProps['onChange']>>;
export type InputTextFieldValueType = NonNullable<InputTextFieldProps['value']>;
