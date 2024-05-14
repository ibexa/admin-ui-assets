/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import ListUtils from './listutils';
import { Plugin } from 'ckeditor5/src/core';
import { Enter } from 'ckeditor5/src/enter';
import { Delete } from 'ckeditor5/src/typing';
import '../../theme/list.css';
/**
 * The engine of the list feature. It handles creating, editing and removing lists and list items.
 *
 * It registers the `'numberedList'`, `'bulletedList'`, `'indentList'` and `'outdentList'` commands.
 */
export default class ListEditing extends Plugin {
    /**
     * @inheritDoc
     */
    static get pluginName(): "ListEditing";
    /**
     * @inheritDoc
     */
    static get requires(): readonly [typeof Enter, typeof Delete, typeof ListUtils];
    /**
     * @inheritDoc
     */
    init(): void;
    /**
     * @inheritDoc
     */
    afterInit(): void;
}
