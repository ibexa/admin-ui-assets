import type { ReactNode } from 'react';
import { BaseComponentAttributes } from '@ids-types/general';
export declare enum AlertType {
    Success = "success",
    Warning = "warning",
    Error = "error",
    Info = "info"
}
export declare enum AlertVariant {
    Floating = "floating",
    Local = "local",
    Toast = "toast"
}
export declare enum AlertRole {
    Alert = "alert",
    Status = "status"
}
export interface AlertProps extends Omit<BaseComponentAttributes, 'title'> {
    type: AlertType;
    title?: ReactNode;
    variant?: AlertVariant;
    children?: ReactNode;
    actions?: ReactNode;
    icon?: string;
    iconPath?: string;
    isDismissible?: boolean;
    onDismiss?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    role?: AlertRole;
}
