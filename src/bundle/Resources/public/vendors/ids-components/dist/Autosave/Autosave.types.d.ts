interface AutosaveSharedProps {
    isDarkMode?: boolean;
    isEnabled?: boolean;
}
interface AutosaveEnabledProps extends AutosaveSharedProps {
    isEnabled: true;
    status?: 'on' | 'saving' | 'error';
    lastSavedTime?: never;
}
interface AutosaveDisabledProps extends AutosaveSharedProps {
    isEnabled: false;
    status?: never;
    lastSavedTime?: never;
}
interface AutosaveSavedProps extends AutosaveSharedProps {
    isEnabled: true;
    status?: 'saved';
    lastSavedTime?: Date;
}
export type AutosaveProps = AutosaveEnabledProps | AutosaveDisabledProps | AutosaveSavedProps;
export {};
