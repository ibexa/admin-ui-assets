/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
/**
 * @module block-quote/blockquoteui
 */
import { Plugin } from 'ckeditor5/src/core';
import '../theme/blockquote.css';
/**
 * The block quote UI plugin.
 *
 * It introduces the `'blockQuote'` button.
 *
 * @extends module:core/plugin~Plugin
 */
export default class BlockQuoteUI extends Plugin {
    /**
     * @inheritDoc
     */
    static get pluginName(): "BlockQuoteUI";
    /**
     * @inheritDoc
     */
    init(): void;
}
