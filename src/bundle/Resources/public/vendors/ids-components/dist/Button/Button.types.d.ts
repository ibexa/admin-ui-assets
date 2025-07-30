import { ReactNode } from 'react';
import { BaseComponentAriaAttributes } from '@ids-types/general';
export declare const BUTTON_SIZE_VALUES: readonly ["medium", "small"];
export declare const BUTTON_TYPE_VALUES: readonly ["primary", "secondary", "tertiary", "secondary-alt", "tertiary-alt"];
export type ButtonSizeType = (typeof BUTTON_SIZE_VALUES)[number];
export type ButtonTypesType = (typeof BUTTON_TYPE_VALUES)[number];
interface ButtonSharedProps extends BaseComponentAriaAttributes {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    size?: ButtonSizeType;
    type?: ButtonTypesType;
}
interface ButtonIconOnlyProps extends ButtonSharedProps {
    icon: string;
    ariaLabel?: string;
    children?: never;
}
interface ButtonHTMLProps extends ButtonSharedProps {
    ariaLabel: string;
    children: ReactNode;
    icon?: string;
}
interface ButtonStringProps extends ButtonSharedProps {
    children: string;
    ariaLabel?: string;
    icon?: string;
}
export type ButtonProps = ButtonIconOnlyProps | ButtonHTMLProps | ButtonStringProps;
export {};
