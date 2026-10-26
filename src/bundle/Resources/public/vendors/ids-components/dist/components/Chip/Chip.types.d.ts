import { BaseComponentAttributes } from '@ids-types/general';
export interface ChipProps extends BaseComponentAttributes {
    children: React.ReactNode;
    isDeletable?: boolean;
    disabled?: boolean;
    onDelete?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    error?: boolean;
}
