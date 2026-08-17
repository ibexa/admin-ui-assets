/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module language/textpartlanguageui
 */
import { Plugin } from 'ckeditor5/src/core.js';
/**
 * The text part language UI plugin.
 *
 * It introduces the `'language'` dropdown.
 */
export default class TextPartLanguageUI extends Plugin {
    /**
     * @inheritDoc
     */
    static get pluginName(): "TextPartLanguageUI";
    /**
     * @inheritDoc
     */
    static get isOfficialPlugin(): true;
    /**
     * @inheritDoc
     */
    init(): void;
    /**
     * Returns metadata for dropdown and menu items.
     */
    private _getItemMetadata;
}
