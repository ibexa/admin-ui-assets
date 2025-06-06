/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module fullscreen/handlers/decouplededitorhandler
 */
import type { DecoupledEditor } from '@ckeditor/ckeditor5-editor-decoupled';
import AbstractEditorHandler from './abstracteditorhandler.js';
/**
 * The decoupled editor fullscreen mode handler.
 */
export default class DecoupledEditorHandler extends AbstractEditorHandler {
    /**
     * An editor instance.
     */
    protected readonly _editor: DecoupledEditor;
    /**
     * @inheritDoc
     */
    constructor(editor: DecoupledEditor);
    /**
     * A function that moves the editor UI elements to the fullscreen mode.
     */
    defaultOnEnter(): HTMLElement;
}
