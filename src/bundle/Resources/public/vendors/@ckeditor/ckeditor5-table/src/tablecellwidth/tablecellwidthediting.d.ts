/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
/**
 * @module table/tablecellwidth/tablecellwidthediting
 */
import { Plugin } from 'ckeditor5/src/core';
import TableEditing from './../tableediting';
/**
 * The table cell width editing feature.
 *
 * Introduces `tableCellWidth` table cell model attribute alongside with its converters
 * and a command.
 */
export default class TableCellWidthEditing extends Plugin {
    /**
     * @inheritDoc
     */
    static get pluginName(): "TableCellWidthEditing";
    /**
     * @inheritDoc
     */
    static get requires(): readonly [typeof TableEditing];
    /**
     * @inheritDoc
     */
    init(): void;
}
