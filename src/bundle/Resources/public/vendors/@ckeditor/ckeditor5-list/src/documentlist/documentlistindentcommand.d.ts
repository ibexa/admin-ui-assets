/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
/**
 * @module list/documentlist/documentlistindentcommand
 */
import { Command, type Editor } from 'ckeditor5/src/core';
import type { Element } from 'ckeditor5/src/engine';
/**
 * The document list indent command. It is used by the {@link module:list/documentlist~DocumentList list feature}.
 */
export default class DocumentListIndentCommand extends Command {
    /**
     * Determines by how much the command will change the list item's indent attribute.
     */
    private readonly _direction;
    /**
     * Creates an instance of the command.
     *
     * @param editor The editor instance.
     * @param indentDirection The direction of indent. If it is equal to `backward`, the command
     * will outdent a list item.
     */
    constructor(editor: Editor, indentDirection: 'forward' | 'backward');
    /**
     * @inheritDoc
     */
    refresh(): void;
    /**
     * Indents or outdents (depending on the {@link #constructor}'s `indentDirection` parameter) selected list items.
     *
     * @fires execute
     * @fires afterExecute
     */
    execute(): void;
    /**
     * Fires the `afterExecute` event.
     *
     * @param changedBlocks The changed list elements.
     */
    private _fireAfterExecute;
    /**
     * Checks whether the command can be enabled in the current context.
     *
     * @returns Whether the command should be enabled.
     */
    private _checkEnabled;
}
/**
 * Event fired by the {@link ~DocumentListIndentCommand#execute} method.
 *
 * It allows to execute an action after executing the {@link module:list/documentlist/documentlistcommand~DocumentListCommand#execute}
 * method, for example adjusting attributes of changed list items.
 *
 * @internal
 * @eventName ~DocumentListIndentCommand#afterExecute
 */
export type DocumentListIndentCommandAfterExecuteEvent = {
    name: 'afterExecute';
    args: [changedBlocks: Array<Element>];
};
