/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
/**
 * @module list/documentlistproperties/documentlistreversedcommand
 */
import { Command } from 'ckeditor5/src/core';
/**
 * The list reversed command. It changes the `listReversed` attribute of the selected list items,
 * letting the user to choose the order of an ordered list.
 * It is used by the {@link module:list/documentlistproperties~DocumentListProperties list properties feature}.
 */
export default class DocumentListReversedCommand extends Command {
    /**
     * @inheritDoc
     */
    value: boolean | null;
    /**
     * @inheritDoc
     */
    refresh(): void;
    /**
     * Executes the command.
     *
     * @fires execute
     * @param options.reversed Whether the list should be reversed.
     */
    execute(options?: {
        reversed?: boolean;
    }): void;
    /**
     * Checks the command's {@link #value}.
     */
    private _getValue;
}
