/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
/**
 * @module image/imageinsert/imageinsertviaurlui
 */
import { Plugin } from 'ckeditor5/src/core';
import ImageInsertUI from './imageinsertui';
/**
 * The image insert via URL plugin (UI part).
 *
 * For a detailed overview, check the {@glink features/images/images-inserting
 * Insert images via source URL} documentation.
 *
 * This plugin registers the {@link module:image/imageinsert/imageinsertui~ImageInsertUI} integration for `url`.
 */
export default class ImageInsertViaUrlUI extends Plugin {
    private _imageInsertUI;
    /**
     * @inheritDoc
     */
    static get pluginName(): "ImageInsertViaUrlUI";
    /**
     * @inheritDoc
     */
    static get requires(): readonly [typeof ImageInsertUI];
    /**
     * @inheritDoc
     */
    init(): void;
    /**
     * Creates the view displayed in the dropdown.
     */
    private _createInsertUrlView;
    /**
     * Creates the toolbar button.
     */
    private _createInsertUrlButton;
    /**
     * Closes the dropdown.
     */
    private _closePanel;
}
