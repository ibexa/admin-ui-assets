/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module comments/comments/ui/commenteditor/commenteditorui
 */
import { EditorUI } from 'ckeditor5/src/ui.js';
import type { Editor } from 'ckeditor5/src/core.js';
import CommentEditorUIView from './commenteditoruiview.js';
export default class CommentEditorUI extends EditorUI {
    /**
     * The main (top–most) view of the editor UI.
     */
    readonly view: CommentEditorUIView;
    /**
     * Creates an instance of the classic editor UI class.
     *
     * @param editor The editor instance.
     */
    constructor(editor: Editor);
    /**
     * @inheritDoc
     */
    get element(): HTMLElement | null;
    init(): void;
    /**
     * @inheritDoc
     */
    destroy(): void;
}
