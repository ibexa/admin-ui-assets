/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module fullscreen/fullscreencommand
 */
import { Command, type Editor } from 'ckeditor5/src/core.js';
/**
 * A command toggling the fullscreen mode.
 */
export default class FullscreenCommand extends Command {
    /**
     * Indicates whether the fullscreen mode is enabled.
     *
     * @observable
     * @readonly
     */
    value: boolean;
    /**
     * Specialized class handling the fullscreen mode toggling for a specific editor type.
     */
    private _fullscreenHandler;
    /**
     * @inheritDoc
     */
    constructor(editor: Editor);
    /**
     * Toggles the fullscreen mode.
     */
    execute(): void;
    /**
     * Enables the fullscreen mode.
     */
    private _enableFullscreenMode;
    /**
     * Disables the fullscreen mode.
     */
    private _disableFullscreenMode;
}
