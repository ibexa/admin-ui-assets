import { BaseComponentAriaAttributes } from '@ids-types/general';
export interface BaseChoiceInputFieldProps extends BaseComponentAriaAttributes {
    children: React.ReactNode;
    disabled?: boolean;
    error?: boolean;
    id: string;
    inputWrapperClassName?: string;
    labelClassName?: string;
    renderInput: () => React.ReactNode;
}
