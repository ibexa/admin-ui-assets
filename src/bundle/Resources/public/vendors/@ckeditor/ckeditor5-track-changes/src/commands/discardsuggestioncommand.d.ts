/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module track-changes/commands/discardsuggestioncommand
 * @publicApi
 */
import { Command, type Editor } from 'ckeditor5/src/core.js';
import type Suggestion from '../suggestion.js';
/**
 * A command that discards the suggestion chain.
 */
export default class DiscardSuggestionCommand extends Command {
    constructor(editor: Editor, suggestions: Map<string, Suggestion>);
    /**
     * @inheritDoc
     */
    refresh(): void;
    /**
     * @inheritDoc
     */
    execute(suggestionId: string): void;
}
