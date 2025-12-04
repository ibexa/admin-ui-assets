/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
import type { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';
import AbstractEditorHandler from './abstracteditorhandler.js';
/**
 * The classic editor fullscreen mode handler.
 */
export default class ClassicEditorHandler extends AbstractEditorHandler {
    /**
     * An editor instance.
     */
    protected readonly _editor: ClassicEditor;
    /**
     * @inheritDoc
     */
    constructor(editor: ClassicEditor);
    /**
     * A function that moves the editor UI elements to the fullscreen mode.
     */
    defaultOnEnter(): HTMLElement;
}
