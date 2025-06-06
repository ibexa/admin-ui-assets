import { ReactNode } from 'react';
export declare const BUTTON_TYPE_VALUES: readonly ["primary", "secondary", "tertiary", "black-secondary", "black-tertiary"];
export declare const BUTTON_SIZE_VALUES: readonly ["large", "small", "extra-small"];
interface ButtonSharedProps {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    type?: (typeof BUTTON_TYPE_VALUES)[number];
    size?: (typeof BUTTON_SIZE_VALUES)[number];
    disabled?: boolean;
    extraClasses?: string;
    extraAria?: Record<`aria-${string}`, boolean | number | string>;
}
interface ButtonHTMLProps extends ButtonSharedProps {
    children: ReactNode;
    ariaLabel: string;
}
interface ButtonStringProps extends ButtonSharedProps {
    children: string;
    ariaLabel?: string;
}
export type ButtonProps = ButtonHTMLProps | ButtonStringProps;
export {};
