import React, { FC } from 'react';
type OnChangeFn = (checked: boolean, ...args: any[]) => any;
interface BaseProps {
    onChange?: OnChangeFn;
    checked: boolean;
}
export type WithStateCheckedWrappedComponentProps<T extends object> = BaseProps & T;
export declare const withStateChecked: <T extends object>(WrappedComponent: FC<any>) => {
    ({ checked, onChange, ...restProps }: WithStateCheckedWrappedComponentProps<T>): React.JSX.Element;
    displayName: string;
};
export {};
