/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
import { Plugin } from 'ckeditor5/src/core.js';
import TrackChangesTable from './table.js';
/**
 * Provides track changes plugin integration for {@link module:table/tableclipboard~TableClipboard table clipboard feature}.
 */
export default class TrackChangesTableClipboard extends Plugin {
    /**
     * @inheritDoc
     */
    static get requires(): readonly [typeof TrackChangesTable];
    /**
     * @inheritDoc
     */
    afterInit(): void;
}
