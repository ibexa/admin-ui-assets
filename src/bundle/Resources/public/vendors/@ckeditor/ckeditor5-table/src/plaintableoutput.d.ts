/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
/**
 * @module table/plaintableoutput
 */
import { Plugin } from 'ckeditor5/src/core';
import Table from './table';
/**
 * The plain table output feature.
 */
export default class PlainTableOutput extends Plugin {
    /**
     * @inheritDoc
     */
    static get pluginName(): "PlainTableOutput";
    /**
     * @inheritDoc
     */
    static get requires(): readonly [typeof Table];
    /**
     * @inheritDoc
     */
    init(): void;
}
