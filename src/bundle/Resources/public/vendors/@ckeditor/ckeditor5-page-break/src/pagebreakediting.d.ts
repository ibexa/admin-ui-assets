/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module page-break/pagebreakediting
 */
import { Plugin } from 'ckeditor5/src/core.js';
import '../theme/pagebreak.css';
/**
 * The page break editing feature.
 */
export default class PageBreakEditing extends Plugin {
    /**
     * @inheritDoc
     */
    static get pluginName(): "PageBreakEditing";
    /**
     * @inheritDoc
     */
    static get isOfficialPlugin(): true;
    /**
     * @inheritDoc
     */
    init(): void;
}
