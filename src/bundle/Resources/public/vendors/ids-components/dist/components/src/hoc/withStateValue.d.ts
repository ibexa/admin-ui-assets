import React, { FC } from 'react';
type OnChangeFn<T> = (value: T, ...args: any[]) => any;
interface BaseProps<T> {
    onChange?: OnChangeFn<T>;
    value: T;
}
export type WrappedComponentProps<Props, ValueType> = BaseProps<ValueType> & Props;
declare const _default: <Props, ValueType>(WrappedComponent: FC<any>) => {
    ({ value, onChange, ...restProps }: WrappedComponentProps<Props, ValueType>): React.JSX.Element;
    displayName: string;
};
export default _default;
