/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module document-outline/tableofcontents/tableofcontentscommand
 * @publicApi
 */
import { Command } from 'ckeditor5/src/core.js';
export default class TableOfContentsCommand extends Command {
    /**
     * Executes the command. Inserts the table of content into the model.
     *
     * @fires execute
     */
    execute(): void;
    /**
     * If the selection is wrong, the command is not enabled.
     */
    refresh(): void;
}
