/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module track-changes/integrations/table
 */
import { Plugin, type Editor } from 'ckeditor5/src/core.js';
/**
 * Provides track changes plugin integration for {@link module:table/table~Table table feature}.
 */
export default class TrackChangesTable extends Plugin {
    /**
     * @inheritDoc
     */
    constructor(editor: Editor);
    /**
     * @inheritDoc
     */
    afterInit(): void;
}
/**
 * Coordinates for suggestion.
 */
export interface SuggestionCoordinates {
    /**
     * Index of the row at which the suggestion starts.
     */
    minRow: number;
    /**
     * Index of the row at which the suggestion ends.
     */
    maxRow: number;
    /**
     * Index of the column at which the suggestion starts.
     */
    minColumn: number;
    /**
     * Index of the column at which the suggestion ends.
     */
    maxColumn: number;
}
