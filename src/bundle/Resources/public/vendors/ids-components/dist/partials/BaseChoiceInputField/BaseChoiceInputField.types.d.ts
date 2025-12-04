import { BaseComponentAriaAttributes } from '@ids-types/general';
export interface BaseChoiceInputFieldProps extends BaseComponentAriaAttributes {
    children: React.ReactNode;
    id: string;
    inputWrapperClassName?: string;
    labelClassName?: string;
    renderInput: () => React.ReactNode;
}
