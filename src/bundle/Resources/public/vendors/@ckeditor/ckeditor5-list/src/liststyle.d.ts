/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
/**
 * @module list/liststyle
 */
import { Plugin, type Editor } from 'ckeditor5/src/core';
import ListProperties from './listproperties';
/**
 * The list style feature.
 *
 * This is an obsolete plugin that exists for backward compatibility only.
 * Use the {@link module:list/listproperties~ListProperties list properties plugin} instead.
 *
 * @deprecated
 */
export default class ListStyle extends Plugin {
    /**
     * @inheritDoc
     */
    static get requires(): readonly [typeof ListProperties];
    /**
     * @inheritDoc
     */
    static get pluginName(): "ListStyle";
    constructor(editor: Editor);
}
