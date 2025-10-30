import React, { FC } from 'react';
type OnChangeFn<T> = (value: T, ...args: any[]) => any;
interface BaseProps<T> {
    onChange?: OnChangeFn<T>;
    value: T;
}
export type WIthStateValueWrappedComponentProps<Props, ValueType> = BaseProps<ValueType> & Props;
export declare const withStateValue: <Props, ValueType>(WrappedComponent: FC<any>) => {
    ({ value, onChange, ...restProps }: WIthStateValueWrappedComponentProps<Props, ValueType>): React.JSX.Element;
    displayName: string;
};
export {};
