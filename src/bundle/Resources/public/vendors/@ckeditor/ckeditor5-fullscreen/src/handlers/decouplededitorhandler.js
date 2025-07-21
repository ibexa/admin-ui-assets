/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
import AbstractEditorHandler from './abstracteditorhandler.js';
/**
 * The decoupled editor fullscreen mode handler.
 */
export default class DecoupledEditorHandler extends AbstractEditorHandler {
    /**
     * An editor instance.
     */
    _editor;
    /**
     * @inheritDoc
     */
    constructor(editor) {
        super(editor);
        this._editor = editor;
    }
    /**
     * A function that moves the editor UI elements to the fullscreen mode.
     */
    defaultOnEnter() {
        // Code coverage is provided in the commercial package repository as integration unit tests.
        /* istanbul ignore next -- @preserve */
        if (this._editor.plugins.has('Pagination') && this._editor.plugins.get('Pagination').isEnabled) {
            this.moveToFullscreen(this._editor.ui.getEditableElement().parentElement.querySelector('.ck-pagination-view'), 'pagination-view');
        }
        this.moveToFullscreen(this._editor.ui.getEditableElement(), 'editable');
        this.moveToFullscreen(this._editor.ui.view.toolbar.element, 'toolbar');
        this._editor.ui.view.toolbar.switchBehavior(this._editor.config.get('fullscreen.toolbar.shouldNotGroupWhenFull') === true ? 'static' : 'dynamic');
        if (this._editor.config.get('fullscreen.menuBar.isVisible')) {
            this.moveToFullscreen(this._editor.ui.view.menuBarView.element, 'menu-bar');
        }
        return this.getWrapper();
    }
}
