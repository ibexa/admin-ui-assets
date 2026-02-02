/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
/**
 * @module basic-styles/bold/boldui
 */
import { Plugin } from 'ckeditor5/src/core';
/**
 * The bold UI feature. It introduces the Bold button.
 */
export default class BoldUI extends Plugin {
    /**
     * @inheritDoc
     */
    static get pluginName(): "BoldUI";
    /**
     * @inheritDoc
     */
    init(): void;
}
