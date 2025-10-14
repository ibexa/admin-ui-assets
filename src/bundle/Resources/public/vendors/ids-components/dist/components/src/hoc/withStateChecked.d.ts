import React, { FC } from 'react';
type OnChangeFn = (checked: boolean, ...args: any[]) => any;
interface BaseProps {
    onChange?: OnChangeFn;
    checked: boolean;
}
export type WrappedComponentProps<T extends object> = BaseProps & T;
declare const _default: <T extends object>(WrappedComponent: FC<any>) => {
    ({ checked, onChange, ...restProps }: WrappedComponentProps<T>): React.JSX.Element;
    displayName: string;
};
export default _default;
