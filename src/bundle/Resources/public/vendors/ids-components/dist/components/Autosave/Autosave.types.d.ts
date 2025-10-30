export declare enum AutosaveStatus {
    On = "on",
    Saving = "saving",
    Saved = "saved",
    Error = "error"
}
interface AutosaveSharedProps {
    isDarkMode?: boolean;
    isEnabled?: boolean;
}
interface AutosaveEnabledProps extends AutosaveSharedProps {
    isEnabled: true;
    status?: Exclude<AutosaveStatus, AutosaveStatus.Saved>;
    lastSavedTime?: never;
}
interface AutosaveDisabledProps extends AutosaveSharedProps {
    isEnabled: false;
    status?: never;
    lastSavedTime?: never;
}
interface AutosaveSavedProps extends AutosaveSharedProps {
    isEnabled: true;
    status?: AutosaveStatus.Saved;
    lastSavedTime?: Date;
}
export type AutosaveProps = AutosaveEnabledProps | AutosaveDisabledProps | AutosaveSavedProps;
export {};
