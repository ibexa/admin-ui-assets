/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import { Plugin } from 'ckeditor5/src/core';
import CKBoxUploadAdapter from './ckboxuploadadapter';
import CKBoxUtils from './ckboxutils';
/**
 * The CKBox editing feature. It introduces the {@link module:ckbox/ckboxcommand~CKBoxCommand CKBox command} and
 * {@link module:ckbox/ckboxuploadadapter~CKBoxUploadAdapter CKBox upload adapter}.
 */
export default class CKBoxEditing extends Plugin {
    /**
     * CKEditor Cloud Services access token.
     */
    private _token;
    /**
     * @inheritDoc
     */
    static get pluginName(): "CKBoxEditing";
    /**
     * @inheritDoc
     */
    static get requires(): readonly ["LinkEditing", "PictureEditing", typeof CKBoxUploadAdapter, typeof CKBoxUtils];
    /**
     * @inheritDoc
     */
    init(): void;
    /**
     * Checks if at least one image plugin is loaded.
     */
    private _checkImagePlugins;
    /**
     * Extends the schema to allow the `ckboxImageId` and `ckboxLinkId` attributes for links and images.
     */
    private _initSchema;
    /**
     * Configures the upcast and downcast conversions for the `ckboxImageId` and `ckboxLinkId` attributes.
     */
    private _initConversion;
    /**
     * Registers post-fixers that add or remove the `ckboxLinkId` and `ckboxImageId` attributes.
     */
    private _initFixers;
}
