/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import { Plugin } from 'ckeditor5/src/core';
export default class AdjacentListsSupport extends Plugin {
    /**
     * @inheritDoc
     */
    static get pluginName(): "AdjacentListsSupport";
    /**
     * @inheritDoc
     */
    init(): void;
}
