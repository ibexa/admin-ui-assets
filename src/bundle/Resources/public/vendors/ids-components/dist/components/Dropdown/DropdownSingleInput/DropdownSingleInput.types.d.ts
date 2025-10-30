import { BaseComponentAttributes } from '@ids-types/general';
import { BaseDropdownItem } from '@ids-partials/BaseDropdown';
export type DropdownSingleInputItem = BaseDropdownItem;
export interface DropdownSingleInputProps extends BaseComponentAttributes {
    name: string;
    disabled?: boolean;
    error?: boolean;
    items?: DropdownSingleInputItem[];
    onChange?: (value: string) => void;
    value?: string;
}
