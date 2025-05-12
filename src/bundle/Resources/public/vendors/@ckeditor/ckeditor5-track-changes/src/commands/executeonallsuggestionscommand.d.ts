/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module track-changes/commands/executeonallsuggestionscommand
 * @publicApi
 */
import { Command, type Editor } from 'ckeditor5/src/core.js';
import type Suggestion from '../suggestion.js';
/**
 * A command that executes passed command (accept or discard suggestion command) at once for all suggestions in the document.
 */
export default class ExecuteOnAllSuggestionsCommand<T extends Command> extends Command {
    constructor(editor: Editor, command: T, suggestions: Map<string, Suggestion>);
    /**
     * @inheritDoc
     */
    refresh(): void;
    /**
     * @inheritDoc
     */
    execute(): void;
}
