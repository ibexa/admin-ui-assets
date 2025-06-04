/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module html-support/integrations/horizontalline
 */
import { Plugin } from 'ckeditor5/src/core.js';
import DataFilter from '../datafilter.js';
/**
 * Provides the General HTML Support integration with the {@link module:horizontal-line/horizontalline~HorizontalLine} feature.
 */
export default class HorizontalLineElementSupport extends Plugin {
    /**
     * @inheritDoc
     */
    static get requires(): readonly [typeof DataFilter];
    /**
     * @inheritDoc
     */
    static get pluginName(): "HorizontalLineElementSupport";
    /**
     * @inheritDoc
     */
    static get isOfficialPlugin(): true;
    /**
     * @inheritDoc
     */
    init(): void;
}
