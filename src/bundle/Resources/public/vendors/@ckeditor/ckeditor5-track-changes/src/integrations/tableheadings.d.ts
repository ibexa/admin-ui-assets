/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module track-changes/integrations/tableheadings
 */
import { Plugin } from 'ckeditor5/src/core.js';
import TrackChangesTable from './table.js';
/**
 * Provides track changes plugin integration for {@link module:table/table~Table table feature} heading rows/columns.
 */
export default class TrackChangesTableHeadings extends Plugin {
    /**
     * @inheritDoc
     */
    static get requires(): readonly [typeof TrackChangesTable];
    /**
     * @inheritDoc
     */
    afterInit(): void;
}
