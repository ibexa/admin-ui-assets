/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import { Plugin } from 'ckeditor5/src/core';
import DocumentListEditing from '../documentlist/documentlistediting';
/**
 * The engine of the to-do list feature. It handles creating, editing and removing to-do lists and their items.
 *
 * It registers the entire functionality of the {@link module:list/documentlist/documentlistediting~DocumentListEditing list editing plugin}
 * and extends it with the commands:
 *
 * - `'todoList'`,
 * - `'checkTodoList'`,
 */
export default class TodoDocumentListEditing extends Plugin {
    /**
     * @inheritDoc
     */
    static get pluginName(): "TodoDocumentListEditing";
    /**
     * @inheritDoc
     */
    static get requires(): readonly [typeof DocumentListEditing];
    /**
     * @inheritDoc
     */
    init(): void;
    /**
     * Handles the checkbox element change, moves the selection to the corresponding model item to make it possible
     * to toggle the `todoListChecked` attribute using the command, and restores the selection position.
     *
     * Some say it's a hack :) Moving the selection only for executing the command on a certain node and restoring it after,
     * is not a clear solution. We need to design an API for using commands beyond the selection range.
     * See https://github.com/ckeditor/ckeditor5/issues/1954.
     */
    private _handleCheckmarkChange;
}
