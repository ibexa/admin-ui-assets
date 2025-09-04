import { InputHTMLAttributes } from 'react';
import { BaseComponentAttributes } from '@ids-types/general';
export declare const INPUT_TYPE_VALUES: ["text", "password", "email", "number", "tel", "search", "url", "checkbox", "radio", "hidden"];
export type BaseInputTypesType = (typeof INPUT_TYPE_VALUES)[number];
interface BaseInputPropsProps extends BaseComponentAttributes {
    name: string;
    disabled?: boolean;
    error?: boolean;
    extraClasses?: string;
    id?: string;
    size?: string;
    value?: string | number;
}
interface BaseInputVisibleProps extends BaseInputPropsProps {
    required: boolean;
    type?: Exclude<BaseInputTypesType, 'hidden'>;
    extraInputAttrs?: Omit<InputHTMLAttributes<HTMLInputElement>, keyof BaseInputVisibleProps>;
}
interface BaseInputHiddenProps extends BaseInputPropsProps {
    type: 'hidden';
    required?: never;
    extraInputAttrs?: Omit<InputHTMLAttributes<HTMLInputElement>, keyof BaseInputHiddenProps>;
}
export type BaseInputProps = BaseInputVisibleProps | BaseInputHiddenProps;
export {};
