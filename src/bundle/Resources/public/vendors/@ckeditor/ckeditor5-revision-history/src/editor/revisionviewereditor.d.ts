/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module revision-history/editor/revisionviewereditor
 */
import { Editor, type EditorConfig } from 'ckeditor5/src/core.js';
import RevisionViewerEditorUI from './revisionviewereditorui.js';
declare const RevisionViewerEditor_base: import("@ckeditor/ckeditor5-utils").Mixed<typeof Editor, import("ckeditor5/src/core.js").ElementApi>;
/**
 * Editor class used to show revision comparisons.
 */
export default class RevisionViewerEditor extends /* #__PURE__ -- @preserve */ RevisionViewerEditor_base {
    get ui(): RevisionViewerEditorUI;
    /**
     * @param sourceElement Editor source element.
     * @param config Editor configuration.
     */
    constructor(sourceElement: HTMLElement, config?: EditorConfig);
    /**
     * @inheritDoc
     */
    destroy(): Promise<unknown>;
    static create(sourceElement: HTMLElement, config?: EditorConfig): Promise<RevisionViewerEditor>;
}
export {};
