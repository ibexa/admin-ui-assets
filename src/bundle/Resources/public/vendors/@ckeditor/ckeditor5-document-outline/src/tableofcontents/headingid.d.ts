/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
import { Plugin } from 'ckeditor5/src/core.js';
/**
 * The heading ID plugin. It adds support for the ID attribute on the heading[1-6] (model) and h[1-6] (data/view) elements.
 */
export default class HeadingId extends Plugin {
    /**
     * @inheritDoc
     */
    static get pluginName(): "HeadingId";
    /**
     * @inheritDoc
     */
    static get isOfficialPlugin(): true;
    /**
     * @inheritDoc
     */
    static get isPremiumPlugin(): true;
    /**
     * @inheritDoc
     */
    afterInit(): void;
}
