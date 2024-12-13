/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
/**
 * @module list/listproperties/listreversedcommand
 */
import { Command } from 'ckeditor5/src/core';
/**
 * The reversed list command. It changes the `listReversed` attribute of the selected list items. As a result, the list order will be
 * reversed.
 * It is used by the {@link module:list/listproperties~ListProperties list properties feature}.
 */
export default class ListReversedCommand extends Command {
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
     *
     * @returns The current value.
     */
    private _getValue;
}
