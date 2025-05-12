/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module revision-history/editor/revisionviewereditoruiview
 */
import { BoxedEditorUIView, InlineEditableUIView, StickyPanelView, ToolbarView } from 'ckeditor5/src/ui.js';
import type { EditingView } from 'ckeditor5/src/engine.js';
import type { Locale } from 'ckeditor5/src/utils.js';
import '@ckeditor/ckeditor5-editor-classic/theme/classiceditor.css';
export default class RevisionViewerEditorUIView extends BoxedEditorUIView {
    /**
     * Sticky panel view instance. This is a parent view of a {@link #toolbar}
     * that makes toolbar sticky.
     */
    readonly stickyPanel: StickyPanelView;
    /**
     * Toolbar view instance.
     */
    readonly toolbar: ToolbarView;
    get editable(): InlineEditableUIView;
    /**
     * Creates an instance of the classic editor UI view.
     *
     * @param locale The {@link module:core/editor/editor~Editor#locale} instance.
     * @param editingView The editing view instance this view is related to.
     * @param options Configuration options for the view instance.
     */
    constructor(locale: Locale, editingView: EditingView, options?: RevisionViewerEditorUIViewOptions);
    /**
     * @inheritDoc
     */
    render(): void;
}
export interface RevisionViewerEditorUIViewOptions {
    /**
     * When set `true` enables automatic items grouping
     * in the main {@link module:editor-classic/classiceditoruiview~ClassicEditorUIView#toolbar toolbar}.
     * See {@link module:ui/toolbar/toolbarview~ToolbarOptions#shouldGroupWhenFull} to learn more.
     */
    shouldToolbarGroupWhenFull?: boolean;
}
