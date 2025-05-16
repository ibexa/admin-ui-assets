import React from 'react';
import { AutosaveProps } from './Autosave.types';
export declare const AUTOSAVE_STATUS: {
    readonly ERROR: "error";
    readonly OFF: "off";
    readonly ON: "on";
    readonly SAVED: "saved";
    readonly SAVING: "saving";
};
declare const Autosave: ({ isDarkMode, isEnabled, status, lastSavedTime }: AutosaveProps) => React.JSX.Element;
export default Autosave;
