/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module track-changes/commands/trackchangescommand
 * @publicApi
 */
import { Command, type Editor } from 'ckeditor5/src/core.js';
/**
 * Turns the track changes mode on and off.
 *
 * When the track changes mode is on, this command disables all the unsupported commands.
 */
export default class TrackChangesCommand extends Command {
    value: boolean;
    constructor(editor: Editor, enabledCommands: Set<Command>);
    /**
     * @inheritDoc
     */
    refresh(): void;
    /**
     * @inheritDoc
     */
    execute(): void;
}
