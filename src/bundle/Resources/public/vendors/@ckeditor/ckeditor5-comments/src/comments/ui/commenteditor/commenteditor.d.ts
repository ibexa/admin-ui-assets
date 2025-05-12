/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module comments/comments/ui/commenteditor/commenteditor
 */
import { Editor, type EditorConfig } from 'ckeditor5/src/core.js';
import CommentEditorUI from './commenteditorui.js';
import { type PlaceholderableElement } from 'ckeditor5/src/engine.js';
declare const CommentEditor_base: import("ckeditor5/src/utils.js").Mixed<typeof Editor, import("ckeditor5/src/utils.js").Observable>;
export default class CommentEditor extends /* #__PURE__ -- @preserve */ CommentEditor_base {
    static defaultPlugins: EditorConfig['plugins'];
    /**
     * The input placeholder.
     *
     * @observable
     */
    placeholder: string;
    placeholderElement: PlaceholderableElement | undefined;
    ui: CommentEditorUI;
    /**
     * @inheritDoc
     */
    constructor(config?: EditorConfig);
    create(): Promise<unknown>;
    /**
     * @inheritDoc
     */
    destroy(): Promise<void>;
    /**
     * Place the selection at the end of the editor data and focus the editable.
     */
    focus(): void;
}
export {};
