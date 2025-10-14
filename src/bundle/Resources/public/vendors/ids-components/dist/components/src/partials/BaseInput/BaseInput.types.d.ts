import { InputHTMLAttributes, Ref } from 'react';
import { BaseComponentAttributes } from '@ids-types/general';
export declare const INPUT_TYPE_VALUES: ["text", "password", "email", "number", "tel", "search", "url", "checkbox", "radio", "hidden"];
export type BaseInputType = (typeof INPUT_TYPE_VALUES)[number];
interface BaseInputPropsProps extends BaseComponentAttributes {
    name: string;
    disabled?: boolean;
    error?: boolean;
    id?: string;
    ref?: Ref<HTMLInputElement>;
    size?: string;
    value?: string | number;
}
interface BaseInputVisibleProps extends BaseInputPropsProps {
    required: boolean;
    type?: Exclude<BaseInputType, 'hidden'>;
    extraInputAttrs?: Omit<InputHTMLAttributes<HTMLInputElement>, keyof BaseInputVisibleProps>;
}
interface BaseInputHiddenProps extends BaseInputPropsProps {
    type: 'hidden';
    required?: never;
    extraInputAttrs?: Omit<InputHTMLAttributes<HTMLInputElement>, keyof BaseInputHiddenProps>;
}
export type BaseInputProps = BaseInputVisibleProps | BaseInputHiddenProps;
export {};
