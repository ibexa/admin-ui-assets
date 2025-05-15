/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module comments/comments/ui/commenteditor/commenteditoruiview
 */
import { InlineEditableUIView, EditorUIView, type ViewCollection } from 'ckeditor5/src/ui.js';
import { type Locale } from 'ckeditor5/src/utils.js';
import type { EditingView } from 'ckeditor5/src/engine.js';
export default class CommentEditorUIView extends EditorUIView {
    /**
     * Collection of the child views located in the main (`.ck-editor__main`)
     * area of the UI.
     */
    readonly main: ViewCollection;
    /**
     * Editable UI view.
     */
    editable: InlineEditableUIView;
    /**
     * Creates an instance of the comments editor UI view.
     *
     * @param locale The locale instance.
     * @param editingView The editing view instance this view is related to.
     */
    constructor(locale: Locale, editingView: EditingView);
    /**
     * @inheritDoc
     */
    render(): void;
    /**
     * Focusable interface required by a FocusCycler.
     */
    focus(): void;
}
