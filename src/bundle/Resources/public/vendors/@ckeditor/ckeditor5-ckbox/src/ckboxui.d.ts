/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
/**
 * @module ckbox/ckboxui
 */
import { Plugin } from 'ckeditor5/src/core';
/**
 * The CKBoxUI plugin. It introduces the `'ckbox'` toolbar button.
 */
export default class CKBoxUI extends Plugin {
    /**
     * @inheritDoc
     */
    static get pluginName(): "CKBoxUI";
    /**
     * @inheritDoc
     */
    afterInit(): void;
}
