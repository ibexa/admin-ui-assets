/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module html-support/integrations/script
 */
import { Plugin } from 'ckeditor5/src/core.js';
import DataFilter from '../datafilter.js';
/**
 * Provides the General HTML Support for `script` elements.
 */
export default class ScriptElementSupport extends Plugin {
    /**
     * @inheritDoc
     */
    static get requires(): readonly [typeof DataFilter];
    /**
     * @inheritDoc
     */
    static get pluginName(): "ScriptElementSupport";
    /**
     * @inheritDoc
     */
    static get isOfficialPlugin(): true;
    /**
     * @inheritDoc
     */
    init(): void;
}
