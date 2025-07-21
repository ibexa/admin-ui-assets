/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module list/tododocumentlist
 */
import { Plugin, type Editor } from 'ckeditor5/src/core.js';
import TodoList from './todolist.js';
/**
 * The to-do list feature.
 *
 * This is an obsolete plugin that exists for backward compatibility only.
 * Use the {@link module:list/todolist~TodoList `TodoList`} instead.
 *
 * @deprecated
 */
export default class TodoDocumentList extends Plugin {
    /**
     * @inheritDoc
     */
    static get requires(): readonly [typeof TodoList];
    /**
     * @inheritDoc
     */
    static get pluginName(): "TodoDocumentList";
    /**
     * @inheritDoc
     */
    static get isOfficialPlugin(): true;
    constructor(editor: Editor);
}
