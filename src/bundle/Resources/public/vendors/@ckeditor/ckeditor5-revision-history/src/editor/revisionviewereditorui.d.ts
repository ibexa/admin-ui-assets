/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module revision-history/editor/revisionviewereditorui
 */
import type { Editor } from 'ckeditor5/src/core.js';
import { EditorUI } from 'ckeditor5/src/ui.js';
import type RevisionViewerEditorUIView from './revisionviewereditoruiview.js';
export default class RevisionViewerEditorUI extends EditorUI {
    get view(): RevisionViewerEditorUIView;
    constructor(editor: Editor, view: RevisionViewerEditorUIView);
    /**
     * @inheritDoc
     */
    get element(): HTMLElement | null;
    /**
     * Initializes the UI.
     *
     * @param replacementElement The DOM element that will be the source for the created editor.
     */
    init(replacementElement: HTMLElement): void;
    /**
     * @inheritDoc
     */
    destroy(): void;
}
